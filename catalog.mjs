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
const catalogI18n = () => globalThis.HN_CATALOG_I18N || {getLang:()=> 'de',t:key=>key,translateCategory:category=>category.name,localizeOption:option=>option,formatPrice:amount=>`${amount} €`};
export function displayPrice(option, campaign = {active:false}, lang = catalogI18n().getLang()) {
  if (option.priceStatus === 'PRICE_ON_REQUEST' || option.price === null) return catalogI18n().t('askPrice');
  const amount = campaign.active === true && option.priceStatus === 'FIXED' && option.promoEligible && Number.isFinite(campaign.percent)
    ? Math.round(option.price * (100 - Math.max(0,Math.min(100,campaign.percent)))) / 100 : option.price;
  return catalogI18n().formatPrice ? catalogI18n().formatPrice(amount, lang) : new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:2,minimumFractionDigits:0}).format(amount);
}
export function requestText(model, category, option, delivery, lang = catalogI18n().getLang()) {
  option=customerOption(option);
  const i18n = catalogI18n();
  return `${i18n.t('whatsappIntro')}\n${i18n.t('whatsappModel')}: ${model.name}\n${i18n.t('whatsappRepair')}: ${i18n.translateCategory(category)}\n${i18n.t('whatsappVariant')}: ${i18n.localizeOption(option).label}\n${i18n.t('whatsappPrice')}: ${displayPrice(option, {active:false}, lang)}${option.price !== null ? ` · ${i18n.t('included')}` : ''}\n${i18n.t('whatsappAvailability')}: ${i18n.localizeOption(option).availability || i18n.t('unavailable')}\n${i18n.t('whatsappTransfer')}: ${delivery === 'shipping' ? i18n.t('whatsappShipping') : i18n.t('whatsappLocal')}\n${i18n.t('whatsappConfirm')}`;
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
  const themeButton = $('#theme-toggle');
  const i18n = catalogI18n();
  i18n.init?.();
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let explicitTheme = ['dark','light'].includes(query.get('theme'));
  try { explicitTheme ||= ['dark','light'].includes(localStorage.getItem('hn_theme')); } catch {}
  function syncTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const label = theme === 'dark' ? i18n.t('themeLight') : i18n.t('themeDark');
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
  }
  syncTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    explicitTheme = true;
    syncTheme(theme);
    try { localStorage.setItem('hn_theme', theme); } catch {}
    const next = new URLSearchParams(location.search);
    if (next.has('theme')) next.set('theme', theme);
    history.replaceState(null, '', `${location.pathname}${next.size ? '?' + next : ''}${location.hash}`);
  });
  systemTheme.addEventListener('change', event => { if (!explicitTheme) syncTheme(event.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', event => {
    if (event.key !== 'hn_theme' || new URLSearchParams(location.search).has('theme')) return;
    explicitTheme = ['dark','light'].includes(event.newValue);
    syncTheme(explicitTheme ? event.newValue : systemTheme.matches ? 'dark' : 'light');
  });
  const menuButton = $('#menu-toggle'), siteNav = $('#site-nav');
  const compactHeader = matchMedia('(max-width: 760px)');
  function setMenu(open, restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? i18n.t('menuClose') : i18n.t('menuOpen'));
    menuButton.title = open ? i18n.t('menuClose') : i18n.t('menuOpen');
    siteNav.classList.toggle('is-open', open);
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
    if (open) siteNav.querySelector('a').focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false, true); event.preventDefault(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) setMenu(false);
  });
  siteNav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  compactHeader.addEventListener('change', () => {
    const navFocused = siteNav.contains(document.activeElement);
    setMenu(false, compactHeader.matches && navFocused);
    revealSelectedCategory($('#categories'));
  });
  window.addEventListener('resize', () => revealSelectedCategory($('#categories')));
  function announce(text) {$('#status').textContent=text;}
  function setQuery() {const q=new URLSearchParams({model:selectedModel.id,repair:selectedCategory});if(new URLSearchParams(location.search).has('theme'))q.set('theme',document.documentElement.dataset.theme);history.replaceState(null,'',`?${q}`);}
  function optionCard(option, category) {
    option=i18n.localizeOption(customerOption(option));
    const card=el('article','option-card');card.dataset.optionId=option.id;card.dataset.status=option.priceStatus;card.dataset.availability=option.availabilityStatus||'UNKNOWN';
    card.append(el('span','tier',option.tier),el('h4','',option.label));
    if(option.recommended)card.append(el('span','recommended',i18n.t('recommendation')));
    card.append(el('div',`amount${option.price===null?' inquiry':''}`,displayPrice(option)));
    if(option.price!==null)card.append(el('p','included',i18n.t('included')));
    card.append(el('p','part-availability',option.availability));
    card.append(el('p','description',option.description));
    if(option.label.startsWith('Originalteil – OEM Pull Grade A') || option.label.startsWith('Original part – OEM Pull Grade A'))card.append(el('p','used-part',i18n.t('usedPart')));
    const action=el('button','action',option.price===null?i18n.t('askPrice'):i18n.t('request'));action.type='button';
    action.setAttribute('aria-label',`${i18n.translateCategory(category)}: ${option.label}, ${displayPrice(option)}, ${option.price===null?i18n.t('askPrice'):i18n.t('request')}`);
    action.addEventListener('click',()=>openRequest(category,option));card.append(action);
    if(option.advantages.length||option.limitations.length) {
      const details=el('details');details.append(el('summary','',i18n.t('details')));
      for(const [title,list]of [[i18n.t('benefits'),option.advantages],[i18n.t('limitations'),option.limitations]])if(list.length){details.append(el('strong','',title));const ul=el('ul');list.forEach(text=>ul.append(el('li','',text)));details.append(ul);}
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
      const heading=el('div','repair-heading');const title=el('h3','',i18n.translateCategory(category));title.id=`repair-${category.id}`;
      section.setAttribute('aria-labelledby',title.id);heading.append(title,el('span','',options.length===1?`1 ${i18n.t('option')}`:`${options.length} ${i18n.t('options')}`));section.append(heading);
      if(category.sharedNote)section.append(el('p','shared-note',i18n.translateText(category.sharedNote)));
      const first=el('div','option-grid');options.slice(0,4).forEach(o=>first.append(optionCard(o,category)));section.append(first);
      if(options.length>4) {const more=el('details','more');more.append(el('summary','',i18n.t('moreCount',{count:options.length-4})));const grid=el('div','option-grid');options.slice(4).forEach(o=>grid.append(optionCard(o,category)));more.append(grid);section.append(more);}
      container.append(section);
    }
    $('#categories').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===selectedCategory)));
    revealSelectedCategory($('#categories'));
    setQuery();announce(i18n.t('categoryCount',{model:selectedModel.name,count:categories.reduce((n,c)=>n+visibleOptions(c).length,0)}));
  }
  function selectModel(id) {
    selectedModel=catalog.models.find(m=>m.id===id);if(!selectedModel)return;
    if(!selectedModel.categories.some(c=>c.id===selectedCategory)&&selectedCategory!=='all')selectedCategory=selectedModel.categories[0].id;
    $('#device').hidden=false;$('#device-title').textContent=selectedModel.name;$('#device-brand').textContent=selectedModel.brand;
    const image=$('#device-image');image.hidden=!selectedModel.image;if(selectedModel.image){image.src=`/${selectedModel.image}`;image.alt=selectedModel.name;}else{image.removeAttribute('src');image.alt='';}
    const nav=$('#categories');nav.replaceChildren();
    for(const c of [...selectedModel.categories,{id:'all',name:'Alle Reparaturen'}]) {const b=el('button','',i18n.translateCategory(c));b.type='button';b.dataset.category=c.id;b.addEventListener('click',()=>{selectedCategory=c.id;renderRepairs();});nav.append(b);}
    renderRepairs();
  }
  function fillModels(preferred) {
    const list=catalog.models.filter(m=>m.brand===brand.value&&m.name.toLowerCase().includes(search.value.trim().toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name,'de',{numeric:true,sensitivity:'base'}));
    models.replaceChildren(...list.map(m=>{const o=el('option','',m.name);o.value=m.id;return o;}));
    models.disabled=!list.length;
    if(!list.length){$('#device').hidden=true;$('#categories').replaceChildren();$('#repairs').replaceChildren();announce(i18n.t('noModel'));return;}
    models.value=list.some(m=>m.id===preferred)?preferred:list[0].id;selectModel(models.value);
  }
  function updateRequest() {
    const {model,category,option}=activeRequest;const delivery=document.querySelector('[name=delivery]:checked').value;
    $('#delivery-note').textContent=delivery==='shipping'?i18n.t('shippingNote'):i18n.t('localNote');
    $('#request-link').href=`https://wa.me/4915222416438?text=${encodeURIComponent(requestText(model,category,option,delivery,i18n.getLang()))}`;
  }
  function openRequest(category,option) {
    activeRequest={model:selectedModel,category,option};const localized=i18n.localizeOption(customerOption(option));$('#request-title').textContent=selectedModel.name;$('#request-option').textContent=`${i18n.translateCategory(category)} · ${localized.label}`;
    $('#request-price').textContent=displayPrice(option);
    $('#request-price-basis').textContent=option.price!==null?`${i18n.t('included')} · ${i18n.t('endPrice')}`:i18n.t('endPrice');
    $('#request-availability').textContent=localized.availability;updateRequest();$('#request-dialog').showModal();
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
    } catch {announce(i18n.t('catalogError'));$('#error').hidden=false;}
  }
  i18n.onChange(() => { syncTheme(document.documentElement.dataset.theme); if(selectedModel) { const currentId=selectedModel.id; fillModels(currentId); } });
  load();
}
