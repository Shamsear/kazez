// Kazez motor: single product, two finishes.
// Ratings / review counts are demo values for the client prototype.

export const MOTOR = {
  name: { en: 'Kazez Antenna Motor', ar: 'محرك هوائي قازيز' },
  price: 350,
  description: {
    en: 'A sealed 12V motor that sits under your VHF or UHF whip. Press up and the antenna stands upright. Press down and it folds flat along the roof for car parks, car washes and low garages. Machined from 6061-T6 aluminium and sealed to IP67 against fine dust and water.',
    ar: 'محرك 12 فولت محكم الإغلاق يُركَّب أسفل هوائي VHF أو UHF. اضغط للأعلى ليقف الهوائي، واضغط للأسفل لينطوي على السقف في المواقف ومغاسل السيارات والكراجات المنخفضة. مصنوع من ألمنيوم 6061-T6 ومحكم بمعيار IP67 ضد الغبار الناعم والماء.'
  },
  finishes: {
    black: {
      key: 'black',
      sku: 'KAZEZ',
      label: { en: 'Black', ar: 'أسود' },
      detail: { en: 'Hard-anodised black', ar: 'أنودة سوداء صلبة' },
      swatch: '#15171A',
      rating: 4.5,
      reviews: 42,
      images: [
        '/assets/images/motor-black.webp',
        '/assets/images/motor-black-angle.webp',
        '/assets/images/motor-black-installed.webp'
      ]
    },
    silver: {
      key: 'silver',
      sku: 'KAZEZ-SLVR',
      label: { en: 'Silver', ar: 'فضي' },
      detail: { en: 'Mirror chrome', ar: 'كروم عاكس' },
      swatch: 'linear-gradient(135deg, #F4F5F7, #A9AFB6)',
      rating: 4.8,
      reviews: 36,
      images: [
        '/assets/images/motor-silver.webp',
        '/assets/images/motor-silver-angle.webp',
        '/assets/images/motor-silver-rear.webp'
      ]
    }
  }
};

export const FINISH_KEYS = ['black', 'silver'];

// Grouped spec sheet. Only claims that appear consistently in the product material.
export const SPEC_GROUPS = [
  {
    title: { en: 'Build', ar: 'التصنيع' },
    rows: [
      { label: { en: 'Housing', ar: 'الهيكل' }, value: { en: '6061-T6 aluminium', ar: 'ألمنيوم 6061-T6' } },
      { label: { en: 'Holding torque', ar: 'عزم التثبيت' }, value: { en: '45 Nm, planetary gearbox', ar: '45 نيوتن متر، ناقل كوكبي' } },
      { label: { en: 'Sealing', ar: 'العزل' }, value: { en: 'IP67 dust and water', ar: 'IP67 ضد الغبار والماء' } }
    ]
  },
  {
    title: { en: 'Electrical', ar: 'الكهرباء' },
    rows: [
      { label: { en: 'Power', ar: 'الطاقة' }, value: { en: '12V DC vehicle supply', ar: '12 فولت من السيارة' } },
      { label: { en: 'Control', ar: 'التحكم' }, value: { en: '433 MHz remote and cabin switch', ar: 'ريموت 433 ميغاهرتز ومفتاح داخلي' } },
      { label: { en: 'Antenna band', ar: 'نطاق الهوائي' }, value: { en: '136 to 470 MHz VHF / UHF', ar: '136 إلى 470 ميغاهرتز VHF / UHF' } }
    ]
  },
  {
    title: { en: 'Conditions', ar: 'ظروف التشغيل' },
    rows: [
      { label: { en: 'Temperature', ar: 'الحرارة' }, value: { en: '−20 °C to +85 °C', ar: 'من −20 إلى +85 درجة' } },
      { label: { en: 'Warranty', ar: 'الضمان' }, value: { en: '1 year, direct replacement', ar: 'سنة، استبدال مباشر' } }
    ]
  }
];

export const IN_THE_BOX = [
  { en: 'Kazez antenna motor', ar: 'محرك هوائي قازيز' },
  { en: 'Wireless keychain remote', ar: 'ريموت ميدالية لاسلكي' },
  { en: 'Waterproof 12V harness with in-line fuse', ar: 'ضفيرة 12 فولت مقاومة للماء مع فيوز' },
  { en: 'Stainless mounting hardware', ar: 'براغي تثبيت ستانلس' },
  { en: 'Installation guide', ar: 'دليل التركيب' }
];
