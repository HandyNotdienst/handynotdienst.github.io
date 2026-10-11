import { visibleOptions } from './catalog-data.mjs?v=HN-GUIDED-PRICES-V2-2026-10-01';

export const PRICING_VERSION = 'HN-PRICING-V1-2026-09-25';
export const UI_VERSION = 'HN-GUIDED-PRICES-V2-2026-10-01';
export const BRAND_DEFINITIONS = [
  { id: 'Apple', label: 'Apple', logo: '/assets/logos/manufacturers/apple.png' },
  { id: 'Samsung', label: 'Samsung', logo: '/assets/logos/manufacturers/samsung.png' },
  { id: 'Google', label: 'Google Pixel', logo: '/assets/logos/manufacturers/google-pixel.png' },
  { id: 'Xiaomi', label: 'Xiaomi', logo: '/assets/logos/manufacturers/xiaomi.png' },
  { id: 'Redmi', label: 'Redmi', logo: '/assets/logos/manufacturers/redmi.png' },
  { id: 'Poco', label: 'Poco', logo: '/assets/logos/manufacturers/poco.png' },
  { id: 'Honor', label: 'Honor', logo: '/assets/logos/manufacturers/honor.png' },
  { id: 'Huawei', label: 'Huawei', logo: '/assets/logos/manufacturers/huawei.png' },
  { id: 'Sony', label: 'Sony', logo: '/assets/logos/manufacturers/sony.png' }
];
const BRAND_RANK = new Map(BRAND_DEFINITIONS.map((brand, index) => [brand.id, index]));
const FAMILY_ORDER = {
  Apple: ['iPhone', 'iPad', 'Apple Watch'],
  Samsung: ['Galaxy S', 'Galaxy A', 'Galaxy Note', 'Galaxy Z', 'Galaxy M', 'Galaxy J', 'Galaxy XCover'],
  Google: ['Pixel'],
  Huawei: ['Mate', 'P', 'Y'],
  Poco: ['F', 'X', 'M'],
  Redmi: ['Redmi Note', 'Redmi'],
  Xiaomi: ['Mi', 'Xiaomi'],
  Honor: ['Honor'],
  Sony: ['Xperia 10', 'Xperia L']
};
const FAMILY_RANK = new Map(Object.entries(FAMILY_ORDER).flatMap(([brand, families]) => families.map((family, index) => [`${brand}:${family}`, index])));
// Presentation order only. Release cohorts keep SE, iPad screen sizes and Galaxy A
// price tiers from being mistaken for generations. See brand-picker-verification.md.
const IPHONE_GENERATIONS = ['4','4s','5','5c','5s','6','6s','SE1','7','8','X','XS','XR','11','SE2','12','13','SE3','14','15','16','16e','17','Air','17e'];
const IPAD_YEARS = {
  standard: {2:2011,3:2012,4:2012.5,5:2017,6:2018,7:2019,8:2020,9:2021,10:2022,A16:2025},
  Air: {2:2014,3:2019,4:2020,5:2022,M2:2024,M3:2025,M4:2026},
  mini: {2:2013,3:2014,4:2015,5:2019,6:2021,A17:2024},
  'Pro 11': {1:2018,2:2020,3:2021,4:2022,M4:2024,M5:2025},
  'Pro 12.9': {1:2015,2:2017,3:2018,4:2020,5:2021,6:2022},
  'Pro 13': {M4:2024,M5:2025},
  'Pro 9.7': {1:2016}, 'Pro 10.5': {1:2017}
};
const SAMSUNG_A_COHORTS = [
  ['6','7','9'], ['2','10','20','30','40','50','60','70','80','90'],
  ['01','11','21','31','41','51','71'], ['02','03','12','22','32','52','72'],
  ['04','13','23','53','73'], ['14','24','34','54'], ['15','16']
];
const SAMSUNG_M_COHORTS = [['20','30'],['31','51'],['52'],['23'],['54']];
const APPLE_ICON_ALIASES = {
  'iphone-16e': '/assets/phones/optimized/iphone-16e-420.webp',
  'iphone-17e': '/assets/phones/optimized/iphone-17e-420.webp',
  'legacy-iphone-16e-17e': '/assets/phones/optimized/iphone-16e-420.webp',
  'legacy-iphone-12-12-pro': '/assets/phones/optimized/iphone-12-12-pro-420.webp',
  'legacy-iphone-x-xs-xr': '/assets/phones/optimized/iphone-x-xs-xr-420.webp',
  'legacy-iphone-se-2022-': '/assets/phones/optimized/iphone-se-2022-420.webp',
  'legacy-iphone-se-2020-': '/assets/phones/optimized/iphone-se-2020-420.webp',
  'legacy-iphone-7-7-plus': '/assets/phones/optimized/iphone-7-7-plus-420.webp',
  'legacy-iphone-6s-6s-plus': '/assets/phones/optimized/iphone-6s-6s-plus-420.webp',
  'legacy-iphone-6-6-plus': '/assets/phones/optimized/iphone-6-6-plus-420.webp'
};
const SAMSUNG_SERIES_ICONS = {
  'Galaxy S': '/assets/samsung/series/galaxy-s.png',
  'Galaxy A': '/assets/samsung/series/galaxy-a.png',
  'Galaxy Note': '/assets/samsung/series/galaxy-note.png',
  'Galaxy Z': '/assets/samsung/series/galaxy-z-fold.png',
  'Galaxy M': '/assets/samsung/series/galaxy-m.png',
  'Galaxy J': null,
  'Galaxy XCover': '/assets/samsung/series/galaxy-xcover.png'
};
export const initialState = () => ({ step: 1, brand: null, model: null, repair: null, option: null, delivery: 'local' });

export function modelFamily(model) {
  const name = model.name || '';
  if (model.brand === 'Apple') {
    if (/^iPhone/i.test(name)) return 'iPhone';
    if (/^iPad/i.test(name)) return 'iPad';
    if (/^Apple Watch/i.test(name)) return 'Apple Watch';
  }
  if (model.brand === 'Samsung') {
    const match = name.match(/Galaxy\s+(Note|S|A|Z|M|J)(?=\s|\d)/i);
    if (match) return `Galaxy ${match[1][0].toUpperCase()}${match[1].slice(1).toLowerCase()}`;
    if (/Galaxy\s+XCover/i.test(name)) return 'Galaxy XCover';
    return 'otherModels';
  }
  if (model.brand === 'Google') return 'Pixel';
  if (model.brand === 'Huawei') return /\bMate\b/i.test(name) ? 'Mate' : /\bP\d/i.test(name) ? 'P' : /\bY\d/i.test(name) ? 'Y' : 'otherModels';
  if (model.brand === 'Poco') return /\bF\d/i.test(name) ? 'F' : /\bX\d/i.test(name) ? 'X' : /\bM\d/i.test(name) ? 'M' : 'otherModels';
  if (model.brand === 'Redmi') return /\bNote\b/i.test(name) ? 'Redmi Note' : /^Redmi\s+\d/i.test(name) ? 'Redmi' : 'otherModels';
  if (model.brand === 'Xiaomi') return /\bMi\b/i.test(name) ? 'Mi' : 'Xiaomi';
  if (model.brand === 'Sony') return /Xperia\s+L/i.test(name) ? 'Xperia L' : /Xperia\s+10/i.test(name) ? 'Xperia 10' : 'otherModels';
  if (model.brand === 'Honor') return 'Honor';
  return 'otherModels';
}

function generationNumber(model) {
  const name = model.name || '';
  if (/^iPhone/i.test(name)) {
    let generation = name.match(/^iPhone\s+(\d+[sce]?|XS|XR|X|Air)/i)?.[1];
    if (/^iPhone SE/i.test(name)) generation = /2022|3rd/.test(name) ? 'SE3' : /2020|2nd/.test(name) ? 'SE2' : 'SE1';
    const index = IPHONE_GENERATIONS.indexOf(generation);
    return index < 0 ? 9999 : index;
  }
  if (/^iPad/i.test(name)) {
    const line = /^iPad Pro/.test(name) ? `Pro ${name.match(/(\d+(?:\.\d+)?)[-‑]inch/)?.[1]}` : /Air/.test(name) ? 'Air' : /mini/.test(name) ? 'mini' : 'standard';
    const generation = name.match(/\b([MA]\d+)/)?.[1] || name.match(/\((\d+)(?:st|nd|rd|th) generation\)/)?.[1] || name.match(/^iPad(?: Air| mini)? (\d+)$/)?.[1] || 1;
    return IPAD_YEARS[line]?.[generation] ?? 9999;
  }
  if (/^Apple Watch/.test(name)) return /\bSE\b/.test(name) ? 2020 : 2014 + Number(name.match(/Series (\d+)/)?.[1] || 9999);
  if (model.brand === 'Samsung') {
    const number = name.match(/Galaxy\s+(?:Note|[SAMJ])\s*(\d+)/)?.[1];
    const cohorts = modelFamily(model) === 'Galaxy A' ? SAMSUNG_A_COHORTS : modelFamily(model) === 'Galaxy M' ? SAMSUNG_M_COHORTS : null;
    if (cohorts) { const index = cohorts.findIndex(group => group.includes(number)); return index < 0 ? 9999 : index; }
    return Number(number || name.match(/(?:Fold|Flip)\s*(\d+)/)?.[1] || 9999);
  }
  if (model.brand === 'Huawei' && modelFamily(model) === 'Y') return Number(name.match(/20\d{2}/)?.[0] || (/Y9A/i.test(name) ? 2020 : 9999));
  if (model.brand === 'Sony' && modelFamily(model) === 'Xperia 10') return /\bV\b/.test(name) ? 5 : 1;
  const number = Number(name.match(/\d+/)?.[0] || 9999);
  return number + (model.brand === 'Google' && /Pixel\s+\d+a/i.test(name) ? .5 : 0);
}

function variantRank(model) {
  const name = model.name || '';
  const tier = /\bUltra\b/i.test(name) ? 7 : /\bPro Max\b/i.test(name) ? 5 : /\bPro XL\b/i.test(name) ? 5 : /\bPro\b/i.test(name) ? 4 : /\bMax\b/i.test(name) ? 5 : /\bFE\b/i.test(name) ? 6 : /\bPlus\b|\+|\bXL\b/i.test(name) ? 3 : /\bmini\b/i.test(name) ? 2 : /\bLite\b|\bCore\b/i.test(name) ? 1 : 0;
  const size = model.brand === 'Apple' && /^Apple Watch/.test(name) ? (/\bSE\b/.test(name) ? 100 : 0) + Number(name.match(/(\d+) mm/)?.[1] || 0) : 0;
  const generation = model.brand === 'Samsung' ? Number(name.match(/Galaxy\s+[AM](\d+)/)?.[1] || 0) * 100 : 0;
  return generation + tier * 10 + (/\b5G\b/i.test(name) ? 2 : /\b4G\b/i.test(name) ? 1 : 0) + size;
}

export function sortModels(models) {
  return models.map((model, index) => ({ model, index, family: modelFamily(model) })).sort((a, b) =>
    (BRAND_RANK.get(a.model.brand) ?? 99) - (BRAND_RANK.get(b.model.brand) ?? 99) ||
    ((FAMILY_RANK.get(`${a.model.brand}:${a.family}`) ?? 99) - (FAMILY_RANK.get(`${b.model.brand}:${b.family}`) ?? 99)) ||
    generationNumber(a.model) - generationNumber(b.model) ||
    variantRank(a.model) - variantRank(b.model) ||
    a.index - b.index
  ).map(({ model }) => model);
}

export function modelIcon(model) {
  if (/^iPhone (17(?: Pro(?: Max)?)?|Air)$/.test(model.name)) return `/assets/phones/optimized/${model.id}-420.webp`;
  if (model.image) return `/${model.image.replace(/^\//, '')}`;
  if (model.brand === 'Apple' && APPLE_ICON_ALIASES[model.id]) return APPLE_ICON_ALIASES[model.id];
  if (model.brand === 'Apple' && /^iPhone/i.test(model.name)) return '/assets/iphone-icons/iphone-device.svg';
  if (model.brand === 'Apple' && /^Apple Watch/i.test(model.name)) return '/assets/iphone-icons/apple-watch.svg';
  if (model.brand === 'Samsung' && /^Samsung Galaxy A16(?: 5G)?$/.test(model.name)) return '/assets/samsung/models/galaxy-a16.png';
  const family = modelFamily(model);
  const samsungGeneration = model.name.match(/Galaxy S(10|20|21|22|23|24|25)(?=\D|$)/)?.[1];
  if (model.brand === 'Samsung' && samsungGeneration) return `/assets/samsung/models/galaxy-s${samsungGeneration}-family.jpeg`;
  if (family === 'Galaxy Z' && /Flip/i.test(model.name)) return '/assets/samsung/series/galaxy-z-flip.png';
  if (model.brand === 'Samsung' && SAMSUNG_SERIES_ICONS[family]) return SAMSUNG_SERIES_ICONS[family];
  return BRAND_DEFINITIONS.find(brand => brand.id === model.brand)?.logo || null;
}
export function familyIcon(model) {
  const family = modelFamily(model);
  if (family === 'iPhone') return '/assets/iphone-icons/iphone-device.svg';
  if (family === 'Apple Watch') return '/assets/iphone-icons/apple-watch.svg';
  return SAMSUNG_SERIES_ICONS[family] || BRAND_DEFINITIONS.find(brand => brand.id === model.brand)?.logo || null;
}
export function repairCategories(model) {
  const order = ['display', 'battery', 'charging'];
  return (model?.categories || []).filter(c => visibleOptions(c).length).map((c, index) => ({ c, index }))
    .sort((a, b) => (order.includes(a.c.id) ? order.indexOf(a.c.id) : 3) - (order.includes(b.c.id) ? order.indexOf(b.c.id) : 3) || a.index - b.index).map(({ c }) => c);
}
export function resolveSelection(catalog, state) {
  const model = catalog.models.find(m => m.id === state.model);
  const repair = repairCategories(model).find(c => c.id === state.repair);
  const option = repair && visibleOptions(repair).find(o => o.id === state.option);
  return { model, repair, option };
}
export function normalizeState(catalog, value) {
  const selected = resolveSelection(catalog, value);
  const maxStep = selected.option ? 4 : selected.repair ? 3 : selected.model ? 2 : 1;
  const modelBrand = selected.model?.brand || null;
  const validBrand = BRAND_RANK.has(value.brand) ? value.brand : null;
  return { step: Math.min(maxStep, Math.max(1, Number.isInteger(Number(value.step)) ? Number(value.step) : maxStep)),
    brand: modelBrand || validBrand,
    model: selected.model?.id || null, repair: selected.repair?.id || null, option: selected.option?.id || null,
    delivery: value.delivery === 'shipping' ? 'shipping' : 'local' };
}
export function stateFromUrl(catalog, input) {
  const q = input instanceof URLSearchParams ? input : new URLSearchParams(input);
  return normalizeState(catalog, { brand: q.get('brand'), model: q.get('model'), repair: q.get('repair'), option: q.get('option'), delivery: q.get('delivery'), step: q.has('step') ? q.get('step') : undefined });
}
export function stateUrl(state, input) {
  const url = new URL(input);
  for (const key of ['brand', 'model', 'repair', 'option']) state[key] ? url.searchParams.set(key, state[key]) : url.searchParams.delete(key);
  if (state.model) url.searchParams.delete('brand');
  url.searchParams.set('step', String(state.step));
  url.searchParams.set('delivery', state.delivery);
  return url.pathname + url.search + url.hash;
}
export function transition(catalog, state, action) {
  let next = { ...state };
  if (action.type === 'brand') {
    const brand = BRAND_RANK.has(action.brand) ? action.brand : null;
    next = !brand ? { ...next, brand: null, model: null, repair: null, option: null, step: 1 } : brand !== state.brand ? { ...next, brand, model: null, repair: null, option: null, step: 1 } : { ...next, brand };
  }
  if (action.type === 'model') next = { ...next, model: action.id, step: 2, ...(action.id !== state.model ? { repair: null, option: null } : {}) };
  if (action.type === 'repair') next = { ...next, repair: action.id, step: 3, ...(action.id !== state.repair ? { option: null } : {}) };
  if (action.type === 'option') next.option = action.id;
  if (action.type === 'step') next.step = action.step;
  if (action.type === 'delivery') next.delivery = action.delivery;
  return normalizeState(catalog, next);
}
export function featuredOptions(options) {
  if (options.length <= 3) return [...options];
  const groups = [['STANDARD'], ['PREMIUM', 'REFURBISHED', 'OLED', 'ERHÖHTE KAPAZITÄT'], ['ORIGINALTEIL', 'ORIGINAL']];
  const ranked = options.map((option, index) => ({ option, index })).sort((a, b) =>
    Number(a.option.availabilityStatus === 'CURRENTLY_UNAVAILABLE') - Number(b.option.availabilityStatus === 'CURRENTLY_UNAVAILABLE') ||
    Number(!Number.isFinite(a.option.price)) - Number(!Number.isFinite(b.option.price)) ||
    (Number.isFinite(a.option.price) && Number.isFinite(b.option.price) ? a.option.price - b.option.price : 0) || a.index - b.index);
  const selected = groups.map(tiers => ranked.find(({ option }) => tiers.includes(option.tier))?.option).filter(Boolean);
  for (const option of options) if (selected.length < 3 && !selected.includes(option)) selected.push(option);
  return selected;
}
export function filterModels(catalog, brand, query) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return sortModels(catalog.models.filter(m => (!brand || m.brand === brand) && terms.every(term => `${m.brand} ${m.name}`.toLocaleLowerCase().includes(term))));
}
