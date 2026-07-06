param(
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [string]$SourceRoot = "D:\handy-notdienst-singen.de\Bilder",
  [int]$Port = 9253
)

$ErrorActionPreference = "Stop"

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path -LiteralPath $edgePath)) {
  throw "Microsoft Edge wurde nicht gefunden: $edgePath"
}

$iconSourceDir = Join-Path $SourceRoot "Iphone Icons"
$finderSourceDir = Join-Path $SourceRoot "IphoneFinder"
if (-not (Test-Path -LiteralPath $iconSourceDir)) {
  throw "iPhone icon source directory fehlt: $iconSourceDir"
}
if (-not (Test-Path -LiteralPath $finderSourceDir)) {
  throw "iPhone finder source directory fehlt: $finderSourceDir"
}

$iconOutDir = Join-Path $RepoRoot "assets\iphone-icons"
$finderOutDir = Join-Path $RepoRoot "assets\model-finder\optimized"
New-Item -ItemType Directory -Force -Path $iconOutDir | Out-Null
New-Item -ItemType Directory -Force -Path $finderOutDir | Out-Null

$profileDir = Join-Path (Split-Path $RepoRoot -Parent) ".edge-cdp-iphone-icons"
$edgeArgs = @(
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--allow-file-access-from-files",
  "--remote-debugging-port=$Port",
  "--user-data-dir=$profileDir",
  "about:blank"
)

function ConvertTo-FileUrl([string]$Path) {
  return ([Uri](Resolve-Path -LiteralPath $Path).Path).AbsoluteUri
}

function Receive-CdpMessage([System.Net.WebSockets.ClientWebSocket]$Socket) {
  $buffer = New-Object byte[] 1048576
  $stream = [System.IO.MemoryStream]::new()
  do {
    $segment = [ArraySegment[byte]]::new($buffer)
    $result = $Socket.ReceiveAsync($segment, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
    if ($result.MessageType -eq [System.Net.WebSockets.WebSocketMessageType]::Close) {
      throw "CDP WebSocket wurde geschlossen."
    }
    $stream.Write($buffer, 0, $result.Count)
  } until ($result.EndOfMessage)

  return [Text.Encoding]::UTF8.GetString($stream.ToArray())
}

function Send-CdpCommand(
  [System.Net.WebSockets.ClientWebSocket]$Socket,
  [ref]$NextId,
  [string]$Method,
  [hashtable]$Params = @{}
) {
  $id = $NextId.Value
  $NextId.Value += 1

  $payload = @{
    id = $id
    method = $Method
    params = $Params
  } | ConvertTo-Json -Depth 30 -Compress

  $bytes = [Text.Encoding]::UTF8.GetBytes($payload)
  [void]$Socket.SendAsync(
    [ArraySegment[byte]]::new($bytes),
    [System.Net.WebSockets.WebSocketMessageType]::Text,
    $true,
    [Threading.CancellationToken]::None
  ).GetAwaiter().GetResult()

  while ($true) {
    $message = Receive-CdpMessage $Socket | ConvertFrom-Json
    if ($message.id -eq $id) {
      if ($message.error) {
        throw ($message.error | ConvertTo-Json -Depth 10 -Compress)
      }
      return $message.result
    }
  }
}

function Wait-ForEdge([int]$Port) {
  for ($i = 0; $i -lt 40; $i++) {
    try {
      return Invoke-RestMethod -UseBasicParsing "http://127.0.0.1:$Port/json/version"
    } catch {
      Start-Sleep -Milliseconds 250
    }
  }
  throw "Edge DevTools konnte nicht gestartet werden."
}

function Render-Webp(
  [System.Net.WebSockets.ClientWebSocket]$Socket,
  [ref]$NextId,
  [string]$SourceUrl,
  [int]$Width,
  [int]$Height,
  [double]$Quality
) {
  $srcJson = $SourceUrl | ConvertTo-Json -Compress
  $qualityString = $Quality.ToString([Globalization.CultureInfo]::InvariantCulture)

  $expression = @"
(async () => {
  const src = $srcJson;
  const width = $Width;
  const height = $Height;
  const quality = $qualityString;
  const img = new Image();
  img.decoding = "async";
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = () => reject(new Error("image load failed: " + src));
    img.src = src;
  });

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const pad = Math.round(Math.min(width, height) * 0.08);
  const maxW = width - pad * 2;
  const maxH = height - pad * 2;
  const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
  const drawW = Math.round(img.naturalWidth * scale);
  const drawH = Math.round(img.naturalHeight * scale);
  const drawX = Math.round((width - drawW) / 2);
  const drawY = Math.round((height - drawH) / 2);
  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
  if (!blob || blob.type !== "image/webp") {
    return { ok: false, type: blob ? blob.type : null, data: null };
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  return { ok: true, type: blob.type, data: dataUrl.split(",")[1] };
})()
"@

  $result = Send-CdpCommand $Socket $NextId "Runtime.evaluate" @{
    expression = $expression
    awaitPromise = $true
    returnByValue = $true
  }

  return $result.result.value
}

$edge = Start-Process -FilePath $edgePath -ArgumentList $edgeArgs -WindowStyle Hidden -PassThru

try {
  Wait-ForEdge $Port | Out-Null
  $page = Invoke-RestMethod -UseBasicParsing -Method Put "http://127.0.0.1:$Port/json/new?about:blank"

  $socket = [System.Net.WebSockets.ClientWebSocket]::new()
  [void]$socket.ConnectAsync([Uri]$page.webSocketDebuggerUrl, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
  $nextId = 1
  $nextRef = [ref]$nextId

  Send-CdpCommand $socket $nextRef "Page.enable" | Out-Null
  Send-CdpCommand $socket $nextRef "Runtime.enable" | Out-Null
  Send-CdpCommand $socket $nextRef "Page.navigate" @{ url = (ConvertTo-FileUrl (Join-Path $RepoRoot "index.html")) } | Out-Null
  Start-Sleep -Milliseconds 500

  $webpAssets = @(
    @{ source = "Display Tausch.png"; output = "display-repair.webp"; width = 160; height = 160; quality = 0.86 },
    @{ source = "Akku Tausch.png"; output = "battery-repair.webp"; width = 160; height = 160; quality = 0.86 },
    @{ source = "OEM Akku Tausch.png"; output = "oem-battery-repair.webp"; width = 160; height = 160; quality = 0.86 },
    @{ source = "R*glass Tausch.png"; output = "backglass-repair.webp"; width = 160; height = 160; quality = 0.86 }
  )

  $created = 0
  foreach ($asset in $webpAssets) {
    $sourceFile = Get-ChildItem -LiteralPath $iconSourceDir -Filter $asset.source | Select-Object -First 1
    if (-not $sourceFile) {
      throw "Source image fehlt: $($asset.source)"
    }

    $rendered = Render-Webp $socket $nextRef (ConvertTo-FileUrl $sourceFile.FullName) $asset.width $asset.height $asset.quality
    if (-not $rendered.ok) {
      throw "WebP konnte nicht erzeugt werden: $($sourceFile.FullName)"
    }

    [IO.File]::WriteAllBytes((Join-Path $iconOutDir $asset.output), [Convert]::FromBase64String($rendered.data))
    $created += 1
  }

  $finderSource = Get-ChildItem -LiteralPath $finderSourceDir -Filter "*Small Button Icon.png" | Select-Object -First 1
  if (-not $finderSource) {
    throw "Model Finder icon source wurde nicht gefunden."
  }
  $finderRendered = Render-Webp $socket $nextRef (ConvertTo-FileUrl $finderSource.FullName) 180 180 0.84
  if (-not $finderRendered.ok) {
    throw "Model Finder WebP konnte nicht erzeugt werden."
  }
  [IO.File]::WriteAllBytes((Join-Path $finderOutDir "model-finder-icon.webp"), [Convert]::FromBase64String($finderRendered.data))
  $created += 1

  Copy-Item -LiteralPath (Join-Path $iconSourceDir "handy-ios.svg") -Destination (Join-Path $iconOutDir "iphone-device.svg") -Force
  Copy-Item -LiteralPath (Join-Path $iconSourceDir "apple-watch.svg") -Destination (Join-Path $iconOutDir "apple-watch.svg") -Force
  Copy-Item -LiteralPath (Join-Path $iconSourceDir "macbooks.svg") -Destination (Join-Path $iconOutDir "macbook.svg") -Force
  $created += 3

  if ($socket.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
    [void]$socket.CloseAsync(
      [System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure,
      "done",
      [Threading.CancellationToken]::None
    ).GetAwaiter().GetResult()
  }

  Write-Output ("Created {0} iPhone icon assets." -f $created)
} finally {
  if ($edge -and -not $edge.HasExited) {
    Stop-Process -Id $edge.Id -Force -ErrorAction SilentlyContinue
  }
}
