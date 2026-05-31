param(
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [int]$Port = 9233
)

$ErrorActionPreference = "Stop"

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path -LiteralPath $edgePath)) {
  throw "Microsoft Edge wurde nicht gefunden: $edgePath"
}

$phoneDir = Join-Path $RepoRoot "assets\phones"
$outDir = Join-Path $phoneDir "optimized"
$assetOutDir = Join-Path $RepoRoot "assets\optimized"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
New-Item -ItemType Directory -Force -Path $assetOutDir | Out-Null

$profileDir = Join-Path (Split-Path $RepoRoot -Parent) ".edge-cdp-optimize"
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

function Render-Image(
  [System.Net.WebSockets.ClientWebSocket]$Socket,
  [ref]$NextId,
  [string]$SourceUrl,
  [int]$Width,
  [int]$Height,
  [string]$MimeType,
  [double]$Quality,
  [string]$Fit = "contain"
) {
  $srcJson = $SourceUrl | ConvertTo-Json -Compress
  $mimeJson = $MimeType | ConvertTo-Json -Compress
  $fitJson = $Fit | ConvertTo-Json -Compress
  $qualityString = $Quality.ToString([Globalization.CultureInfo]::InvariantCulture)

  $expression = @"
(async () => {
  const src = $srcJson;
  const width = $Width;
  const height = $Height;
  const mimeType = $mimeJson;
  const fit = $fitJson;
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

  const pad = fit === "cover" ? 0 : Math.round(Math.min(width, height) * 0.045);
  const maxW = width - pad * 2;
  const maxH = height - pad * 2;
  const scale = fit === "cover"
    ? Math.max(maxW / img.naturalWidth, maxH / img.naturalHeight)
    : Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
  const drawW = Math.round(img.naturalWidth * scale);
  const drawH = Math.round(img.naturalHeight * scale);
  const drawX = Math.round((width - drawW) / 2);
  const drawY = Math.round((height - drawH) / 2);
  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  let blob = await new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality));
  if ((!blob || blob.type !== mimeType) && mimeType === "image/avif" && "ImageEncoder" in window) {
    try {
      const bitmap = await createImageBitmap(canvas);
      const encoder = new ImageEncoder({ type: mimeType, quality });
      const encoded = await encoder.encode(bitmap);
      blob = new Blob([encoded.encodedData], { type: mimeType });
      bitmap.close?.();
      encoder.close?.();
    } catch (_) {
      blob = null;
    }
  }
  if (!blob || blob.type !== mimeType) {
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

  $sizes = @(
    @{ suffix = "420"; width = 420; height = 350 },
    @{ suffix = "800"; width = 800; height = 667 }
  )
  $formats = @(
    @{ extension = "webp"; mime = "image/webp"; quality = 0.82 },
    @{ extension = "avif"; mime = "image/avif"; quality = 0.62 }
  )

  $created = 0
  $skipped = 0

  Get-ChildItem -LiteralPath $phoneDir -Filter "*.png" | Sort-Object Name | ForEach-Object {
    $source = ConvertTo-FileUrl $_.FullName
    foreach ($size in $sizes) {
      foreach ($format in $formats) {
        $rendered = Render-Image $socket $nextRef $source $size.width $size.height $format.mime $format.quality "contain"
        if (-not $rendered.ok) {
          $skipped += 1
          continue
        }

        $outFile = Join-Path $outDir ("{0}-{1}.{2}" -f $_.BaseName, $size.suffix, $format.extension)
        [IO.File]::WriteAllBytes($outFile, [Convert]::FromBase64String($rendered.data))
        $created += 1
      }
    }
  }

  $showcaseSizes = @(
    @{ suffix = "640"; width = 640; height = 400 },
    @{ suffix = "1100"; width = 1100; height = 688 }
  )
  @("before-phone.png", "after-phone.png") | ForEach-Object {
    $file = Join-Path (Join-Path $RepoRoot "assets") $_
    if (-not (Test-Path -LiteralPath $file)) { return }
    $source = ConvertTo-FileUrl $file
    $baseName = [IO.Path]::GetFileNameWithoutExtension($file)

    foreach ($size in $showcaseSizes) {
      foreach ($format in $formats) {
        $rendered = Render-Image $socket $nextRef $source $size.width $size.height $format.mime $format.quality "cover"
        if (-not $rendered.ok) {
          $skipped += 1
          continue
        }

        $outFile = Join-Path $assetOutDir ("{0}-{1}.{2}" -f $baseName, $size.suffix, $format.extension)
        [IO.File]::WriteAllBytes($outFile, [Convert]::FromBase64String($rendered.data))
        $created += 1
      }
    }
  }

  if ($socket.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
    [void]$socket.CloseAsync(
      [System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure,
      "done",
      [Threading.CancellationToken]::None
    ).GetAwaiter().GetResult()
  }

  Write-Output ("Created {0} optimized files. Skipped {1} unsupported encodes." -f $created, $skipped)
} finally {
  if ($edge -and -not $edge.HasExited) {
    Stop-Process -Id $edge.Id -Force -ErrorAction SilentlyContinue
  }
}
