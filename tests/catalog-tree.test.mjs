import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { deviceTree, branchTrail, normalizePath, modelPath, repairIcon, generationPreview } from '../catalog-tree.mjs';
import { stateFromUrl, stateUrl, transition } from '../catalog-state.mjs';
import { visibleOptions } from '../catalog-data.mjs';
const catalog = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url)));
const tree = deviceTree(catalog);
const walk = node => [node, ...node.children.flatMap(walk)];

test('all 305 models occur once, generations need no range question, and 2536 options remain reachable', () => {
  const nodes = walk(tree), leaves = nodes.filter(node => node.modelId);
  assert.equal(leaves.length, 305);
  assert.equal(new Set(leaves.map(node => node.modelId)).size, 305);
  assert.ok(nodes.every(node => node.level !== 'range'));
  assert.ok(nodes.filter(node => !node.children.every(child => child.level === 'generation')).every(node => node.children.length <= 9));
  let options = 0, currentOptions = 0;
  for (const model of catalog.models) {
    const path = modelPath(catalog, model.id);
    const branch = branchTrail(catalog, model.brand, path).at(-1);
    assert.ok(branch.children.some(node => node.modelId === model.id), model.id);
    options += model.categories.reduce((sum, c) => sum + visibleOptions(c).length, 0);
    currentOptions += model.categories.reduce((sum, c) => sum + c.options.filter(o => ['FIXED','PRICE_ON_REQUEST'].includes(o.priceStatus)).length, 0);
  }
  assert.equal(currentOptions, 2536);
  assert.equal(options, 2649); // Also preserve all 113 LEGACY_UNMIGRATED entries.
});
test('families and generations keep the agreed order and small brands have no intermediate questions', () => {
  const apple = tree.children.find(node => node.id === 'Apple');
  assert.deepEqual(apple.children.map(node => node.label), ['iPhone','iPad','Apple Watch']);
  assert.deepEqual(apple.children[1].children.map(node => node.label), ['iPad','iPad Air','iPad mini','iPad Pro']);
  const samsung = tree.children.find(node => node.id === 'Samsung');
  assert.deepEqual(samsung.children.map(node => node.label), ['Galaxy S','Galaxy A','Galaxy Note','Galaxy M','Galaxy J']);
  assert.deepEqual(samsung.children[0].children.map(node => node.label), ['S9','S10','S20','S21','S22','S23','S24','S25','S26']);
  assert.equal(apple.children[0].children.at(-1).key, 'multipleModels');
  assert.ok(apple.children[0].children.length > 9);
  assert.equal(apple.children[0].children[0].label, 'iPhone 4');
  assert.equal(apple.children[0].children.at(-2).label, 'iPhone 17e');
  for (const brand of tree.children.filter(node => node.ids.length <= 8)) assert.ok(brand.children.every(node => node.modelId));
});

test('previous range links normalize to the direct generation path', () => {
  const old = '?brand=Apple&path=iphone/range-iphone-14-iphone-17e/iphone-14';
  assert.deepEqual(stateFromUrl(catalog, old).path, ['iphone','iphone-14']);
  assert.deepEqual(stateFromUrl(catalog, old + '&model=iphone-14&repair=battery&step=1').path, ['iphone','iphone-14']);
  assert.deepEqual(stateFromUrl(catalog, '?brand=Apple&path=iphone/range-iphone-14-iphone-17e').path, ['iphone']);
  assert.deepEqual(stateFromUrl(catalog, '?brand=Apple&path=iphone/range-invalid/iphone-14').path, ['iphone']);
});

test('generation previews describe real variants, including base, Plus, Pro and Pro Max', () => {
  const generation = branchTrail(catalog, 'Apple', ['iphone','iphone-14']).at(-1);
  assert.deepEqual(generationPreview(catalog, generation, 'Basismodell'), ['Basismodell','Plus','Pro','Pro Max']);
  const s23 = branchTrail(catalog, 'Samsung', ['galaxy-s','s23']).at(-1);
  assert.deepEqual(generationPreview(catalog, s23, 'Basismodell'), ['Basismodell','5G','+','Ultra','Ultra 5G']);
  assert.deepEqual(generationPreview(catalog, tree.children[0], 'Basismodell'), []);
});
test('combined models and aliases are distinct; iPad Pro sizes and Watch sizes are reachable', () => {
  for (const model of catalog.models.filter(m => m.name.includes(' / '))) assert.ok(modelPath(catalog, model.id).includes('multiple'), model.name);
  const s23 = branchTrail(catalog, 'Samsung', ['galaxy-s','s23']).at(-1);
  assert.equal(s23.children.length, 5);
  assert.equal(new Set(s23.children.map(n => n.modelId)).size, 5);
  for (const model of catalog.models.filter(m => /^iPad Pro/.test(m.name))) assert.equal(modelPath(catalog, model.id)[1], 'ipad-pro');
  for (const model of catalog.models.filter(m => /^Apple Watch/.test(m.name))) assert.equal(modelPath(catalog, model.id)[0], 'apple-watch');
});
test('paths and direct search round trip, invalid suffixes shorten, model deep links derive the branch', () => {
  const state = stateFromUrl(catalog, '?brand=Samsung&path=galaxy-s/s23/nope&q=S23&lang=de&theme=dark');
  assert.deepEqual(state.path, ['galaxy-s','s23']);
  assert.equal(state.q, 'S23');
  assert.deepEqual(stateFromUrl(catalog, new URL(stateUrl(state,'https://example.test/prices.html#price-configurator'),'https://example.test').search), state);
  assert.deepEqual(stateFromUrl(catalog, '?brand=wrong&path=galaxy-s').path, []);
  assert.equal(stateFromUrl(catalog, '?q=').q, '');
  assert.equal(stateFromUrl(catalog, '').q, null);
  const model = catalog.models.find(m => m.name === 'Samsung Galaxy S23');
  assert.deepEqual(stateFromUrl(catalog, `?model=${model.id}&path=bad`).path, ['galaxy-s','s23']);
  assert.deepEqual(normalizePath(catalog, 'Sony', []), []);
});
test('browsing to an ancestor preserves answers; an incompatible branch clears dependent answers', () => {
  const model = catalog.models.find(m => m.name === 'Samsung Galaxy S23');
  const repair = model.categories[0], option = repair.options[0];
  const state = stateFromUrl(catalog, `?model=${model.id}&repair=${repair.id}&option=${option.id}`);
  const back = transition(catalog, state, { type:'browse', path:['galaxy-s'] });
  assert.equal(back.option, option.id);
  assert.deepEqual(back.path, ['galaxy-s']);
  assert.deepEqual(stateFromUrl(catalog, new URL(stateUrl(back,'https://example.test/prices.html'),'https://example.test').search), back);
  const changed = transition(catalog, back, { type:'browse', path:['galaxy-a'] });
  assert.equal(changed.model, null); assert.equal(changed.repair, null); assert.equal(changed.option, null);
});
test('every repair has a cached pictogram, with the original iPhone asset and supplied repair SVGs', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  for (const model of catalog.models) for (const category of model.categories) {
    const path = repairIcon(model, category);
    assert.ok(existsSync(new URL('..' + path, import.meta.url)));
    assert.ok(sw.includes('.' + path), path);
  }
  assert.equal(repairIcon({brand:'Apple',name:'iPhone 16'}, {id:'display'}), '/assets/iphone-icons/display-repair.webp');
  assert.equal(repairIcon({brand:'Samsung'}, {id:'display'}), '/assets/repair-icons/display.svg');
  assert.equal(repairIcon({brand:'Apple'}, {id:'charging'}), '/assets/repair-icons/charging.svg');
  assert.equal(repairIcon({brand:'Samsung'}, {id:'camera_main'}), '/assets/repair-icons/camera.svg');
  assert.equal(repairIcon({brand:'Apple'}, {id:'backglass'}), '/assets/repair-icons/backglass.svg');
});

test('single intermediate choices are skipped but no exact model is selected automatically', () => {
  const state = stateFromUrl(catalog, '?brand=Apple&path=ipad/ipad-pro/9-7');
  assert.equal(state.model, null); assert.equal(state.step, 1);
  const leaf = branchTrail(catalog, state.brand, state.path).at(-1);
  assert.equal(leaf.children.length, 1);
  assert.ok(leaf.children[0].modelId);
  const chosen = transition(catalog, state, {type:'model',id:leaf.children[0].modelId});
  assert.equal(chosen.step, 2);
});

test('search mode retains its text across brand changes and never selects a model', () => {
  const state = stateFromUrl(catalog, '?brand=Apple&q=Pro');
  const changed = transition(catalog, state, {type:'brand',brand:'Samsung'});
  assert.equal(changed.q, 'Pro'); assert.equal(changed.model, null);
  const empty = transition(catalog, changed, {type:'search',query:''});
  assert.equal(empty.q, ''); assert.equal(empty.model, null);
});
