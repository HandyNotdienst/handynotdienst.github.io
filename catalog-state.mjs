import { visibleOptions } from './catalog-data.mjs?v=HN-GUIDED-PRICES-V1-2026-10-01';

export const PRICING_VERSION = 'HN-PRICING-V1-2026-09-25';
export const UI_VERSION = 'HN-GUIDED-PRICES-V1-2026-10-01';
export const initialState = () => ({ step: 1, model: null, repair: null, option: null, delivery: 'local' });
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
  return { step: Math.min(maxStep, Math.max(1, Number.isInteger(Number(value.step)) ? Number(value.step) : maxStep)),
    model: selected.model?.id || null, repair: selected.repair?.id || null, option: selected.option?.id || null,
    delivery: value.delivery === 'shipping' ? 'shipping' : 'local' };
}
export function stateFromUrl(catalog, input) {
  const q = input instanceof URLSearchParams ? input : new URLSearchParams(input);
  return normalizeState(catalog, { model: q.get('model'), repair: q.get('repair'), option: q.get('option'), delivery: q.get('delivery'), step: q.has('step') ? q.get('step') : undefined });
}
export function stateUrl(state, input) {
  const url = new URL(input);
  for (const key of ['model', 'repair', 'option']) state[key] ? url.searchParams.set(key, state[key]) : url.searchParams.delete(key);
  url.searchParams.set('step', String(state.step));
  url.searchParams.set('delivery', state.delivery);
  return url.pathname + url.search + url.hash;
}
export function transition(catalog, state, action) {
  let next = { ...state };
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
  return catalog.models.filter(m => (!brand || m.brand === brand) && terms.every(term => `${m.brand} ${m.name}`.toLocaleLowerCase().includes(term)))
    .sort((a, b) => a.name.localeCompare(b.name, 'de', { numeric: true, sensitivity: 'base' }));
}
