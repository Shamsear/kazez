// UI copy. One label per intent: "Find your fit", "Add to cart", "WhatsApp us".
export const STRINGS = {
  en: {
    meta: { skip: 'Skip to content' },
    nav: {
      motor: 'Motor', fit: 'Find your fit', install: 'Install', contact: 'Contact',
      cart: 'Cart', menu: 'Menu', close: 'Close', language: 'العربية', languageLabel: 'Switch to Arabic',
      currency: 'Currency', home: 'Kazez home'
    },
    common: {
      fit: 'Find your fit', addToCart: 'Add to cart', whatsapp: 'WhatsApp us', shopMotor: 'Shop the motor',
      from: 'From', each: 'each', qty: 'Quantity', remove: 'Remove', increase: 'Increase quantity', decrease: 'Decrease quantity',
      minutes: 'min', noDrill: 'No drilling', inStock: 'In stock', reviews: 'reviews', back: 'Back',
      chargedInQar: 'You are charged in QAR. Other currencies are estimates.', added: 'Added to cart'
    },
    home: {
      title: 'Antenna up.\nAntenna down.',
      sub: 'A sealed 12V motor that raises and folds your VHF whip from a keychain remote or cabin switch.',
      priceLine: 'From QAR 350. Ships from Doha.',
      heroAlt: 'Kazez motor on a black SUV roof with the antenna raised against the sky',
      stripLabel: 'Your vehicle', make: 'Make', model: 'Model', pickMake: 'Choose make', pickModel: 'Choose model',
      showKit: 'Show kit', lastVehicle: 'Last time',
      foldTitle: 'Folds flat when you don’t need it.',
      foldBody: 'The whip stands upright for range on the trail, then lies down along the roof before you reach the car park, the car wash or a low garage.',
      raise: 'Raise', raiseBody: 'Antenna upright for the best signal.',
      fold: 'Fold', foldShort: 'Antenna flat along the roof.',
      control: 'Works from the keychain remote or a switch wired into the cabin.',
      videoLabel: 'Close-up film of the Kazez motor',
      finishesTitle: 'Two finishes. Same motor.',
      choose: 'Choose',
      specTitle: 'Built for heat, fine dust and washboard tracks.',
      worksTitle: 'Brackets for the trucks we see every day.',
      models: 'models', model1: 'model',
      worksOther: 'Not listed? The universal clamp fits bull bars, roll cages and roof racks.'
    },
    fit: {
      title: 'Find your fit',
      sub: 'Pick your vehicle. We match the bracket and show the full kit.',
      step1: 'Make', step2: 'Model', step3: 'Your kit',
      chooseMake: 'Which make do you drive?', chooseModel: 'Which model?',
      change: 'Change',
      kitFor: 'Kit for',
      motor: 'Motor', bracket: 'Bracket', total: 'Kit total',
      optionsNote: 'Two brackets fit this vehicle. Pick the mount you prefer.',
      install: 'Fitting time', mount: 'Mount', finishLabel: 'Finish', clamp: 'Clamp range',
      motorOnly: 'I already have a bracket', motorOnlyHint: 'Add the motor on its own',
      notListed: 'Don’t see your vehicle?',
      notListedBody: 'Message us the make, model and year. If we don’t stock a direct fit yet, the universal clamp usually works.',
      sku: 'SKU', copy: 'Copy SKU', copied: 'Copied',
      tradeHint: 'Fitting several vehicles? Set the quantity per kit.'
    },
    motor: {
      finish: 'Finish',
      matched: 'Matched for your',
      addBracket: 'Add the bracket',
      checkFit: 'Check which bracket fits your vehicle',
      ship: 'Ships same or next day in Doha',
      pay: 'Card, cash on delivery or WhatsApp order',
      warranty: '1-year direct replacement',
      about: 'About the motor', inBox: 'In the box', specs: 'Specifications',
      gallery: 'Product images', view: 'View image'
    },
    install: {
      title: 'Installing the motor',
      sub: 'Bracket fitting takes 8 to 15 minutes depending on the vehicle. Wiring uses the fused 12V harness in the box.',
      steps: [
        { t: 'Fit the bracket', d: 'Clamp it to the roof rail, gutter or bonnet hinge using the supplied hardware.' },
        { t: 'Mount the motor', d: 'Bolt the motor to the bracket and screw your antenna base onto the motor.' },
        { t: 'Run the harness', d: 'Connect to a fused 12V source. Add the cabin switch if you want a second control.' },
        { t: 'Pair and test', d: 'Pair the remote, then raise and fold the antenna a few times before driving.' }
      ],
      videoLabel: 'Kazez motor raising an antenna on a white SUV',
      faqTitle: 'Questions',
      faq: [
        { q: 'Will my current antenna fit?', a: 'Any whip that screws onto a standard base mount fits. Send us a photo on WhatsApp if you are unsure.' },
        { q: 'Can I go through a car wash?', a: 'Yes. Fold the antenna first so it lies flat along the roof.' },
        { q: 'Do you install it for me?', a: 'Yes, at our Doha showroom by appointment. Most fittings are done while you wait.' },
        { q: 'What does the warranty cover?', a: 'One year. If the motor fails in normal use, we replace it directly.' },
        { q: 'How fast is delivery?', a: 'Same or next day inside Qatar. Two to four working days across the GCC.' }
      ],
      helpTitle: 'Stuck halfway?',
      helpBody: 'Send a photo of your roof and wiring. We reply during showroom hours.'
    },
    contact: {
      title: 'Talk to us',
      sub: 'Questions about fitment, an order or trade pricing. We reply during showroom hours.',
      showroom: 'Showroom', hours: 'Hours', phone: 'Phone', email: 'Email', directions: 'Get directions',
      formTitle: 'Send a message',
      name: 'Name', phoneField: 'Phone', vehicle: 'Vehicle', vehicleHint: 'Make, model and year', message: 'Message',
      send: 'Send message', sentTitle: 'Message sent', sentBody: 'Thanks. We will call or message you back on the number you gave.',
      sendAnother: 'Send another',
      trade: 'Installers and workshops',
      tradeBody: 'Ask about trade pricing on kits of five or more.',
      errName: 'Enter your name', errPhone: 'Enter a phone number we can reach', errMessage: 'Write a short message'
    },
    cart: {
      title: 'Cart', empty: 'Your cart is empty', emptyBody: 'Start with your vehicle and we will match the right kit.',
      subtotal: 'Subtotal', checkout: 'Checkout', note: 'Fitment note', forVehicle: 'For',
      motorFinish: 'finish'
    },
    checkout: {
      title: 'Checkout',
      contact: 'Contact', delivery: 'Delivery', payment: 'Payment',
      name: 'Full name', phone: 'Mobile number', email: 'Email', optional: 'optional',
      country: 'Country', city: 'City', address: 'Street address', addressHint: 'Zone, street and building number',
      notes: 'Delivery notes', notesHint: 'Gate code, landmark or best time',
      card: 'Card', cardBody: 'Visa, Mastercard',
      cod: 'Cash on delivery', codBody: 'Pay the driver in cash or by card',
      wa: 'WhatsApp order', waBody: 'We confirm the order and send a payment link',
      cardNumber: 'Card number', expiry: 'Expiry (MM/YY)', cvc: 'Security code',
      demoNote: 'Demo checkout. No payment is taken.',
      summary: 'Order summary', shipping: 'Delivery', free: 'Free', total: 'Total',
      place: 'Place order', placing: 'Placing order',
      emptyTitle: 'Nothing to check out yet', emptyBody: 'Your cart is empty.',
      continueToDelivery: 'Continue to Delivery',
      continueToPayment: 'Continue to Payment',
      back: 'Back',
      step1: '1. Contact details',
      step2: '2. Delivery address',
      step3: '3. Payment & confirmation',
      errName: 'Enter your full name', errPhone: 'Enter a valid mobile number', errCity: 'Enter your city',
      errAddress: 'Enter a street address', errCard: 'Enter a 16-digit card number', errExpiry: 'Use MM/YY',
      errCvc: 'Enter the 3 or 4 digit code', errSummary: 'Check the highlighted fields.'
    },
    order: {
      title: 'Thanks, {name}. Your order is in.',
      sub: 'We will message {phone} when it leaves the showroom.',
      number: 'Order', date: 'Placed', payment: 'Payment', deliverTo: 'Deliver to', arrives: 'Expected',
      items: 'Items', print: 'Print receipt', share: 'Send to WhatsApp', continue: 'Back to home',
      paid: 'Paid', due: 'Due on delivery', pending: 'Link on WhatsApp',
      notFound: 'We can’t find that order', notFoundBody: 'Orders in this demo are saved in this browser only.'
    },
    footer: {
      blurb: 'Kazez antenna motors and vehicle brackets. Sold and fitted in Doha, shipped across the GCC.',
      shop: 'Shop', help: 'Help', visit: 'Visit',
      warranty: '1-year replacement warranty', returns: 'Returns within 14 days, unused',
      rights: 'Kazez. Demo storefront.'
    },
    notFound: { title: 'This page doesn’t exist', body: 'The link may be old.', home: 'Back to home' }
  },

  ar: {
    meta: { skip: 'تخطَّ إلى المحتوى' },
    nav: {
      motor: 'المحرك', fit: 'اعثر على القاعدة', install: 'التركيب', contact: 'تواصل',
      cart: 'السلة', menu: 'القائمة', close: 'إغلاق', language: 'English', languageLabel: 'Switch to English',
      currency: 'العملة', home: 'الصفحة الرئيسية لقازيز'
    },
    common: {
      fit: 'اعثر على القاعدة', addToCart: 'أضف إلى السلة', whatsapp: 'راسلنا واتساب', shopMotor: 'تسوّق المحرك',
      from: 'من', each: 'للقطعة', qty: 'الكمية', remove: 'إزالة', increase: 'زيادة الكمية', decrease: 'تقليل الكمية',
      minutes: 'دقيقة', noDrill: 'بدون ثقب', inStock: 'متوفر', reviews: 'تقييم', back: 'رجوع',
      chargedInQar: 'يتم الدفع بالريال القطري. العملات الأخرى تقديرية.', added: 'أُضيف إلى السلة'
    },
    home: {
      title: 'الهوائي للأعلى.\nالهوائي للأسفل.',
      sub: 'محرك 12 فولت محكم الإغلاق يرفع هوائي VHF ويطويه من ريموت الميدالية أو مفتاح داخل المقصورة.',
      priceLine: 'من 350 ريال. الشحن من الدوحة.',
      heroAlt: 'محرك قازيز على سقف سيارة سوداء والهوائي مرفوع نحو السماء',
      stripLabel: 'سيارتك', make: 'الشركة', model: 'الطراز', pickMake: 'اختر الشركة', pickModel: 'اختر الطراز',
      showKit: 'اعرض الطقم', lastVehicle: 'آخر مرة',
      foldTitle: 'ينطوي حين لا تحتاجه.',
      foldBody: 'يقف الهوائي لأفضل مدى في البر، ثم ينطوي على السقف قبل أن تصل إلى المواقف أو مغسلة السيارات أو الكراج المنخفض.',
      raise: 'رفع', raiseBody: 'الهوائي قائم لأفضل إشارة.',
      fold: 'طي', foldShort: 'الهوائي ممدد على السقف.',
      control: 'يعمل من ريموت الميدالية أو من مفتاح موصول داخل المقصورة.',
      videoLabel: 'فيلم مقرّب لمحرك قازيز',
      finishesTitle: 'لونان. المحرك نفسه.',
      choose: 'اختر',
      specTitle: 'مصمم للحرارة والغبار الناعم والطرق المتموجة.',
      worksTitle: 'قواعد للسيارات التي نراها كل يوم.',
      models: 'طرازات', model1: 'طراز',
      worksOther: 'سيارتك غير موجودة؟ القاعدة الشاملة تناسب الصدامات والرول كيج وسلال السقف.'
    },
    fit: {
      title: 'اعثر على القاعدة',
      sub: 'اختر سيارتك، ونطابق لك القاعدة ونعرض الطقم كاملاً.',
      step1: 'الشركة', step2: 'الطراز', step3: 'طقمك',
      chooseMake: 'ما شركة سيارتك؟', chooseModel: 'ما الطراز؟',
      change: 'تغيير',
      kitFor: 'طقم لـ',
      motor: 'المحرك', bracket: 'القاعدة', total: 'إجمالي الطقم',
      optionsNote: 'قاعدتان تناسبان هذه السيارة. اختر طريقة التثبيت المفضلة.',
      install: 'مدة التركيب', mount: 'التثبيت', finishLabel: 'اللون', clamp: 'نطاق الكلبس',
      motorOnly: 'لدي قاعدة بالفعل', motorOnlyHint: 'أضف المحرك وحده',
      notListed: 'سيارتك غير موجودة؟',
      notListedBody: 'أرسل لنا الشركة والطراز والسنة. إن لم تتوفر قاعدة مباشرة بعد، فالقاعدة الشاملة تناسب غالباً.',
      sku: 'رمز المنتج', copy: 'نسخ الرمز', copied: 'تم النسخ',
      tradeHint: 'تركّب لعدة سيارات؟ حدّد الكمية لكل طقم.'
    },
    motor: {
      finish: 'اللون',
      matched: 'مطابق لسيارتك',
      addBracket: 'أضف القاعدة',
      checkFit: 'اعرف القاعدة المناسبة لسيارتك',
      ship: 'الشحن في نفس اليوم أو اليوم التالي داخل الدوحة',
      pay: 'بطاقة أو دفع عند الاستلام أو طلب عبر واتساب',
      warranty: 'ضمان استبدال مباشر لمدة سنة',
      about: 'عن المحرك', inBox: 'محتويات العلبة', specs: 'المواصفات',
      gallery: 'صور المنتج', view: 'عرض الصورة'
    },
    install: {
      title: 'تركيب المحرك',
      sub: 'تركيب القاعدة يستغرق من 8 إلى 15 دقيقة حسب السيارة. التوصيل عبر ضفيرة 12 فولت مع فيوز داخل العلبة.',
      steps: [
        { t: 'ثبّت القاعدة', d: 'ثبّتها على سكة السقف أو المجرى أو مفصلة الكبوت بالبراغي المرفقة.' },
        { t: 'ركّب المحرك', d: 'اربط المحرك بالقاعدة ثم ركّب قاعدة الهوائي على المحرك.' },
        { t: 'مدّد الضفيرة', d: 'وصّلها بمصدر 12 فولت مع فيوز. أضف المفتاح الداخلي إن أردت تحكماً ثانياً.' },
        { t: 'اقرن وجرّب', d: 'اقرن الريموت، ثم ارفع الهوائي واطوه عدة مرات قبل القيادة.' }
      ],
      videoLabel: 'محرك قازيز يرفع الهوائي على سيارة بيضاء',
      faqTitle: 'أسئلة',
      faq: [
        { q: 'هل يناسب هوائيي الحالي؟', a: 'أي هوائي يُركَّب على قاعدة قياسية يناسب. أرسل لنا صورة على واتساب إن لم تكن متأكداً.' },
        { q: 'هل أستطيع دخول مغسلة السيارات؟', a: 'نعم. اطوِ الهوائي أولاً ليكون ممدداً على السقف.' },
        { q: 'هل تركّبونه لي؟', a: 'نعم، في صالة العرض بالدوحة بموعد مسبق. معظم التركيبات تنتهي أثناء انتظارك.' },
        { q: 'ماذا يشمل الضمان؟', a: 'سنة كاملة. إن تعطل المحرك في الاستخدام العادي نستبدله مباشرة.' },
        { q: 'كم يستغرق التوصيل؟', a: 'نفس اليوم أو اليوم التالي داخل قطر، ومن يومين إلى أربعة أيام عمل في الخليج.' }
      ],
      helpTitle: 'توقفت في المنتصف؟',
      helpBody: 'أرسل صورة للسقف والتوصيلات. نرد خلال ساعات عمل الصالة.'
    },
    contact: {
      title: 'تواصل معنا',
      sub: 'أسئلة عن القواعد أو طلب أو أسعار الجملة. نرد خلال ساعات عمل الصالة.',
      showroom: 'صالة العرض', hours: 'ساعات العمل', phone: 'الهاتف', email: 'البريد', directions: 'الاتجاهات',
      formTitle: 'أرسل رسالة',
      name: 'الاسم', phoneField: 'الهاتف', vehicle: 'السيارة', vehicleHint: 'الشركة والطراز والسنة', message: 'الرسالة',
      send: 'أرسل الرسالة', sentTitle: 'تم الإرسال', sentBody: 'شكراً. سنتصل بك أو نراسلك على الرقم الذي أدخلته.',
      sendAnother: 'أرسل رسالة أخرى',
      trade: 'الورش والمركّبون',
      tradeBody: 'اسأل عن أسعار الجملة لخمسة أطقم أو أكثر.',
      errName: 'أدخل اسمك', errPhone: 'أدخل رقماً يمكننا التواصل عليه', errMessage: 'اكتب رسالة قصيرة'
    },
    cart: {
      title: 'السلة', empty: 'سلتك فارغة', emptyBody: 'ابدأ بسيارتك ونطابق لك الطقم المناسب.',
      subtotal: 'المجموع', checkout: 'إتمام الطلب', note: 'ملاحظة التركيب', forVehicle: 'لـ',
      motorFinish: 'اللون'
    },
    checkout: {
      title: 'إتمام الطلب',
      contact: 'التواصل', delivery: 'التوصيل', payment: 'الدفع',
      name: 'الاسم الكامل', phone: 'رقم الجوال', email: 'البريد الإلكتروني', optional: 'اختياري',
      country: 'الدولة', city: 'المدينة', address: 'العنوان', addressHint: 'المنطقة والشارع ورقم المبنى',
      notes: 'ملاحظات التوصيل', notesHint: 'رمز البوابة أو معلم قريب أو أفضل وقت',
      card: 'بطاقة', cardBody: 'فيزا، ماستركارد',
      cod: 'الدفع عند الاستلام', codBody: 'ادفع للمندوب نقداً أو بالبطاقة',
      wa: 'طلب عبر واتساب', waBody: 'نؤكد الطلب ونرسل رابط الدفع',
      cardNumber: 'رقم البطاقة', expiry: 'الانتهاء (MM/YY)', cvc: 'رمز الأمان',
      demoNote: 'دفع تجريبي. لا يتم خصم أي مبلغ.',
      summary: 'ملخص الطلب', shipping: 'التوصيل', free: 'مجاني', total: 'الإجمالي',
      place: 'أكّد الطلب', placing: 'جارٍ تأكيد الطلب',
      emptyTitle: 'لا يوجد ما تطلبه بعد', emptyBody: 'سلتك فارغة.',
      continueToDelivery: 'المتابعة إلى عنوان التوصيل',
      continueToPayment: 'المتابعة إلى وسيلة الدفع',
      back: 'رجوع',
      step1: '1. بيانات الاتصال',
      step2: '2. عنوان التوصيل',
      step3: '3. وسيلة الدفع وتأكيد الطلب',
      errName: 'أدخل اسمك الكامل', errPhone: 'أدخل رقم جوال صحيح', errCity: 'أدخل المدينة',
      errAddress: 'أدخل العنوان', errCard: 'أدخل رقم بطاقة من 16 خانة', errExpiry: 'استخدم MM/YY',
      errCvc: 'أدخل الرمز من 3 أو 4 أرقام', errSummary: 'راجع الحقول المحددة.'
    },
    order: {
      title: 'شكراً {name}. وصلنا طلبك.',
      sub: 'سنراسلك على {phone} عند خروج الطلب من الصالة.',
      number: 'الطلب', date: 'التاريخ', payment: 'الدفع', deliverTo: 'التوصيل إلى', arrives: 'الموعد المتوقع',
      items: 'المنتجات', print: 'اطبع الإيصال', share: 'أرسل عبر واتساب', continue: 'العودة للرئيسية',
      paid: 'مدفوع', due: 'عند الاستلام', pending: 'رابط عبر واتساب',
      notFound: 'لم نجد هذا الطلب', notFoundBody: 'الطلبات في هذا العرض محفوظة في هذا المتصفح فقط.'
    },
    footer: {
      blurb: 'محركات هوائي قازيز وقواعد السيارات. بيع وتركيب في الدوحة، وشحن إلى دول الخليج.',
      shop: 'تسوّق', help: 'مساعدة', visit: 'زرنا',
      warranty: 'ضمان استبدال لمدة سنة', returns: 'الإرجاع خلال 14 يوماً لغير المستخدم',
      rights: 'قازيز. متجر تجريبي.'
    },
    notFound: { title: 'هذه الصفحة غير موجودة', body: 'ربما الرابط قديم.', home: 'العودة للرئيسية' }
  }
};
