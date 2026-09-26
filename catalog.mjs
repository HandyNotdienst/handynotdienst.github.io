export function visibleOptions(category) {
  return category.options.filter(o => ['FIXED','PRICE_ON_REQUEST','LEGACY_UNMIGRATED'].includes(o.priceStatus));
}
export function revealSelectedCategory(nav) {
  const selected=nav.querySelector('[aria-pressed="true"]');
  if(!selected||nav.scrollWidth<=nav.clientWidth)return;
  const container=nav.getBoundingClientRect(),button=selected.getBoundingClientRect();
  const left=container.left+nav.clientLeft,right=left+nav.clientWidth;
  if(button.left<left)nav.scrollLeft+=button.left-left;
  else if(button.right>right)nav.scrollLeft+=button.right-right;
}
export function customerOption(option) {
  if(option.id==='public-f9d565bcf4c60079')return {...option,
    label:'Zusammengesetztes Soft-OLED-Modul 120 Hz',
    description:'Zusammengesetztes Displaymodul; Ausführung vor Auftrag klären.',
    limitations:['Kein originales Herstellerdisplay; Bildabstimmung kann abweichen.','Nicht mit einem neuen Originalmodul gleichzusetzen.']};
  return {...option,label:option.label.replace(/\((\d+) Hz\) · \1 Hz$/, '· $1 Hz')};
}
export function displayPrice(option, campaign = {active:false}) {
  if (option.priceStatus === 'PRICE_ON_REQUEST' || option.price === null) return 'Preis auf Anfrage';
  const amount = campaign.active === true && option.priceStatus === 'FIXED' && option.promoEligible && Number.isFinite(campaign.percent)
    ? Math.round(option.price * (100 - Math.max(0,Math.min(100,campaign.percent)))) / 100 : option.price;
  return new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:2,minimumFractionDigits:0}).format(amount);
}
export function requestText(model, category, option, delivery) {
  option=customerOption(option);
  return `Hallo Handy Notdienst, ich möchte eine Reparatur anfragen.\nModell: ${model.name}\nReparatur: ${category.name}\nVariante: ${option.label}\nPreis: ${displayPrice(option)}${option.price !== null ? ' inkl. Einbau' : ''}\nVerfügbarkeit: ${option.availability || 'Verfügbarkeit wird vor Auftrag bestätigt'}\nÜbergabe: ${delivery === 'shipping' ? 'Per Versand' : 'In Singen nach Vereinbarung'}\nBitte Teileverfügbarkeit, Ausführung und Endpreis vor Auftrag bestätigen.`;
}

if (typeof document !== 'undefined') {
  const pricingVersion='HN-PRICING-V1-2026-09-25';
  if('serviceWorker' in navigator){
    const reflectController=()=>{document.documentElement.dataset.swControlled=String(Boolean(navigator.serviceWorker.controller));};
    navigator.serviceWorker.addEventListener('controllerchange',reflectController);
    reflectController();
    navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(error=>console.warn('Service worker update unavailable',error));
  }
  const $ = s => document.querySelector(s);
  const el = (tag, cls, text) => {const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
  let catalog, selectedModel, selectedCategory = 'display', activeRequest;
  const query = new URLSearchParams(location.search);
  const brand = $('#brand'), models = $('#model'), search = $('#model-search');
  $('#dark-mode').addEventListener('change', e => {document.documentElement.dataset.theme=e.target.checked?'dark':'light';});
  if(query.get('theme')==='dark') {$('#dark-mode').checked=true;document.documentElement.dataset.theme='dark';}
  function announce(text) {$('#status').textContent=text;}
  function setQuery() {const q=new URLSearchParams({model:selectedModel.id,repair:selectedCategory});if($('#dark-mode').checked)q.set('theme','dark');history.replaceState(null,'',`?${q}`);}
  function optionCard(option, category) {
    option=customerOption(option);
    const card=el('article','option-card');card.dataset.optionId=option.id;card.dataset.status=option.priceStatus;card.dataset.availability=option.availabilityStatus||'UNKNOWN';
    card.append(el('span','tier',option.tier),el('h4','',option.label),el('p','description',option.description));
    if(option.label.startsWith('Originalteil – OEM Pull Grade A'))card.append(el('p','used-part','Gebrauchtes Teil, nicht fabrikneu.'));
    if(option.recommended)card.append(el('span','recommended','Empfehlung'));
    card.append(el('div',`amount${option.price===null?' inquiry':''}`,displayPrice(option)));
    if(option.price!==null)card.append(el('p','included',option.priceBasis));
    card.append(el('p','part-availability',option.availability));
    const action=el('button','action',option.price===null?'Preis anfragen':'Reparatur anfragen');action.type='button';
    action.setAttribute('aria-label',`${category.name}: ${option.label}, ${displayPrice(option)}, anfragen`);
    action.addEventListener('click',()=>openRequest(category,option));card.append(action);
    if(option.advantages.length||option.limitations.length) {
      const details=el('details');details.append(el('summary','','Details & Hinweise'));
      for(const [title,list]of [['Vorteile',option.advantages],['Zu beachten',option.limitations]])if(list.length){details.append(el('strong','',title));const ul=el('ul');list.forEach(text=>ul.append(el('li','',text)));details.append(ul);}
      card.append(details);
    }
    return card;
  }
  function renderRepairs() {
    const container=$('#repairs');container.replaceChildren();
    const categories=selectedModel.categories.filter(c=>selectedCategory==='all'||c.id===selectedCategory);
    for(const category of categories) {
      const options=visibleOptions(category);if(!options.length)continue;
      const section=el('section','repair-section');section.dataset.category=category.id;
      const heading=el('div','repair-heading');const title=el('h3','',category.name);title.id=`repair-${category.id}`;
      section.setAttribute('aria-labelledby',title.id);heading.append(title,el('span','',`${options.length} ${options.length===1?'Option':'Optionen'}`));section.append(heading);
      if(category.sharedNote)section.append(el('p','shared-note',category.sharedNote));
      const first=el('div','option-grid');options.slice(0,4).forEach(o=>first.append(optionCard(o,category)));section.append(first);
      if(options.length>4) {const more=el('details','more');more.append(el('summary','',`Weitere Optionen (${options.length-4})`));const grid=el('div','option-grid');options.slice(4).forEach(o=>grid.append(optionCard(o,category)));more.append(grid);section.append(more);}
      container.append(section);
    }
    $('#categories').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===selectedCategory)));
    revealSelectedCategory($('#categories'));
    setQuery();announce(`${selectedModel.name} · ${categories.reduce((n,c)=>n+visibleOptions(c).length,0)} Reparaturoptionen`);
  }
  function selectModel(id) {
    selectedModel=catalog.models.find(m=>m.id===id);if(!selectedModel)return;
    if(!selectedModel.categories.some(c=>c.id===selectedCategory)&&selectedCategory!=='all')selectedCategory=selectedModel.categories[0].id;
    $('#device').hidden=false;$('#device-title').textContent=selectedModel.name;$('#device-brand').textContent=selectedModel.brand;
    const image=$('#device-image');image.hidden=!selectedModel.image;if(selectedModel.image){image.src=`/${selectedModel.image}`;image.alt=selectedModel.name;}else{image.removeAttribute('src');image.alt='';}
    const nav=$('#categories');nav.replaceChildren();
    for(const c of [...selectedModel.categories,{id:'all',name:'Alle Reparaturen'}]) {const b=el('button','',c.name);b.type='button';b.dataset.category=c.id;b.addEventListener('click',()=>{selectedCategory=c.id;renderRepairs();});nav.append(b);}
    renderRepairs();
  }
  function fillModels(preferred) {
    const list=catalog.models.filter(m=>m.brand===brand.value&&m.name.toLowerCase().includes(search.value.trim().toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name,'de',{numeric:true,sensitivity:'base'}));
    models.replaceChildren(...list.map(m=>{const o=el('option','',m.name);o.value=m.id;return o;}));
    models.disabled=!list.length;
    if(!list.length){$('#device').hidden=true;$('#categories').replaceChildren();$('#repairs').replaceChildren();announce('Kein passendes Modell gefunden.');return;}
    models.value=list.some(m=>m.id===preferred)?preferred:list[0].id;selectModel(models.value);
  }
  function updateRequest() {
    const {model,category,option}=activeRequest;const delivery=document.querySelector('[name=delivery]:checked').value;
    $('#delivery-note').textContent=delivery==='shipping'?'Hinversand auf deine Kosten, getrackter Rückversand durch Handy Notdienst. Versandhinweise nach Kontakt.':'Übergabe in Singen nach Vereinbarung. Anfahrt separat.';
    $('#request-link').href=`https://wa.me/4915222416438?text=${encodeURIComponent(requestText(model,category,option,delivery))}`;
  }
  function openRequest(category,option) {
    activeRequest={model:selectedModel,category,option};$('#request-title').textContent=selectedModel.name;$('#request-option').textContent=`${category.name} · ${option.label}`;
    $('#request-price').textContent=displayPrice(option);
    $('#request-price-basis').textContent=option.price!==null?'Preis inkl. Einbau · keine aktive Rabattaktion':'Endpreis nach Prüfung';
    $('#request-availability').textContent=option.availability;updateRequest();$('#request-dialog').showModal();
  }
  $('#request-dialog').querySelectorAll('[name=delivery]').forEach(i=>i.addEventListener('change',updateRequest));
  brand.addEventListener('change',()=>{search.value='';fillModels();});models.addEventListener('change',()=>selectModel(models.value));
  search.addEventListener('input',()=>fillModels(selectedModel?.id));$('#retry').addEventListener('click',load);
  async function load() {
    $('#error').hidden=true;
    try {
      const response=await fetch(`/catalog.json?v=${pricingVersion}`,{cache:'no-store'});if(!response.ok)throw Error('catalog');catalog=await response.json();
      if(catalog.pricingVersion!==pricingVersion)throw Error('Catalog release mismatch');
      document.documentElement.dataset.pricingVersion=catalog.pricingVersion;
      brand.replaceChildren(...[...new Set(catalog.models.map(m=>m.brand))].sort().map(b=>{const o=el('option','',b);o.value=b;return o;}));
      const initial=catalog.models.find(m=>m.id===query.get('model'))||catalog.models.find(m=>m.name==='iPhone 16 Pro Max')||catalog.models[0];
      brand.value=initial.brand;brand.disabled=false;search.disabled=false;selectedCategory=query.get('repair')||'display';fillModels(initial.id);
    } catch {announce('Katalog nicht verfügbar.');$('#error').hidden=false;}
  }
  load();
}
