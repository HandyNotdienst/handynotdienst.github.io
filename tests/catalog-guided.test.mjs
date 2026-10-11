import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { visibleOptions, customerOption, displayPrice, requestText } from '../catalog-data.mjs';
import { BRAND_DEFINITIONS, modelFamily, modelIcon, familyIcon, sortModels, initialState, transition, stateFromUrl, stateUrl, repairCategories, featuredOptions, filterModels, PRICING_VERSION, UI_VERSION } from '../catalog-state.mjs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const raw = read('../catalog.json'), catalog = JSON.parse(raw);
const model = catalog.models.find(m => m.id === 'iphone-16-pro-max');
const repair = model.categories.find(c => c.id === 'display');
const option = repair.options.find(o => o.price === 199);
const link = `?model=${model.id}&repair=${repair.id}&option=${option.id}`;
const allOptions = catalog.models.flatMap(m => m.categories.flatMap(c => c.options));

test('catalog matches the accepted Git baseline independently of checkout line endings', () => {
  assert.equal(createHash('sha256').update(raw.replace(/\r\n/g, '\n')).digest('hex'), '1326acb85c45666b9c44c76ffa3f6c94596ea323af1cae1df25685779feeb21a');
  assert.equal(catalog.pricingVersion, PRICING_VERSION);
  assert.equal(catalog.models.length, 305);
  assert.equal(new Set(catalog.models.map(m => m.brand)).size, 9);
  assert.equal(allOptions.filter(o => o.priceStatus === 'FIXED').length, 1767);
  assert.equal(allOptions.filter(o => o.priceStatus === 'PRICE_ON_REQUEST').length, 769);
});
test('fresh visit is empty, old links open variants, complete links restore requests', () => {
  assert.deepEqual(stateFromUrl(catalog, ''), initialState());
  assert.equal(stateFromUrl(catalog, `?model=${model.id}`).step, 2);
  assert.equal(stateFromUrl(catalog, `?model=${model.id}&repair=display`).step, 3);
  assert.equal(stateFromUrl(catalog, link).step, 4);
  assert.equal(stateFromUrl(catalog, link + '&step=3&delivery=shipping').delivery, 'shipping');
});
test('invalid links return to the nearest available step and discard incompatible answers', () => {
  assert.deepEqual(stateFromUrl(catalog, '?model=invalid&repair=display&step=4'), initialState());
  assert.equal(stateFromUrl(catalog, `?model=${model.id}&repair=invalid&step=4`).step, 2);
  assert.equal(stateFromUrl(catalog, `?model=${model.id}&repair=display&option=invalid&step=4`).step, 3);
  assert.equal(stateFromUrl(catalog, link + '&step=999').step, 4);
  assert.equal(stateFromUrl(catalog, link + '&step=invalid').step, 4);
  assert.equal(stateFromUrl(catalog, '?delivery=invalid').delivery, 'local');
});
test('back/edit keeps answers; only a changed parent clears dependent answers', () => {
  const full = stateFromUrl(catalog, link);
  const back = transition(catalog, full, { type: 'step', step: 1 });
  assert.equal(back.option, option.id);
  assert.equal(transition(catalog, back, { type: 'model', id: model.id }).option, option.id);
  const other = transition(catalog, full, { type: 'model', id: 'iphone-13-pro' });
  assert.equal(other.repair, null); assert.equal(other.option, null); assert.equal(other.step, 2);
  const battery = transition(catalog, full, { type: 'repair', id: 'battery' });
  assert.equal(battery.option, null); assert.equal(battery.step, 3);
  const selected = transition(catalog, stateFromUrl(catalog, `?model=${model.id}&repair=display`), { type: 'option', id: option.id });
  assert.equal(selected.step, 3);
});
test('URL round trips retain language, theme, delivery, custom parameters and anchor', () => {
  const state = stateFromUrl(catalog, link + '&step=3&delivery=shipping');
  const url = new URL(stateUrl(state, 'https://example.test/prices.html?lang=uk&theme=light&ref=shipping#price-configurator'), 'https://example.test');
  assert.deepEqual(stateFromUrl(catalog, url.search), state);
  assert.equal(url.searchParams.get('lang'), 'uk'); assert.equal(url.searchParams.get('theme'), 'light');
  assert.equal(url.searchParams.get('ref'), 'shipping'); assert.equal(url.hash, '#price-configurator');
});
test('search handles brand, words, whitespace, no matches and never mutates selection', () => {
  const snapshot = JSON.stringify(catalog);
  assert.equal(filterModels(catalog, 'Apple', '  16  pro max ').length, 1);
  assert.equal(filterModels(catalog, 'Samsung', 'iPhone').length, 0);
  assert.equal(filterModels(catalog, '', 'nonexistent model 99999').length, 0);
  assert.equal(filterModels(catalog, '', '').length, 305);
  assert.equal(JSON.stringify(catalog), snapshot);
});
test('brand order and families reflect the agreed navigation, with no lost models', () => {
  assert.deepEqual(BRAND_DEFINITIONS.map(b => b.label), ['Apple','Samsung','Google Pixel','Xiaomi','Redmi','Poco','Honor','Huawei','Sony']);
  const ordered = filterModels(catalog, '', '');
  assert.deepEqual([...new Set(ordered.map(m => m.brand))], BRAND_DEFINITIONS.map(b => b.id));
  assert.equal(new Set(ordered.map(m => m.id)).size, 305);
  const families = brand => [...new Set(filterModels(catalog,brand,'').map(modelFamily))];
  assert.deepEqual(families('Apple'), ['iPhone','iPad','Apple Watch']);
  assert.deepEqual(families('Samsung'), ['Galaxy S','Galaxy A','Galaxy Note','Galaxy M','Galaxy J']);
  assert.deepEqual(families('Xiaomi'), ['Mi','Xiaomi']);
  assert.deepEqual(families('Honor'), ['Honor']);
  const samsung = ['J4','M20','Z Fold7','Note10','A16','S25'].map(name => ({brand:'Samsung',name:`Samsung Galaxy ${name}`}));
  assert.deepEqual(sortModels(samsung).map(modelFamily), ['Galaxy S','Galaxy A','Galaxy Note','Galaxy Z','Galaxy M','Galaxy J']);
});
test('Apple chronology handles suffixes, SE releases, tablet sizes/chips and Watch generations', () => {
  const names = filterModels(catalog,'Apple','').map(m => m.name);
  const before = (a,b) => assert(names.indexOf(a) >= 0 && names.indexOf(a) < names.indexOf(b), `${a} before ${b}`);
  for (const [a,b] of [['iPhone 4','iPhone 4s'],['iPhone 5','iPhone 5c'],['iPhone 6 Plus','iPhone 6s'],['iPhone 6s','iPhone SE (1st generation)'],['iPhone SE (1st generation)','iPhone 7'],['iPhone X','iPhone XS'],['iPhone XS','iPhone XR'],['iPhone 11','iPhone SE (2nd generation)'],['iPhone SE (2nd generation)','iPhone 12'],['iPhone 13 Pro Max','iPhone SE (3rd generation)'],['iPhone SE (3rd generation)','iPhone 14'],['iPhone 16','iPhone 16e'],['iPhone Air','iPhone 17e'],['iPad 2','iPad (3rd generation)'],['iPad Pro (12.9-inch)','iPad Pro (9.7-inch)'],['iPad Air 2','iPad Air (3rd generation)'],['iPad Pro 12.9-inch (6th generation)','iPad Pro 11-inch (M4)'],['iPad mini (A17 Pro)','iPad (A16)'],['iPad Air 11-inch (M3)','iPad Air 11‑inch (M4)'],['Apple Watch Series 5 44 mm','Apple Watch SE 40 mm'],['Apple Watch SE 44 mm','Apple Watch Series 7 41 mm']]) before(a,b);
  assert.deepEqual(names.filter(n => /^iPhone 16(?: |$)/.test(n)), ['iPhone 16','iPhone 16 Plus','iPhone 16 Pro','iPhone 16 Pro Max']);
});
test('Samsung chronology separates yearly A/M cohorts from tiers and keeps same-generation variants stable', () => {
  const names = filterModels(catalog,'Samsung','').map(m => m.name);
  const before = (a,b) => assert(names.indexOf(`Samsung Galaxy ${a}`) < names.indexOf(`Samsung Galaxy ${b}`), `${a} before ${b}`);
  for (const [a,b] of [['S9','S10'],['S10','S20'],['S20','S21'],['S25','S26'],['S24','S24+'],['S24+','S24 Ultra'],['A6','A10'],['A70','A01'],['A51','A02'],['A52','A13'],['A53','A14'],['A54','A15'],['A15','A16'],['Note10','Note20'],['M51','M52 5G'],['M52 5G','M23']]) before(a,b);
  const rows = [{id:'first',brand:'Samsung',name:'Samsung Galaxy S24'}, {id:'second',brand:'Samsung',name:'Samsung Galaxy S24'}];
  assert.deepEqual(sortModels(rows).map(m => m.id), ['first','second']);
});
test('brand URLs restore filters, reject invalid values, and defer to a selected model', () => {
  const filtered = stateFromUrl(catalog,'?brand=Samsung&step=4&lang=uk&theme=dark');
  assert.deepEqual(filtered, {...initialState(),brand:'Samsung'});
  assert.equal(stateFromUrl(catalog,'?brand=invalid').brand,null);
  assert.equal(stateFromUrl(catalog,`?brand=Samsung&model=${model.id}`).brand,'Apple');
  const url = new URL(stateUrl(filtered,'https://example.test/prices.html?lang=uk&theme=dark#price-configurator'),'https://example.test');
  assert.equal(url.searchParams.get('brand'),'Samsung');
  assert.deepEqual(stateFromUrl(catalog,url.search),filtered);
  const chosen = transition(catalog,filtered,{type:'model',id:model.id});
  assert.equal(chosen.brand,'Apple'); assert.equal(chosen.step,2);
  assert(!stateUrl(chosen,url.href).includes('brand='));
  const full = stateFromUrl(catalog,link);
  assert.equal(transition(catalog,full,{type:'brand',brand:'Apple'}).option,option.id);
  assert.deepEqual(transition(catalog,full,{type:'brand',brand:'Samsung'}),{...initialState(),brand:'Samsung'});
  assert.deepEqual(transition(catalog,full,{type:'brand',brand:null}),initialState());
});
test('icons use exact photos, family assets or manufacturer logos; every chosen asset exists', () => {
  assert.equal(modelIcon({brand:'Apple',name:'iPhone 4'}),'/assets/iphone-icons/iphone-device.svg');
  assert.equal(modelIcon({brand:'Apple',name:'Apple Watch SE 40 mm'}),'/assets/iphone-icons/apple-watch.svg');
  assert.equal(modelIcon({brand:'Apple',name:'iPad 2'}),'/assets/logos/manufacturers/apple.png');
  assert.equal(modelIcon({brand:'Samsung',name:'Samsung Galaxy S24',image:'assets/samsung/models/galaxy-s24.jpeg'}),'/assets/samsung/models/galaxy-s24.jpeg');
  assert.equal(modelIcon({brand:'Samsung',name:'Samsung Galaxy S23+'}),'/assets/samsung/models/galaxy-s23-family.jpeg');
  assert.equal(modelIcon({brand:'Samsung',name:'Samsung Galaxy J4'}),'/assets/logos/manufacturers/samsung.png');
  assert.equal(modelIcon({brand:'Google',name:'Google Pixel 3'}),'/assets/logos/manufacturers/google-pixel.png');
  for (const m of catalog.models) for (const path of [modelIcon(m),familyIcon(m)]) assert(path && existsSync(new URL(`..${path}`,import.meta.url)), `${m.name}: ${path}`);
  for (const b of BRAND_DEFINITIONS) assert(existsSync(new URL(`..${b.logo}`,import.meta.url)));
});
test('every model, repair and visible option can be restored without omissions', () => {
  let visited = 0;
  for (const m of catalog.models) {
    const categories = repairCategories(m);
    assert.equal(categories.length, m.categories.filter(c => visibleOptions(c).length).length);
    const priorities = categories.filter(c => ['display', 'battery', 'charging'].includes(c.id));
    assert.deepEqual(categories.slice(0, priorities.length), priorities);
    for (const c of categories) {
      const options = visibleOptions(c), first = featuredOptions(options);
      assert.equal(first.length, Math.min(3, options.length));
      assert.equal(new Set(first.map(o => o.id)).size, first.length);
      assert(first.every(o => options.includes(o)));
      for (const o of options) {
        const s = stateFromUrl(catalog, `?model=${m.id}&repair=${c.id}&option=${o.id}&step=4`);
        assert.equal(s.option, o.id); assert.equal(s.step, 4); visited++;
      }
    }
  }
  assert.equal(visited, allOptions.length);
});
test('featured options represent actual groups, availability, known price and stable ties', () => {
  assert.deepEqual(featuredOptions(repair.options).map(o => o.price), [139,199,419]);
  const rows = [
    {id:'cheap-unavailable', tier:'STANDARD', price:1, availabilityStatus:'CURRENTLY_UNAVAILABLE'},
    {id:'unknown', tier:'STANDARD', price:null}, {id:'available',tier:'STANDARD',price:20},
    {id:'premium-a',tier:'PREMIUM',price:30}, {id:'premium-b',tier:'REFURBISHED',price:30},
    {id:'original',tier:'ORIGINAL',price:null}
  ];
  assert.deepEqual(featuredOptions(rows).map(o => o.id), ['available','premium-a','original']);
  assert.deepEqual(featuredOptions(rows.slice(0,1)), rows.slice(0,1));
  assert.deepEqual(featuredOptions(rows.filter(o => o.tier === 'STANDARD')).map(o => o.id), ['cheap-unavailable','unknown','available']);
});

const staticNode = {dataset:{i18n:'nextRequest'},textContent:''};
const document = { readyState:'loading', documentElement:{}, addEventListener(){}, querySelector:()=>null,
  querySelectorAll: selector => selector === '[data-i18n]' ? [staticNode] : [] };
const sandbox = {window:{dispatchEvent(){}},document,localStorage:{getItem:()=>null,setItem(){}},navigator:{languages:['de']},location:{search:''},URLSearchParams,Intl,CustomEvent:class{}};
vm.createContext(sandbox);
vm.runInContext(read('../assets/i18n/catalog.js'),sandbox);
vm.runInContext(read('../assets/i18n/guided.js'),sandbox);
const i18n = sandbox.window.HN_CATALOG_I18N;
globalThis.HN_CATALOG_I18N = i18n;
test('all ten languages translate static/dynamic controls without raw keys', () => {
  for (const {code} of i18n.languages) {
    i18n.setLanguage(code);
    for (const key of i18n.guidedKeys) assert.notEqual(i18n.t(key),key,`${code}:${key}`);
    assert.equal(staticNode.textContent, i18n.t('nextRequest'));
    assert.equal(document.documentElement.lang,code);
  }
  i18n.setLanguage('ar'); assert.equal(document.documentElement.dir,'rtl');
  i18n.setLanguage('ua'); assert.equal(i18n.getLang(),'uk');
});
test('unknown price is never zero; status and selected part survive WhatsApp serialization', () => {
  i18n.setLanguage('de');
  for (const o of allOptions.filter(o => o.priceStatus === 'PRICE_ON_REQUEST')) {
    assert.equal(displayPrice(o),'Preis anfragen'); assert(!displayPrice(o).includes('0'));
  }
  const local = requestText(model,repair,option,'local'), shipping = requestText(model,repair,option,'shipping');
  assert(local.includes('iPhone 16 Pro Max')); assert(local.includes(customerOption(option).label));
  assert(local.includes('199')); assert(local.includes('Preis inkl. Einbau')); assert(local.includes('In Singen nach Vereinbarung'));
  assert(shipping.includes('Per Versand')); assert(shipping.includes('vor Auftrag bestätigen'));
  for (const status of ['PREORDER','CURRENTLY_UNAVAILABLE']) {
    const o = allOptions.find(o => o.availabilityStatus === status);
    assert(o, status); assert(requestText(model,repair,o,'shipping').includes(i18n.localizeOption(o).availability));
  }
});
test('UI version and new modules are included in service worker; pricing version unchanged', () => {
  const html = read('../prices.html'), sw = read('../sw.js');
  assert(html.includes(UI_VERSION)); assert(sw.includes(UI_VERSION));
  for (const file of ['catalog-data.mjs','catalog-state.mjs','catalog-guided.mjs','assets/i18n/guided.js']) assert(sw.includes(file));
  assert(html.includes(PRICING_VERSION)); assert(sw.includes(PRICING_VERSION));
  for (const b of BRAND_DEFINITIONS) assert(sw.includes(`.${b.logo}`));
  for (const m of catalog.models) for (const path of [modelIcon(m),familyIcon(m)]) assert(sw.includes(`.${path}`), `uncached picker asset: ${path}`);
});
