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
