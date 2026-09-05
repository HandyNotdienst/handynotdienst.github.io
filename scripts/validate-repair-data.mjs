import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const catalogPath = path.join(root, "assets", "data", "repair-catalog.json");
const referencesPath = path.join(root, "assets", "data", "manufacturer-reference-prices.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const manufacturerReferences = JSON.parse(fs.readFileSync(referencesPath, "utf8"));
const translationSources = [
  fs.readFileSync(path.join(root, "app.js"), "utf8"),
  ...fs.readdirSync(path.join(root, "assets", "i18n"))
    .filter((file) => file.endsWith(".js"))
    .map((file) => fs.readFileSync(path.join(root, "assets", "i18n", file), "utf8")),
].join("\n");

const errors = [];
const qualityValues = new Set(["standard", "oem_pull", "premium_aftermarket", "budget_aftermarket"]);
const technologyValues = new Set(["unspecified", "soft_oled", "hard_oled", "lcd", "original"]);
const stockValues = new Set(["available", "on_request", "leadtime", "unavailable"]);
const recommendationValues = new Set(["quality", "value", "budget"]);
const servicePricingValues = new Set(["fixed", "distance", "external"]);

function fail(location, message) {
  errors.push(`${location}: ${message}`);
}

function requireText(value, location) {
  if (typeof value !== "string" || !value.trim()) fail(location, "must be a non-empty string");
}

function requireUnique(values, location) {
  const seen = new Set();
  values.forEach((value) => {
    if (seen.has(value)) fail(location, `duplicate id '${value}'`);
    seen.add(value);
  });
}

function requireTranslationKey(key, location) {
  requireText(key, location);
  if (typeof key === "string" && !translationSources.includes(`${key}:`)) {
    fail(location, `translation key '${key}' is not present in app/i18n sources`);
  }
}

if (catalog.schemaVersion !== 1) fail("repair-catalog.schemaVersion", "must equal 1");
if (catalog.currency !== "EUR") fail("repair-catalog.currency", "must equal EUR");
if (!Array.isArray(catalog.manufacturers) || !catalog.manufacturers.length) {
  fail("repair-catalog.manufacturers", "must contain at least one manufacturer");
}

const manufacturerMap = new Map();
for (const manufacturer of catalog.manufacturers || []) {
  const manufacturerLocation = `manufacturer.${manufacturer.id || "unknown"}`;
  requireText(manufacturer.id, `${manufacturerLocation}.id`);
  requireText(manufacturer.label, `${manufacturerLocation}.label`);
  if (manufacturerMap.has(manufacturer.id)) fail(manufacturerLocation, "duplicate manufacturer id");
  manufacturerMap.set(manufacturer.id, manufacturer);
  if (!Array.isArray(manufacturer.models) || !manufacturer.models.length) {
    fail(`${manufacturerLocation}.models`, "must contain models");
    continue;
  }
  requireUnique(manufacturer.models.map((model) => model.id), `${manufacturerLocation}.models`);

  for (const model of manufacturer.models) {
    const modelLocation = `${manufacturerLocation}.${model.id || "unknown"}`;
    requireText(model.id, `${modelLocation}.id`);
    requireText(model.label, `${modelLocation}.label`);
    requireText(model.family, `${modelLocation}.family`);
    if (!Array.isArray(model.repairs) || !model.repairs.length) {
      fail(`${modelLocation}.repairs`, "must contain at least one repair");
      continue;
    }
    requireUnique(model.repairs.map((repair) => repair.id), `${modelLocation}.repairs`);

    for (const repair of model.repairs) {
      const repairLocation = `${modelLocation}.${repair.id || "unknown"}`;
      requireText(repair.id, `${repairLocation}.id`);
      requireTranslationKey(repair.labelKey, `${repairLocation}.labelKey`);
      if (!Array.isArray(repair.partOptions) || !repair.partOptions.length) {
        fail(`${repairLocation}.partOptions`, "must contain at least one part option");
        continue;
      }
      requireUnique(repair.partOptions.map((option) => option.id), `${repairLocation}.partOptions`);

      for (const option of repair.partOptions) {
        const optionLocation = `${repairLocation}.${option.id || "unknown"}`;
        requireText(option.id, `${optionLocation}.id`);
        requireTranslationKey(option.nameKey, `${optionLocation}.nameKey`);
        requireTranslationKey(option.descriptionKey, `${optionLocation}.descriptionKey`);
        if (!qualityValues.has(option.quality)) fail(`${optionLocation}.quality`, `invalid value '${option.quality}'`);
        if (!technologyValues.has(option.technology)) fail(`${optionLocation}.technology`, `invalid value '${option.technology}'`);
        if (!stockValues.has(option.stock)) fail(`${optionLocation}.stock`, `invalid value '${option.stock}'`);
        if (option.priceCents === null) {
          if (option.stock !== "unavailable") fail(`${optionLocation}.priceCents`, "may be null only when unavailable");
        } else if (!Number.isInteger(option.priceCents) || option.priceCents <= 0) {
          fail(`${optionLocation}.priceCents`, "must be a positive integer in cents");
        }
        if (!Array.isArray(option.recommendationTags)) {
          fail(`${optionLocation}.recommendationTags`, "must be an array");
        } else {
          option.recommendationTags.forEach((tag) => {
            if (!recommendationValues.has(tag)) fail(`${optionLocation}.recommendationTags`, `invalid value '${tag}'`);
          });
        }
        if (option.icTransfer) {
          if (!Array.isArray(option.icTransfer.compatibleModelIds) || !option.icTransfer.compatibleModelIds.includes(model.id)) {
            fail(`${optionLocation}.icTransfer`, "must explicitly include the current model id");
          }
          if (!["fixed", "percent"].includes(option.icTransfer.pricing?.type)) {
            fail(`${optionLocation}.icTransfer.pricing.type`, "must be fixed or percent");
          }
        }
      }
    }
  }
}

requireUnique((catalog.serviceOptions || []).map((option) => option.id), "repair-catalog.serviceOptions");
for (const option of catalog.serviceOptions || []) {
  const location = `service.${option.id || "unknown"}`;
  requireText(option.id, `${location}.id`);
  requireTranslationKey(option.labelKey, `${location}.labelKey`);
  if (!servicePricingValues.has(option.pricing?.type)) fail(`${location}.pricing.type`, "invalid pricing type");
  if (option.pricing?.priceCents !== undefined && (!Number.isInteger(option.pricing.priceCents) || option.pricing.priceCents < 0)) {
    fail(`${location}.pricing.priceCents`, "must be a non-negative integer");
  }
  if (option.pricing?.type === "distance") {
    let previousKm = 0;
    for (const tier of option.pricing.tiers || []) {
      if (!(tier.maxKm > previousKm)) fail(`${location}.pricing.tiers`, "maxKm values must increase");
      if (!Number.isInteger(tier.priceCents) || tier.priceCents < 0) fail(`${location}.pricing.tiers`, "priceCents must be non-negative integers");
      previousKm = tier.maxKm;
    }
  }
}

if (manufacturerReferences.schemaVersion !== 1) fail("manufacturer-reference-prices.schemaVersion", "must equal 1");
if (manufacturerReferences.currency !== catalog.currency) fail("manufacturer-reference-prices.currency", "must match repair catalog");
const referenceIds = [];
for (const reference of manufacturerReferences.references || []) {
  const referenceId = `${reference.manufacturer}:${reference.modelId}:${reference.repairType}`;
  referenceIds.push(referenceId);
  const location = `reference.${referenceId}`;
  const manufacturer = manufacturerMap.get(reference.manufacturer);
  const model = manufacturer?.models.find((item) => item.id === reference.modelId);
  if (!manufacturer) fail(location, "unknown manufacturer");
  if (!model) fail(location, "unknown exact model id");
  if (!Number.isInteger(reference.priceCents) || reference.priceCents <= 0) fail(`${location}.priceCents`, "must be a positive integer");
  if (reference.currency !== catalog.currency) fail(`${location}.currency`, "must match catalog currency");
  try {
    const url = new URL(reference.sourceUrl);
    if (url.protocol !== "https:") fail(`${location}.sourceUrl`, "must use HTTPS");
  } catch {
    fail(`${location}.sourceUrl`, "must be a valid URL");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reference.verifiedAt) || Number.isNaN(Date.parse(reference.verifiedAt))) {
    fail(`${location}.verifiedAt`, "must be a valid ISO date");
  }
}
requireUnique(referenceIds, "manufacturer-reference-prices.references");

if (errors.length) {
  console.error(`Repair data validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const modelCount = [...manufacturerMap.values()].reduce((total, manufacturer) => total + manufacturer.models.length, 0);
const optionCount = [...manufacturerMap.values()].reduce((total, manufacturer) => (
  total + manufacturer.models.reduce((modelTotal, model) => (
    modelTotal + model.repairs.reduce((repairTotal, repair) => repairTotal + repair.partOptions.length, 0)
  ), 0)
), 0);
console.log(`Repair data valid: ${manufacturerMap.size} manufacturers, ${modelCount} models, ${optionCount} part options, ${referenceIds.length} reference prices.`);
