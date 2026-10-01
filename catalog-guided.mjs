import { visibleOptions, customerOption, displayPrice, requestText } from './catalog-data.mjs?v=HN-GUIDED-PRICES-V1-2026-10-01';
import { PRICING_VERSION, filterModels, repairCategories, resolveSelection, stateFromUrl, stateUrl, transition, featuredOptions } from './catalog-state.mjs?v=HN-GUIDED-PRICES-V1-2026-10-01';

export function startCatalog() {
  const $ = selector => document.querySelector(selector);
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const i18n = window.HN_CATALOG_I18N;
  i18n.init();
  const t = (key, vars) => i18n.t(key, vars);
  const announce = message => { $('#status').textContent = message; };
  let catalog, state, expanded = false, loading = false;
  const steps = ['stepDevice', 'stepRepair', 'stepVariant', 'stepRequest'];
  const search = $('#model-search'), brand = $('#brand');
  const button = (text, action, value, className = 'text-button') => {
    const node = make('button', className, text);
    node.type = 'button'; node.dataset.action = action;
    if (value !== undefined) node.dataset.value = String(value);
    return node;
  };
  const link = (text, href, className = 'text-link') => { const node = make('a', className, text); node.href = href; return node; };
  function writeHistory(mode = 'push') {
    const next = stateUrl(state, location.href);
    if (next !== location.pathname + location.search + location.hash) history[mode === 'replace' ? 'replaceState' : 'pushState'](null, '', next);
  }
  function commit(action, { focus = false, full = true } = {}) {
    state = transition(catalog, state, action); writeHistory();
    if (full) render(focus); else { updateSelection(); renderProgress(); }
  }
  function renderProgress() {
    const max = state.option ? 4 : state.repair ? 3 : state.model ? 2 : 1;
    document.querySelectorAll('[data-step]').forEach(node => {
      const number = Number(node.dataset.step); node.disabled = number > max;
      node.setAttribute('aria-label', t('stepStatus', { step: number, name: t(steps[number - 1]) }));
      node.classList.toggle('is-complete', number < max);
      if (number === state.step) node.setAttribute('aria-current', 'step'); else node.removeAttribute('aria-current');
      node.querySelector('.step-name').textContent = t(steps[number - 1]);
    });
    $('#step-caption').textContent = t('stepStatus', { step: state.step, name: t(steps[state.step - 1]) });
  }
  function renderContext({ model, repair }) {
    const context = $('#device-context'); context.replaceChildren(); context.hidden = !model;
    $('.wizard-grid').classList.toggle('without-device', !model);
    if (!model) return;
    const top = make('div', 'context-device');
    if (model.image) {
      const img = make('img', 'device-photo'); img.src = '/' + model.image; img.alt = model.name; img.width = 210; img.height = 230;
      img.addEventListener('error', () => { img.hidden = true; }, { once: true }); top.append(img);
    }
    const info = make('div', 'context-info');
    const edit = button('', 'step', 1, 'text-button context-edit');
    const editIcon = make('img', 'edit-icon'); editIcon.src = '/assets/catalog-icons/pencil.svg'; editIcon.alt = ''; editIcon.width = 18; editIcon.height = 18;
    edit.append(editIcon, make('span', '', t('changeModel')));
    info.append(make('p', 'muted context-label', t('yourDevice')), make('h2', '', model.name), make('p', 'muted context-brand', model.brand), make('p', 'muted context-mobile-repair', repair ? i18n.translateCategory(repair) : model.brand), edit);
    top.append(info); context.append(top);
    if (repair) {
      const section = make('div', 'context-repair');
      section.append(make('p', 'muted', t('yourRepair')), make('strong', '', i18n.translateCategory(repair)), button(t('changeRepair'), 'step', 2)); context.append(section);
    }
    const help = make('div', 'context-help');
    help.append(make('h3', '', t('needHelp')), make('p', 'muted', t('helpText')), link(t('helpAction'), '/index.html#contact')); context.append(help);
  }
  function renderModels() {
    if (!catalog) return;
    const matches = filterModels(catalog, brand.value, search.value), results = $('#model-results'); results.replaceChildren();
    for (const model of matches) {
      const item = make('li'), choose = button('', 'model', model.id, 'model-result');
      choose.append(make('span', '', model.name), make('span', 'muted model-brand', model.brand));
      if (model.id === state.model) { choose.classList.add('is-selected'); choose.append(make('span', 'selected-label', t('selected'))); }
      item.append(choose); results.append(item);
    }
    $('#no-model').hidden = Boolean(matches.length); $('#model-count').textContent = t('results', { count: matches.length });
  }
  function renderRepairs(model) {
    const list = $('#repair-options'); list.replaceChildren();
    const categories = repairCategories(model); $('#no-repairs').hidden = Boolean(categories.length);
    for (const category of categories) {
      const choice = button('', 'repair', category.id, 'repair-choice');
      const count = visibleOptions(category).length;
      choice.append(make('span', '', i18n.translateCategory(category)), make('span', 'muted', `${count} ${t(count === 1 ? 'option' : 'options')}`));
      if (category.id === state.repair) choice.classList.add('is-selected'); list.append(choice);
    }
  }
  function optionRow(original) {
    const option = i18n.localizeOption(customerOption(original));
    const article = make('article', 'variant'); article.dataset.optionId = option.id; article.dataset.availability = option.availabilityStatus || 'UNKNOWN';
    const label = make('label', 'variant-choice'), input = make('input'); input.type = 'radio'; input.name = 'part-option'; input.value = option.id; input.checked = option.id === state.option;
    input.setAttribute('aria-labelledby', `tier-${option.id} title-${option.id}`); input.setAttribute('aria-describedby', `price-${option.id} availability-${option.id}`);
    const compactLabel = option.label.replace(/^(Standard|Premium|Originalteil|Original)\s*[–-]\s*/i, '');
    const content = make('span', 'variant-copy'), title = make('strong', 'variant-title', compactLabel); title.id = `title-${option.id}`;
    const tier = make('span', 'tier', option.tier); tier.id = `tier-${option.id}`;
    content.append(tier, title, make('span', 'variant-description', option.description));
    const amount = make('span', 'variant-amount'), price = make('strong', Number.isFinite(option.price) ? 'amount' : 'amount inquiry', displayPrice(option)); price.id = `price-${option.id}`; amount.append(price);
    if (Number.isFinite(option.price)) amount.append(make('span', 'included', t('included')));
    const chosen = make('span', 'selected-label', t('selected')); chosen.hidden = !input.checked; amount.append(chosen);
    const availability = make('span', 'part-availability', option.availability || t('unavailable')); availability.id = `availability-${option.id}`;
    label.append(input, content, amount); article.append(label);
    if (option.advantages.length || option.limitations.length) {
      const details = make('details', 'variant-details'), summary = make('summary');
      summary.append(availability, make('span', 'details-label', t('details'))); details.append(summary); const body = make('div', 'detail-body');
      for (const [heading, values] of [[t('benefits'), option.advantages], [t('limitations'), option.limitations]]) {
        if (!values.length) continue;
        body.append(make('strong', '', heading)); const ul = make('ul'); values.forEach(value => ul.append(make('li', '', value))); body.append(ul);
      }
      details.append(body); article.append(details);
    } else { const footer = make('p', 'variant-details availability-only'); footer.append(availability); article.append(footer); }
    article.classList.toggle('is-selected', input.checked); return article;
  }
  function renderVariants(repair) {
    const container = $('#variant-options'); container.replaceChildren(); if (!repair) return;
    const options = visibleOptions(repair), first = featuredOptions(options);
    if (state.option && !first.some(o => o.id === state.option)) expanded = true;
    const ids = new Set(first.map(o => o.id)), ordered = [...first, ...options.filter(o => !ids.has(o.id))];
    ordered.forEach((option, index) => { const row = optionRow(option); row.hidden = index >= 3 && !expanded; container.append(row); });
    const more = $('#show-variants'); more.hidden = options.length <= 3; more.setAttribute('aria-expanded', String(expanded));
    more.textContent = expanded ? t('showLess') : t('showAll', { count: options.length });
    $('#shared-note').textContent = i18n.translateText(repair.sharedNote || ''); $('#shared-note').hidden = !repair.sharedNote;
    updateSelection();
  }
  function updateSelection() {
    const { option } = resolveSelection(catalog, state);
    document.querySelectorAll('.variant').forEach(row => {
      const chosen = row.dataset.optionId === state.option; row.classList.toggle('is-selected', chosen); row.querySelector('input').checked = chosen; row.querySelector('.selected-label').hidden = !chosen;
    });
    $('#variant-next').disabled = !option;
    $('.selection-bar').hidden = !option;
    $('#variant-prompt').hidden = Boolean(option);
    $('#selection-name').textContent = option ? i18n.localizeOption(customerOption(option)).label : t('chooseFirst');
    $('#selection-price').textContent = option ? displayPrice(option) : ''; $('#selection-included').hidden = !option || !Number.isFinite(option.price);
    if (option) announce(`${t('selected')}: ${i18n.localizeOption(customerOption(option)).label}, ${displayPrice(option)}`);
  }
  function renderRequest({ model, repair, option }) {
    const summary = $('#request-summary'); summary.replaceChildren(); if (!option) return;
    const localized = i18n.localizeOption(customerOption(option));
    for (const [key, value, step] of [['yourDevice', model.name, 1], ['yourRepair', i18n.translateCategory(repair), 2], ['yourSelection', localized.label, 3]]) {
      const item = make('div', 'request-row'), content = make('div'); content.append(make('dt', 'muted', t(key)), make('dd', '', value));
      item.append(content, button(t(['changeModel','changeRepair','changeVariant'][step - 1]), 'step', step)); summary.append(item);
    }
    $('#request-price').textContent = displayPrice(option); $('#request-included').hidden = !Number.isFinite(option.price);
    $('#request-availability').textContent = localized.availability || t('unavailable'); $('#request-availability').dataset.availability = option.availabilityStatus;
    document.querySelectorAll('[name=delivery]').forEach(input => { input.checked = input.value === state.delivery; }); updateRequestLink();
  }
  function updateRequestLink() {
    const { model, repair, option } = resolveSelection(catalog, state); if (!option) return;
    $('#delivery-note').textContent = t(state.delivery === 'shipping' ? 'shippingNote' : 'localNote');
    $('#request-link').href = `https://wa.me/4915222416438?text=${encodeURIComponent(requestText(model, repair, option, state.delivery))}`;
  }
  function render(focus = false) {
    const selection = resolveSelection(catalog, state); renderProgress(); renderContext(selection);
    document.querySelectorAll('[data-panel]').forEach(panel => { panel.hidden = Number(panel.dataset.panel) !== state.step; });
    const titleKey = state.step === 3 && selection.repair?.id === 'display' ? 'chooseDisplay' : ['chooseDevice','chooseRepair','chooseVariant','checkRequest'][state.step - 1];
    $('#page-title').textContent = t(titleKey);
    $('#page-subtitle').textContent = state.step === 1 ? t('guideIntro') : [selection.model?.name, state.step > 2 ? i18n.translateCategory(selection.repair) : ''].filter(Boolean).join(' · ');
    renderModels(); renderRepairs(selection.model); renderVariants(selection.repair); renderRequest(selection); $('#wizard').hidden = false;
    announce(t('stepStatus', { step: state.step, name: t(steps[state.step - 1]) }));
    if (focus) { $('#page-title').focus({ preventScroll: true }); $('#price-configurator').scrollIntoView({ block: 'start' }); }
  }
  $('#wizard').addEventListener('click', event => {
    const target = event.target.closest('button[data-action],button[data-step]'); if (!target || target.disabled || !catalog) return;
    const action = target.dataset.action || 'step', value = target.dataset.value || target.dataset.step;
    if (action === 'expand') {
      expanded = !expanded; const options = visibleOptions(resolveSelection(catalog, state).repair), firstIds = new Set(featuredOptions(options).map(o => o.id));
      document.querySelectorAll('.variant').forEach(row => { row.hidden = !expanded && !firstIds.has(row.dataset.optionId) && row.dataset.optionId !== state.option; });
      target.textContent = expanded ? t('showLess') : t('showAll', { count: options.length }); target.setAttribute('aria-expanded', String(expanded)); return;
    }
    if (action === 'model' || action === 'repair') { expanded = false; commit({ type: action, id: value }, { focus: true }); }
    if (action === 'step') commit({ type: 'step', step: Number(value) }, { focus: true });
  });
  $('#wizard').addEventListener('change', event => {
    if (event.target.name === 'part-option') commit({ type: 'option', id: event.target.value }, { full: false });
    if (event.target.name === 'delivery') { state = transition(catalog, state, { type: 'delivery', delivery: event.target.value }); writeHistory(); updateRequestLink(); }
  });
  search.addEventListener('input', () => { renderModels(); announce($('#model-count').textContent); });
  brand.addEventListener('change', () => { renderModels(); announce($('#model-count').textContent); });
  window.addEventListener('popstate', () => {
    if (!catalog) return;
    state = stateFromUrl(catalog, location.search); expanded = false;
    const lang = new URLSearchParams(location.search).get('lang');
    if (lang && lang !== i18n.getLang()) i18n.setLanguage(lang, 'history');
    render(true); syncTheme();
  });
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  function syncTheme() {
    let saved; try { saved = localStorage.getItem('hn_theme'); } catch {}
    const requested = new URLSearchParams(location.search).get('theme');
    const theme = ['dark','light'].includes(requested) ? requested : ['dark','light'].includes(saved) ? saved : systemTheme.matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme;
    const label = t(theme === 'dark' ? 'themeLight' : 'themeDark'); $('#theme-toggle').setAttribute('aria-label', label); $('#theme-toggle').title = label;
  }
  $('#theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('hn_theme', theme); } catch {}
    const url = new URL(location.href); url.searchParams.set('theme', theme); history.replaceState(null, '', url.pathname + url.search + url.hash); syncTheme();
  });
  systemTheme.addEventListener('change', syncTheme); window.addEventListener('storage', event => { if (event.key === 'hn_theme') syncTheme(); });
  const menu = $('#menu-toggle'), nav = $('#site-nav');
  function setMenu(open, restore = false) {
    nav.classList.toggle('is-open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', t(open ? 'menuClose' : 'menuOpen')); menu.title = t(open ? 'menuClose' : 'menuOpen'); if (restore) menu.focus();
  }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; setMenu(open); if (open) nav.querySelector('a').focus(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setMenu(false, true); });
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) setMenu(false); });
  matchMedia('(max-width: 900px)').addEventListener('change', () => setMenu(false, nav.contains(document.activeElement)));
  i18n.onChange(() => {
    syncTheme(); setMenu(menu.getAttribute('aria-expanded') === 'true');
    const url = new URL(location.href); url.searchParams.set('lang', i18n.getLang()); history.replaceState(null, '', url.pathname + url.search + url.hash);
    if (brand.options.length) brand.options[0].textContent = t('allBrands'); if (catalog) render();
  });
  async function load() {
    if (loading) return; loading = true; $('#load-state').hidden = false; $('#load-error').hidden = true; $('#retry').disabled = true; announce(t('loading'));
    try {
      const response = await fetch(`/catalog.json?v=${PRICING_VERSION}`, { cache: 'no-store' }); if (!response.ok) throw new Error('Catalog unavailable');
      const data = await response.json(); if (data.pricingVersion !== PRICING_VERSION || !Array.isArray(data.models) || !data.models.length) throw new Error('Invalid catalog');
      catalog = data; document.documentElement.dataset.pricingVersion = PRICING_VERSION;
      brand.replaceChildren(); const all = make('option', '', t('allBrands')); all.value = ''; brand.append(all);
      for (const name of [...new Set(catalog.models.map(m => m.brand))].sort()) { const option = make('option', '', name); option.value = name; brand.append(option); }
      brand.disabled = false; search.disabled = false; state = stateFromUrl(catalog, location.search); writeHistory('replace'); render(); $('#load-state').hidden = true;
    } catch (error) {
      $('#load-state').hidden = true; $('#load-error').hidden = false; $('#wizard').hidden = true; announce(t('catalogError')); console.warn('Catalog could not load', error.message);
    } finally { loading = false; $('#retry').disabled = false; }
  }
  $('#retry').addEventListener('click', load); syncTheme(); load();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then(registration => registration.update()).catch(() => {});
}
