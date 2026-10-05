export const SHOP = {
  phone: '+974 5512 8900',
  phoneHref: 'tel:+97455128900',
  whatsapp: '97455128900',
  email: 'hello@kazez.qa',
  address: { en: 'Salwa Road, Zone 55, Doha, Qatar', ar: 'طريق سلوى، منطقة 55، الدوحة، قطر' },
  hours: { en: 'Saturday to Thursday, 9:00 to 21:00', ar: 'السبت إلى الخميس، 9:00 إلى 21:00' },
  mapUrl: 'https://maps.google.com/?q=Salwa+Road+Doha+Qatar'
};

export const waLink = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;

export const CURRENCIES = {
  QAR: { rate: 1, digits: 0 },
  SAR: { rate: 1.03, digits: 0 },
  AED: { rate: 1.01, digits: 0 },
  USD: { rate: 0.2747, digits: 2 }
};

export const GCC = [
  { code: 'QA', dial: '+974', en: 'Qatar', ar: 'قطر' },
  { code: 'SA', dial: '+966', en: 'Saudi Arabia', ar: 'السعودية' },
  { code: 'AE', dial: '+971', en: 'United Arab Emirates', ar: 'الإمارات' },
  { code: 'KW', dial: '+965', en: 'Kuwait', ar: 'الكويت' },
  { code: 'OM', dial: '+968', en: 'Oman', ar: 'عُمان' },
  { code: 'BH', dial: '+973', en: 'Bahrain', ar: 'البحرين' }
];

export const DELIVERY = {
  QA: { fee: 0, days: { en: 'Same or next day', ar: 'نفس اليوم أو اليوم التالي' } },
  default: { fee: 35, days: { en: '2 to 4 working days', ar: '2 إلى 4 أيام عمل' } }
};
