import { BRAND_DEFINITIONS, sortModels, modelFamily, familyIcon } from './catalog-state.mjs?v=HN-GUIDED-PRICES-V3-2026-10-13-R6';

const cache = new WeakMap();
const slug = text => String(text).normalize('NFKD').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
const part = (label, level, key = null, vars = null) => ({ id: slug(label), label, level, key, vars });

function route(model) {
  const n = model.name.replace(/‑/g, '-'), family = modelFamily(model);
  const familyPart = part(family, 'family', family === 'otherModels' ? family : null);
  if (model.brand === 'Apple') {
    if (n.includes(' / ')) return [familyPart, part('multiple', 'generation', 'multipleModels')];
    if (family === 'iPhone') {
      let generation = n.match(/^iPhone (\S+)/)?.[1];
      if (generation === 'SE') {
        const g = n.match(/(\d)(?:st|nd|rd) generation/)?.[1];
        generation = `SE (${g ? ({1:2016,2:2020,3:2022})[g] : n.match(/20\d{2}/)?.[0] || '2016'})`;
      }
      return [familyPart, part(`iPhone ${generation}`, 'generation')];
    }
    if (family === 'iPad') {
      const line = /^iPad Pro/.test(n) ? 'iPad Pro' : /Air/.test(n) ? 'iPad Air' : /mini/.test(n) ? 'iPad mini' : 'iPad';
      const chip = n.match(/\b[MA]\d+/)?.[0];
      const gen = n.match(/\((\d+)(?:st|nd|rd|th) generation\)/)?.[1] || n.match(/^iPad(?: Air| mini)? (\d+)$/)?.[1] || '1';
      const result = [familyPart, part(line, 'subfamily')];
      if (line === 'iPad Pro') result.push(part(`${n.match(/(\d+(?:\.\d+)?)-inch/)?.[1] || '?'}″`, 'size'));
      result.push(chip ? part(chip, 'generation') : part(`generation-${gen}`, 'generation', 'generationNumber', {number:gen}));
      return result;
    }
    if (family === 'Apple Watch') return [familyPart, part(n.match(/Series \d+|SE/)?.[0] || n, 'generation')];
  }
  if (model.brand === 'Samsung') {
    const generation = n.match(/Galaxy\s+((?:Note|[SAMJ])\s*\d+)/)?.[1].replace(/\s+/g, '') || n.replace(/^Samsung /, '');
    return [familyPart, part(generation, 'generation')];
  }
  if (model.brand === 'Google') return [part(`Pixel ${n.match(/Pixel\s+(\d+)/i)?.[1] || ''}`, 'generation')];
  if (model.brand === 'Huawei') return [familyPart, part(n.replace(/^Huawei /, '').match(/^(?:Mate\s*|[PY])\d+/)?.[0] || n, 'generation')];
  return [familyPart];
}

// Generations stay on one level; every leaf retains the original model ID.
function orderBranches(node) {
  if (node.id === 'ipad') node.children.sort((a, b) => ['ipad','ipad-air','ipad-mini','ipad-pro'].indexOf(a.id) - ['ipad','ipad-air','ipad-mini','ipad-pro'].indexOf(b.id));
  if (node.id === 'ipad-pro') node.children.sort((a, b) => parseFloat(a.label) - parseFloat(b.label));
  node.children.sort((a, b) => Number(a.key === 'multipleModels') - Number(b.key === 'multipleModels'));
  node.children.forEach(orderBranches);
}

export function deviceTree(catalog) {
  if (cache.has(catalog)) return cache.get(catalog);
  const root = { id:'root', level:'brand', children:[], ids:catalog.models.map(m => m.id) };
  for (const brand of BRAND_DEFINITIONS) {
    const models = sortModels(catalog.models.filter(m => m.brand === brand.id));
    if (!models.length) continue;
    const branch = { id:brand.id, label:brand.label, icon:brand.logo, level:'brand', children:[], ids:models.map(m => m.id) };
    for (const model of models) {
      let parent = branch;
      for (const segment of models.length <= 8 ? [] : route(model)) {
        let node = parent.children.find(c => c.id === segment.id);
        if (!node) { node = {...segment, icon:segment.level === 'family' ? familyIcon(model) : null, children:[], ids:[]}; parent.children.push(node); }
        node.ids.push(model.id); parent = node;
      }
      parent.children.push({id:model.id, label:model.name, modelId:model.id, level:'model', children:[], ids:[model.id]});
    }
    orderBranches(branch); root.children.push(branch);
  }
  cache.set(catalog, root); return root;
}

export function branchTrail(catalog, brand, path = []) {
  const root = deviceTree(catalog).children.find(c => c.id === brand);
  if (!root) return [];
  const trail = [root];
  for (const id of path) {
    // Retain links issued before the range-selection question was removed.
    const regular = trail.at(-1).children.filter(child => child.key !== 'multipleModels');
    if (regular.length > 9 && regular.some((child, index) => index % 9 === 0 && id === `range-${child.id}-${regular[Math.min(index + 8, regular.length - 1)].id}`)) continue;
    const child = trail.at(-1).children.find(c => c.id === id && !c.modelId);
    if (!child) break;
    trail.push(child);
  }
  return trail;
}

export function generationPreview(catalog, node, baseLabel) {
  if (node.level !== 'generation' || node.key === 'multipleModels' || !node.children.every(child => child.modelId)) return [];
  return [...new Set(node.children.map(child => {
    const model = catalog.models.find(model => model.id === child.modelId);
    const name = model.name.replace(/^Samsung Galaxy\s+/, '').replace(/^Google\s+/, '');
    return name === node.label ? baseLabel : name.startsWith(node.label) ? name.slice(node.label.length).trim() : name;
  }))];
}
export function normalizePath(catalog, brand, path = [], skipSingle = true) {
  const trail = branchTrail(catalog, brand, path);
  if (skipSingle) while (trail.length && trail.at(-1).children.length === 1 && !trail.at(-1).children[0].modelId) trail.push(trail.at(-1).children[0]);
  return trail.slice(1).map(n => n.id);
}
export function modelPath(catalog, modelId) {
  function find(node, path) {
    if (node.modelId === modelId) return path.slice(1, -1);
    for (const child of node.children) { if (!child.ids.includes(modelId)) continue; const result = find(child, [...path,child.id]); if (result) return result; }
    return null;
  }
  return find(deviceTree(catalog), []) || [];
}

export function repairIcon(model, category) {
  const id = category.id;
  if (id === 'backglass') return '/assets/repair-icons/backglass.svg';
  if (model?.brand === 'Apple' && /^iPhone/.test(model.name)) {
    const apple = {display:'display-repair',digitizer:'display-repair',battery:'battery-repair'}[id];
    if (apple) return `/assets/iphone-icons/${apple}.webp`;
  }
  const icon = {display:'display',digitizer:'display',charging:'charging'}[id] || (id.startsWith('camera') ? 'camera' : null);
  if (icon) return `/assets/repair-icons/${icon}.svg`;
  return `/assets/samsung/icons/${id === 'battery' ? 'battery' : 'repair'}.png`;
}
