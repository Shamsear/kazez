// Normalises the raw bracket catalogue into a fitment index: make -> model -> brackets.
import { BRACKETS } from './brackets.js';

export const MAKE_NAMES = {
  Toyota: { en: 'Toyota', ar: 'تويوتا' },
  Nissan: { en: 'Nissan', ar: 'نيسان' },
  Lexus: { en: 'Lexus', ar: 'لكزس' },
  GWM: { en: 'GWM Tank', ar: 'جريت وول تانك' },
  Jetour: { en: 'Jetour', ar: 'جيتور' },
  BYD: { en: 'BYD', ar: 'بي واي دي' },
  Universal: { en: 'Other / custom', ar: 'أخرى / مخصص' }
};

const MAKE_ORDER = ['Toyota', 'Nissan', 'Lexus', 'GWM', 'Jetour', 'BYD', 'Universal'];

const slug = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const clean = (s = '') => s.replace(/\s*[—–]\s*/g, ' to ').trim();

function colourOf(b) {
  const f = `${b.sku} ${b.finish}`.toLowerCase();
  return /slvr|silver|chrome/.test(f) ? 'silver' : 'black';
}

export const BRACKET_LIST = BRACKETS.map((b) => {
  const minutes = parseInt(b.installTime, 10) || null;
  const noDrill = /no drilling|zero drilling/i.test(`${b.installTime} ${b.notes}`);
  return {
    id: b.id,
    sku: b.sku,
    make: b.make,
    model: b.model,
    makeSlug: slug(b.make),
    modelSlug: slug(b.model),
    years: clean(b.years),
    bodyCode: b.bodyCode,
    mount: { en: clean(b.mountType), ar: b.arabicMountType },
    finish: { en: b.finish, ar: b.arabicFinish },
    note: { en: b.notes, ar: b.arabicNotes },
    clampRange: clean(b.clampRange),
    weight: b.weight,
    minutes,
    noDrill,
    colour: colourOf(b),
    price: b.price,
    inStock: b.inStock,
    image: b.image
  };
});

export const FITMENT = MAKE_ORDER.map((make) => {
  const items = BRACKET_LIST.filter((b) => b.make === make);
  const models = [];
  for (const b of items) {
    let m = models.find((x) => x.slug === b.modelSlug);
    if (!m) {
      m = { slug: b.modelSlug, name: b.model, years: b.years, bodyCode: b.bodyCode, brackets: [] };
      models.push(m);
    }
    m.brackets.push(b);
  }
  return { make, slug: slug(make), name: MAKE_NAMES[make], models };
});

export const findMake = (makeSlug) => FITMENT.find((m) => m.slug === makeSlug) || null;
export const findModel = (makeSlug, modelSlug) =>
  findMake(makeSlug)?.models.find((m) => m.slug === modelSlug) || null;

export const UNIVERSAL = BRACKET_LIST.find((b) => b.make === 'Universal');

export const bracketName = (b, lang) =>
  lang === 'ar' ? `قاعدة ${b.mount.ar}` : `${b.mount.en} bracket`;
