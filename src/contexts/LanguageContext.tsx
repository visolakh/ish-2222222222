"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'uz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.jobs': 'Вакансии',
    'nav.howWeWork': 'Как мы работаем',
    'nav.contact': 'Контакты',
    'nav.legal': 'Правовая информация',

    // Hero Section
    'hero.title': 'Официальное трудоустройство за рубежом',
    'hero.subtitle': 'Надёжный партнёр в поиске легальной работы за рубежом.',
    'hero.agency': 'Агентство Частной Занятости',
    'hero.overseas': 'Трудоустройство за рубежом',
    'hero.welcome': 'Добро пожаловать!',
    'hero.cta': 'Подобрать вакансию',
    'hero.consultation': 'Бесплатная консультация',

    // Services
    'services.title': 'Наши услуги',
    'services.subtitle': 'Полный спектр услуг для вашего успешного трудоустройства за рубежом',
    'services.legal.title': 'Легальное трудоустройство',
    'services.legal.desc': 'Официальное оформление всех документов и рабочих виз',
    'services.support.title': 'Сопровождение на всех этапах',
    'services.support.desc': 'Мы помогаем кандидатам от подачи заявки до трудоустройства',
    'services.verified.title': 'Проверенные работодатели',
    'services.verified.desc': 'Работаем только с надежными компаниями',
    'services.housing.title': 'Программы адаптации и подготовки кадров',
    'services.housing.desc': 'Организуем программы профессиональной адаптации и подготовки сотрудников, выезжающих для работы за рубеж',

    // Mission
    'mission.title': 'Наша миссия',
    'mission.text': 'HORIZON WORK помогает людям найти достойную работу за рубежом с полным соблюдением законодательства. Мы гарантируем прозрачность процесса, легальное трудоустройство и поддержку на каждом этапе.',

    // Mehnat.uz Integration
    'mehnat.title': 'Интеграция с Mehnat.uz',
    'mehnat.description': 'HORIZON WORK интегрирован с государственным порталом Mehnat.uz для обеспечения максимальной прозрачности и легальности процесса трудоустройства.',
    'mehnat.benefits': 'Преимущества интеграции:',
    'mehnat.benefit1': 'Официальная регистрация всех трудовых контрактов',
    'mehnat.benefit2': 'Защита прав работников на государственном уровне',
    'mehnat.benefit3': 'Доступ к базе проверенных работодателей',
    'mehnat.benefit4': 'Гарантированная легальность трудоустройства',
    'mehnat.button': 'Перейти на Mehnat.uz →',

    // Location
    'location.title': 'Наше местоположение',
    'location.address': 'г. Ташкент, махалля Буюк Ипак Йўли, дом 32, квартира 3, Ц-1',

    // About Page - Updated stats
    'about.title': 'О компании',
    'about.subtitle': 'HORIZON WORK - надежный партнер в трудоустройстве за рубежом',
    'about.license': 'Лицензия',
    'about.licenseText': 'HORIZON WORK имеет официальную лицензию на трудоустройство граждан за рубежом, выданную Министерством занятости и сокращения бедности Республики Узбекистан.',
    'about.advantages.title': 'Наши преимущества',
    'about.advantage1': 'Более 2 лет на рынке',
    'about.advantage1.desc': 'Успешно работаем с 2022 года',
    'about.advantage2': 'Более 400 устроенных кандидатов',
    'about.advantage2.desc': 'Помогли найти работу за рубежом',
    'about.advantage3': '100% легальное трудоустройство',
    'about.advantage3.desc': 'Все документы и контракты легальны',
    'about.advantage4': 'Более 200 трудоустроенных кандидатов в разных странах',
    'about.advantage4.desc': 'Мы помогаем кандидатам от подачи заявки до трудоустройства',

    // Legal Information
    'about.legal.tin': 'ИНН',
    'about.legal.tinValue': '311027133',
    'about.legal.oked': 'ОКЭД',
    'about.legal.okedValue': '78100',
    'about.legal.address': 'Юридический адрес',
    'about.legal.addressValue': 'г. Ташкент, Яккасарайский район, Belariq МФЙ, улица Тошбулоқ, дом 53',

    // License Details
    'about.license.caption': 'Лицензия № 297974 — Выдана: 12.06.2024 — Срок действия: бессрочная — Статус: активна',
    'about.license.official': 'Официально лицензировано',
    'about.license.number': 'Номер лицензии',
    'about.license.numberValue': '№297974',
    'about.license.issued': 'Дата выдачи',
    'about.license.issuedValue': '12.06.2024',
    'about.license.issuer': 'Орган, выдавший лицензию',
    'about.license.issuerName': 'Министерство занятости и сокращения бедности Республики Узбекистан',
    'about.license.validity': 'Срок действия',
    'about.license.unlimited': 'Бессрочная',
    'about.license.status': 'Статус',
    'about.license.active': 'Активна',

    // QR Code
    'about.license.qr': 'Отсканируйте QR-код, чтобы проверить лицензию на портале license.gov.uz',

    // Jobs Page
    'jobs.title': 'Вакансии за рубежом',
    'jobs.subtitle': 'Найдите идеальную работу за рубежом',
    'jobs.employmentSpheres': 'Основные сферы трудоустройства:',
    'jobs.employmentSphere1': 'Строительные компании',
    'jobs.employmentSphere2': 'Промышленные предприятия',
    'jobs.employmentSphere3': 'Ресторанный и гостиничный бизнес',
    'jobs.employmentSphere4': 'Торговля и службы доставки',
    'jobs.whoWeSeek': 'Кого мы ищем?',

    // Job Categories
    'jobs.category1.title': 'Технические специалисты',
    'jobs.category1.job1': 'Сварщики',
    'jobs.category1.job2': 'Операторы',
    'jobs.category1.job3': 'Слесари',
    'jobs.category1.job4': 'Инженеры',
    'jobs.category1.job5': 'Электрики',
    'jobs.category1.job6': 'Монтажники различных направлений',

    'jobs.category2.title': 'Сервисный персонал',
    'jobs.category2.job1': 'Горничные',
    'jobs.category2.job2': 'Помощники поваров',
    'jobs.category2.job3': 'Грузчики',
    'jobs.category2.job4': 'Сотрудники отелей и ресторанов',
    'jobs.category2.job5': 'Клининговые сотрудники',

    'jobs.category3.title': 'Строительные специалисты',
    'jobs.category3.job1': 'Арматурщики',
    'jobs.category3.job2': 'Опалубщики',
    'jobs.category3.job3': 'Мастера по гипсокартону',
    'jobs.category3.job4': 'Маляры',
    'jobs.category3.job5': 'Штукатуры',
    'jobs.category3.job6': 'Фасадчики и другие профессии в строительной сфере',

    'jobs.category4.title': 'Торговая сфера',
    'jobs.category4.job1': 'Курьер-доставщик',
    'jobs.category4.job2': 'Сотрудники супермаркетов',
    'jobs.category4.job3': 'Сотрудники складов',

    'jobs.category5.title': 'Водители',
    'jobs.category5.job1': 'Водители грузовиков',
    'jobs.category5.job2': 'Водители самосвалов',
    'jobs.category5.job3': 'Водители бетономешалок',
    'jobs.category5.job4': 'Водители тяжёлой техники',
    'jobs.category5.job5': 'Водители вилочных погрузчиков',

    'jobs.filter': 'Фильтр по странам',
    'jobs.all': 'Все страны',

    // Jobs country cards
    'jobs.israel': 'Израиль',
    'jobs.israel.desc': 'Работа в уходе, медицине и сельском хозяйстве',
    'jobs.hungary': 'Венгрия',
    'jobs.hungary.desc': 'Строительные компании, промышленные предприятия',
    'jobs.bulgaria': 'Болгария',
    'jobs.bulgaria.desc': 'Ресторанный и гостиничный бизнес, торговля',
    'jobs.czechia': 'Чехия',
    'jobs.czechia.desc': 'Производство, строительство, промышленность',
    'jobs.russia': 'Россия',
    'jobs.russia.desc': 'Работа в производстве, строительстве и сервисе',
    'jobs.croatia': 'Хорватия',
    'jobs.croatia.desc': 'Туризм, гостиничный бизнес, сезонная работа',
    'jobs.apply': 'Подать заявку',
    'jobs.salary': 'Заработная плата',
    'jobs.duration': 'Продолжительность',

    // Latest Vacancies
    'jobs.latest.title': 'Актуальные вакансии',
    'jobs.latest.russia.title': 'Россия',
    'jobs.latest.russia.job1': 'Электрогазосварщик',
    'jobs.latest.russia.job2': 'Арматурщик',
    'jobs.latest.russia.job3': 'Машинист мостового крана (управление с пола)',
    'jobs.latest.russia.job4': 'Оператор пульта управления',
    'jobs.latest.russia.job5': 'Подсобный рабочий',
    'jobs.latest.russia.job6': 'Формовщик (бетонщик)',
    'jobs.latest.russia.job7': 'Отделочник',
    'jobs.latest.russia.job8': 'Рабочий',
    'jobs.latest.russia.job9': 'Водитель дежурного автомобиля',
    'jobs.latest.russia.job10': 'Водитель погрузчика',
    'jobs.latest.russia.job11': 'Водитель электрокара',
    'jobs.latest.russia.job12': 'Инженер по надзору за сосудами, работающими под давлением (2 места)',
    'jobs.latest.russia.job13': 'Инженер КИПиА',
    'jobs.latest.russia.job14': 'Механик грузоподъемных механизмов',
    'jobs.latest.russia.job15': 'Инженер по надзору за грузоподъемными механизмами',
    'jobs.latest.russia.job16': 'Инженер отдела технического контроля (ОТК)',
    'jobs.latest.russia.job17': 'Инженер-эколог',
    'jobs.latest.russia.job18': 'Инженер по контролю качества',
    'jobs.latest.russia.job19': 'Инженер-эколог',
    'jobs.latest.croatia.title': 'Хорватия',
    'jobs.latest.croatia.job1': 'Разнорабочий по строительству',
    'jobs.latest.croatia.job2': 'Штукатуры',
    'jobs.latest.croatia.job3': 'Маляры',
    'jobs.latest.israel.title': 'Израиль',
    'jobs.latest.israel.job1': 'Водители грузовых автомобилей',
    'jobs.latest.israel.job2': 'Домашний персонал',
    'jobs.latest.israel.job3': 'Уборщики',
    'jobs.latest.israel.job4': 'Официанты',
    'jobs.latest.israel.job5': 'Сборщики мебели и столяры (завод)',
    'jobs.latest.israel.job6': 'Монтажник алюминиевых композитных панелей',
    'jobs.latest.israel.job7': 'Монолитчик (технология Бернович)',
    'jobs.latest.germany.title': 'Германия',
    'jobs.latest.germany.job1': 'Водители категории CE',

    // Job Listings
    'jobs.type.fulltime': 'Полная занятость',
    'jobs.duration.12months': '12 месяцев',
    'jobs.duration.18months': '18 месяцев',
    'jobs.duration.24months': '24 месяца',
    'jobs.duration.36months': '36 месяцев',

    // How We Work
    'howWeWork.title': 'Как мы работаем',
    'howWeWork.subtitle': 'Простой и понятный процесс трудоустройства за рубежом',
    'howWeWork.goalsTitle': 'Наши основные цели:',
    'howWeWork.goal1': 'Помощь кандидатам в поиске работы, соответствующей их знаниям, навыкам и опыту',
    'howWeWork.goal2': 'Содействие в оформлении документов и получении трудовой визы категории D',
    'howWeWork.goal3': 'Организация курсов адаптации для выезжающих работников',
    'howWeWork.goal4': 'Работа исключительно с официально зарегистрированными работодателями',
    'howWeWork.goal5': 'Совместно с российскими партнёрами разработаны официальные языковые курсы и подготовительные программы',
    'howWeWork.step1': 'Консультация',
    'howWeWork.step1desc': 'Бесплатная консультация и подбор вакансий',
    'howWeWork.step1.detail1': 'Бесплатная консультация по телефону или в офисе',
    'howWeWork.step1.detail2': 'Анализ ваших навыков и опыта',
    'howWeWork.step1.detail3': 'Подбор подходящих вакансий',
    'howWeWork.step1.detail4': 'Полная информация о условиях работы',
    'howWeWork.step2': 'Документы',
    'howWeWork.step2desc': 'Подготовка и оформление всех необходимых документов',
    'howWeWork.step2.detail1': 'Сбор необходимых документов',
    'howWeWork.step2.detail2': 'Перевод и нотариальное заверение',
    'howWeWork.step2.detail3': 'Подача документов на рабочую визу',
    'howWeWork.step2.detail4': 'Оформление медицинских справок',
    'howWeWork.step3': 'Виза',
    'howWeWork.step3desc': 'Получение рабочей визы',
    'howWeWork.step3.detail1': 'Подготовка к собеседованию в посольстве',
    'howWeWork.step3.detail2': 'Сопровождение на собеседовании',
    'howWeWork.step3.detail3': 'Получение рабочей визы',
    'howWeWork.step3.detail4': 'Оформление трудового договора',
    'howWeWork.step4': 'Выезд',
    'howWeWork.step4desc': 'Организация выезда и встреча в стране назначения',
    'howWeWork.step4.detail1': 'Помощь в покупке авиабилетов',
    'howWeWork.step4.detail2': 'Встреча в аэропорту прибытия',
    'howWeWork.step4.detail3': 'Сопровождение до места проживания',
    'howWeWork.step4.detail4': 'Помощь в адаптации на новом месте',
    'howWeWork.timeline': 'Сроки оформления',
    'howWeWork.timeline.weeks': 'недели',
    'howWeWork.timeline.weeksAlt': 'недель',
    'howWeWork.timeline.months': 'месяца',
    'howWeWork.timeline.docs': 'Подготовка документов',
    'howWeWork.timeline.visa': 'Получение визы',
    'howWeWork.timeline.total': 'Полный цикл до выезда',
    'howWeWork.ready': 'Готовы начать?',
    'howWeWork.ready.text': 'Запишитесь на бесплатную консультацию, и мы поможем вам сделать первый шаг к работе за рубежом',

    // Contact
    'contact.title': 'Контакты',
    'contact.subtitle': 'Свяжитесь с нами любым удобным способом',
    'contact.address': 'Адрес',
    'contact.address.value': 'г. Ташкент, махалля Буюк Ипак Йўли, дом 32, квартира 3, Ц-1',
    'contact.address.factual': 'Фактический адрес',
    'contact.address.legal': 'Юридический адрес',
    'contact.address.factual.value': 'г. Ташкент, махалля Буюк Ипак Йўли, дом 32, квартира 3, Ц-1',
    'contact.address.legal.value': 'г. Ташкент, Яккасарайский район, Belariq МФЙ, улица Тошбулоқ, дом 53',
    'contact.phone': 'Телефон',
    'contact.email': 'Email',
    'contact.website': 'Веб-сайт',
    'contact.hours': 'Часы работы',
    'contact.hours.weekday': 'Пн-Пт: 9:00 - 18:00',
    'contact.hours.weekend': 'Сб: 10:00 - 15:00',
    'contact.location': 'Наше местоположение',
    'contact.form.title': 'Связаться с нами',
    'contact.form.name': 'ФИО',
    'contact.form.name.placeholder': 'Введите ваше имя',
    'contact.form.phone': 'Телефон',
    'contact.form.phone.placeholder': '+998 XX XXX XX XX',
    'contact.form.email': 'Email',
    'contact.form.country': 'Страна назначения',
    'contact.form.message': 'Сообщение',
    'contact.form.message.placeholder': 'Напишите ваше сообщение...',
    'contact.form.submit': 'Отправить',
    'contact.form.success': 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
    'contact.form.error': 'Ошибка отправки',
    'contact.form.error.text': 'Пожалуйста, попробуйте позже или свяжитесь с нами по телефону',
    'contact.form.sending': 'Отправка...',

    // Application Form
    'application.form.title': 'Оставьте заявку, и мы свяжемся с вами',
    'application.form.fullName': 'ФИО',
    'application.form.fullName.placeholder': 'Введите ваше имя',
    'application.form.phone': 'Телефон',
    'application.form.phone.placeholder': '+998 XX XXX XX XX',
    'application.form.desiredPosition': 'Желаемая должность',
    'application.form.submit': 'Отправить',
    'application.form.submitting': 'Отправка...',
    'application.form.success.title': 'Заявка успешно отправлена!',
    'application.form.success.message': 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
    'application.form.error.title': 'Ошибка отправки',
    'application.form.error.message': 'Пожалуйста, попробуйте позже или свяжитесь с нами по телефону',

    // Footer
    'footer.description': 'Надёжный партнёр в поиске легальной работы за рубежом.',
    'footer.contacts': 'Контакты',
    'footer.address': 'г. Ташкент, махалля Буюк Ипак Йўли, дом 32, квартира 3, Ц-1',
    'footer.rights': '© 2024 HORIZON WORK. Все права защищены.',
    'footer.quickLinks': 'Быстрые ссылки',

    // CTA
    'cta.ready': 'Готовы начать новую жизнь за рубежом?',
    'cta.consultation': 'Получите бесплатную консультацию сегодня',

    // Meta
    'meta.title': 'HORIZON WORK - Официальное трудоустройство за рубежом',
    'meta.description': 'Официальное трудоустройство за рубежом. Агентство с более чем 5-летним опытом.'
  },
  uz: {
    // Navigation
    'nav.home': 'Bosh sahifa',
    'nav.about': 'Biz haqimizda',
    'nav.jobs': 'Bo\'sh ish o\'rinlari',
    'nav.howWeWork': 'Qanday ishlaymiz',
    'nav.contact': 'Aloqa',
    'nav.legal': 'Huquqiy ma\'lumot',

    // Hero Section
    'hero.title': 'Xorijda rasmiy ishga joylashish',
    'hero.subtitle': 'Chet elda qonuniy ish topishda ishonchli hamkor.',
    'hero.agency': 'Xususiy Bandlik Agentligi',
    'hero.overseas': 'Chet elda ishga joylashish',
    'hero.welcome': 'Xush kelibsiz!',
    'hero.cta': 'Vakansiya tanlash',
    'hero.consultation': 'Bepul maslahat',

    // Services
    'services.title': 'Bizning xizmatlar',
    'services.subtitle': 'Xorijda muvaffaqiyatli ishga joylashish uchun to\'liq xizmatlar',
    'services.legal.title': 'Qonuniy ishga joylashish',
    'services.legal.desc': 'Barcha hujjatlar va ish vizalarini rasmiy rasmiylashtrish',
    'services.support.title': 'Barcha bosqichlarda hamrohlik',
    'services.support.desc': 'Biz arizadan ish joylashgunga qadar nomzodlarga yordam beramiz',
    'services.verified.title': 'Tekshirilgan ish beruvchilar',
    'services.verified.desc': 'Faqat ishonchli kompaniyalar bilan ishlaymiz',
    'services.housing.title': 'Xodimlarni tayyorlash va moslashuv dasturlari',
    'services.housing.desc': 'Chet elda ishlash uchun ketayotgan xodimlar uchun kasbiy moslashuv va tayyorgarlik dasturlarini tashkil etamiz',

    // Mission
    'mission.title': 'Bizning missiyamiz',
    'mission.text': 'HORIZON WORK odamlarga qonunchilikka to\'liq rioya qilgan holda xorijda munosib ish topishda yordam beradi. Biz jarayonning shaffofligini, qonuniy ishga joylashishni va har bosqichda qo\'llab-quvvatlashni kafolatlaymiz.',

    // Mehnat.uz Integration
    'mehnat.title': 'Mehnat.uz bilan integratsiya',
    'mehnat.description': 'HORIZON WORK davlat portali Mehnat.uz bilan integratsiyalashgan bo\'lib, ishga joylashtirish jarayonining maksimal shaffofligi va qonuniyligini ta\'minlaydi.',
    'mehnat.benefits': 'Integratsiya afzalliklari:',
    'mehnat.benefit1': 'Barcha mehnat shartnomalarining rasmiy ro\'yxatga olinishi',
    'mehnat.benefit2': 'Xodimlarning huquqlarini davlat darajasida himoya qilish',
    'mehnat.benefit3': 'Ishonchli ish beruvchilar bazasiga kirish',
    'mehnat.benefit4': 'Ishga joylashishning kafolatlangan qonuniyligi',
    'mehnat.button': 'Mehnat.uz saytiga o\'tish →',

    // Location
    'location.title': 'Joylashuvimiz',
    'location.address': 'Toshkent shahri, Buyuk Ipak Yo\'li dahasi, 32-uy, 3-xonadon, C-1',

    // About Page - Updated stats
    'about.title': 'Kompaniya haqida',
    'about.subtitle': 'HORIZON WORK - xorijda ishga joylashishda ishonchli hamkor',
    'about.license': 'Litsenziya',
    'about.licenseText': 'HORIZON WORK O\'zbekiston Respublikasi Bandlik va kambag\'allikni qisqartirish vazirligi tomonidan chet elda fuqarolarni ishga joylashtirish bo\'yicha rasmiy litsenziyaga ega.',
    'about.advantages.title': 'Bizning afzalliklarimiz',
    'about.advantage1': '2+ yildan beri mehnat bozorida',
    'about.advantage1.desc': '2022 yildan beri muvaffaqiyatli ishlaymiz',
    'about.advantage2': '400+ muvaffaqiyatli ishga joylashtirilgan nomzodlar',
    'about.advantage2.desc': 'Chet elda ish topishda yordam berdik',
    'about.advantage3': '100% qonuniy ishga joylashish',
    'about.advantage3.desc': 'Barcha hujjatlar va shartnomalar qonuniy',
    'about.advantage4': 'Turli davlatlarda 200 dan ortiq nomzod ishga joylashtirilgan',
    'about.advantage4.desc': 'Biz arizadan ish joylashgunga qadar nomzodlarga yordam beramiz',

    // Legal Information
    'about.legal.tin': 'STIR',
    'about.legal.tinValue': '311027133',
    'about.legal.oked': 'OKED',
    'about.legal.okedValue': '78100',
    'about.legal.address': 'Yuridik manzil',
    'about.legal.addressValue': 'Toshkent shahri, Yakkasaroy tumani, Belariq MFY, Toshbuloq ko\'chasi, 53-uy',

    // License Details
    'about.license.caption': 'Litsenziya raqami: 297974 — Berilgan sana: 12.06.2024 — Amal qilish muddati: cheklanmagan — Holati: faol',
    'about.license.official': 'Rasmiy litsenziyalangan',
    'about.license.number': 'Litsenziya raqami',
    'about.license.numberValue': '№297974',
    'about.license.issued': 'Berilgan sana',
    'about.license.issuedValue': '12.06.2024',
    'about.license.issuer': 'Berilgan organ',
    'about.license.issuerName': 'O\'zbekiston Respublikasi Bandlik va kambag\'allikni qisqartirish vazirligi',
    'about.license.validity': 'Amal qilish muddati',
    'about.license.unlimited': 'Muddatsiz',
    'about.license.status': 'Holati',
    'about.license.active': 'Faol',

    // QR Code
    'about.license.qr': 'QR kodni o\'tkazib, litsenziyani license.gov.uz portalida tekshirishingiz mumkin',

    // Jobs Page
    'jobs.title': 'Xorijdagi vakansiyalar',
    'jobs.subtitle': 'Xorijda ideal ish toping',
    'jobs.employmentSpheres': 'Asosiy bandlik sohalari:',
    'jobs.employmentSphere1': 'Qurilish kompaniyalari',
    'jobs.employmentSphere2': 'Sanoat korxonalari',
    'jobs.employmentSphere3': 'Restoran va mehmonxona biznesi',
    'jobs.employmentSphere4': 'Savdo va yetkazib berish xizmatlari',
    'jobs.whoWeSeek': 'Kimlarni qidiramiz?',

    // Job Categories
    'jobs.category1.title': 'Texnik mutaxassislar',
    'jobs.category1.job1': 'Payvandchilar',
    'jobs.category1.job2': 'Operatorlar',
    'jobs.category1.job3': 'Chilangarlar',
    'jobs.category1.job4': 'Muhandislar',
    'jobs.category1.job5': 'Elektrlar',
    'jobs.category1.job6': 'Turli yo\'nalishlar bo\'yicha montajchilar',

    'jobs.category2.title': 'Xizmat ko\'rsatuvchi xodimlar',
    'jobs.category2.job1': 'Xonaxizmatchilar',
    'jobs.category2.job2': 'Oshpaz yordamchilari',
    'jobs.category2.job3': 'Yukchilar',
    'jobs.category2.job4': 'Mehmonxona va restoran xodimlari',
    'jobs.category2.job5': 'Tozalash xodimlari',

    'jobs.category3.title': 'Qurilish mutaxassislari',
    'jobs.category3.job1': 'Armatura ishchilari',
    'jobs.category3.job2': 'Qalin taxta ishchilari',
    'jobs.category3.job3': 'Gipskarton ustalar',
    'jobs.category3.job4': 'Bo\'yoqchilar',
    'jobs.category3.job5': 'Suvoqchilar',
    'jobs.category3.job6': 'Fasad ishchilari va boshqa qurilish kasblari',

    'jobs.category4.title': 'Savdo sohasi',
    'jobs.category4.job1': 'Kuryer-yetkazib beruvchi',
    'jobs.category4.job2': 'Supermarket xodimlari',
    'jobs.category4.job3': 'Ombor xodimlari',

    'jobs.category5.title': 'Haydovchilar',
    'jobs.category5.job1': 'Yuk mashinasi haydovchilari',
    'jobs.category5.job2': 'Samosval haydovchilari',
    'jobs.category5.job3': 'Beton aralashtirgich haydovchilari',
    'jobs.category5.job4': 'Og\'ir texnika haydovchilari',
    'jobs.category5.job5': 'Vilkali yuk ko\'taruvchi haydovchilar',

    'jobs.filter': 'Mamlakatlar bo\'yicha filtr',
    'jobs.all': 'Barcha mamlakatlar',
    'jobs.israel': 'Isroil',
    'jobs.israel.desc': 'Parvarish, tibbiyot va qishloq xo\'jaligida ish',
    'jobs.hungary': 'Vengriya',
    'jobs.hungary.desc': 'Qurilish kompaniyalari, sanoat korxonalari',
    'jobs.bulgaria': 'Bolgariya',
    'jobs.bulgaria.desc': 'Restoran va mehmonxona biznesi, savdo',
    'jobs.czechia': 'Chexiya',
    'jobs.czechia.desc': 'Ishlab chiqarish, qurilish, sanoat',
    'jobs.russia': 'Rossiya',
    'jobs.russia.desc': 'Ishlab chiqarish, qurilish va xizmat sohasida ish',
    'jobs.croatia': 'Xorvatiya',
    'jobs.croatia.desc': 'Turizm, mehmonxona biznesi, mavsumiy ish',
    'jobs.apply': 'Ariza topshirish',
    'jobs.salary': 'Ish haqi',
    'jobs.duration': 'Davomiyligi',

    // Latest Vacancies
    'jobs.latest.title': 'Dolzarb vakansiyalar',
    'jobs.latest.russia.title': 'Rossiya',
    'jobs.latest.russia.job1': 'Elektro-gaz payvandchi',
    'jobs.latest.russia.job2': 'Armaturachi',
    'jobs.latest.russia.job3': "Ko'prik krani mashinisti (pol boshqaruvida)",
    'jobs.latest.russia.job4': 'Pult operatori',
    'jobs.latest.russia.job5': 'Yordamchi ishchi',
    'jobs.latest.russia.job6': 'Qolipchi (betonchi)',
    'jobs.latest.russia.job7': "Bezakchi-usta",
    'jobs.latest.russia.job8': 'Ishchi',
    'jobs.latest.russia.job9': 'Navbatchilik avtomobili haydovchisi',
    'jobs.latest.russia.job10': 'Forklift haydovchisi',
    'jobs.latest.russia.job11': 'Elektrokara haydovchisi',
    'jobs.latest.russia.job12': "Bosim ostidagi idishlarni nazorat qilish muhandisi (2 o'rin)",
    'jobs.latest.russia.job13': 'KIPiA muhandisi',
    'jobs.latest.russia.job14': "Yuk ko'tarish mexanizmlari mexanigi",
    'jobs.latest.russia.job15': "Yuk ko'tarish mexanizmlarini nazorat qilish muhandisi",
    'jobs.latest.russia.job16': 'Sifat nazorati muhandisi (OTK)',
    'jobs.latest.russia.job17': 'Ekolog muhandis',
    'jobs.latest.russia.job18': 'Sifat nazorati muhandisi',
    'jobs.latest.russia.job19': 'Ekolog muhandis',
    'jobs.latest.croatia.title': 'Xorvatiya',
    'jobs.latest.croatia.job1': 'Qurilish bo\'yicha umumiy mutaxassis',
    'jobs.latest.croatia.job2': 'Suvoqchilar',
    'jobs.latest.croatia.job3': 'Bo\'yoqchilar',
    'jobs.latest.israel.title': 'Isroil',
    'jobs.latest.israel.job1': 'Yuk mashinasi haydovchilari',
    'jobs.latest.israel.job2': 'Xonaki xizmatkorlar',
    'jobs.latest.israel.job3': 'Tozalovchilar',
    'jobs.latest.israel.job4': 'Ofitsiantlar',
    'jobs.latest.israel.job5': 'Mebel yig\'uvchilar va duradgorlar (zavod)',
    'jobs.latest.israel.job6': 'Alyuminiy kompozit panellar montajchisi',
    'jobs.latest.israel.job7': 'Monolit ishchisi (Bernovich texnologiyasi)',
    'jobs.latest.germany.title': 'Germaniya',
    'jobs.latest.germany.job1': 'CE toifadagi haydovchilar',

    // Job Listings
    'jobs.type.fulltime': 'To\'liq bandlik',
    'jobs.duration.12months': '12 oy',
    'jobs.duration.18months': '18 oy',
    'jobs.duration.24months': '24 oy',
    'jobs.duration.36months': '36 oy',

    // How We Work
    'howWeWork.title': 'Qanday ishlaymiz',
    'howWeWork.subtitle': 'Xorijda ishga joylashishning oddiy va tushunarli jarayoni',
    'howWeWork.goalsTitle': 'Bizning asosiy maqsadlarimiz:',
    'howWeWork.goal1': 'Kandidatlar uchun ish topishga yordam berish, ular bilan bir xil tajribalarga ega bo\'lishi kerak',
    'howWeWork.goal2': 'Dokumentlar tayyorlash va D kategoriyasidagi mehnat vizasini olishga yordam berish',
    'howWeWork.goal3': 'Xorijga chiqish uchun ishchilarga adaptatsiya kurslarini tayyorlash',
    'howWeWork.goal4': 'Faqat rasmiy qo\'llab-quvvatlash bilan ishlaymiz',
    'howWeWork.goal5': 'Rossiyalik partnerlar bilan birga rasmiy tillar kurslari va tayyorgarlik dasturlarini tayyorladik',
    'howWeWork.step1': 'Maslahat',
    'howWeWork.step1desc': 'Bepul maslahat va vakansiya tanlash',
    'howWeWork.step1.detail1': 'Telefon yoki ofisda bepul maslahat',
    'howWeWork.step1.detail2': 'Sizning ko\'nikmalaringiz va tajribangizni tahlil qilish',
    'howWeWork.step1.detail3': 'Mos vakansiyalarni tanlash',
    'howWeWork.step1.detail4': 'Ish shartlari haqida to\'liq ma\'lumot',
    'howWeWork.step2': 'Hujjatlar',
    'howWeWork.step2desc': 'Barcha kerakli hujjatlarni tayyorlash va rasmiylashtrish',
    'howWeWork.step2.detail1': 'Kerakli hujjatlarni yig\'ish',
    'howWeWork.step2.detail2': 'Tarjimа va notarial tasdiqlash',
    'howWeWork.step2.detail3': 'Ish vizasi uchun hujjatlarni topshirish',
    'howWeWork.step2.detail4': 'Tibbiy ma\'lumotnomalarni rasmiylashtirish',
    'howWeWork.step3': 'Viza',
    'howWeWork.step3desc': 'Ish vizasini olish',
    'howWeWork.step3.detail1': 'Elchixonaga tayyorgarlik',
    'howWeWork.step3.detail2': 'Suhbatda hamrohlik qilish',
    'howWeWork.step3.detail3': 'Ish vizasini olish',
    'howWeWork.step3.detail4': 'Mehnat shartnomasini rasmiylashtirish',
    'howWeWork.step4': 'Jo\'nash',
    'howWeWork.step4desc': 'Safar tashkil qilish va belgilangan mamlakatda kutib olish',
    'howWeWork.step4.detail1': 'Aviachiptalarni olishda yordam',
    'howWeWork.step4.detail2': 'Yetib kelishda kutib olish',
    'howWeWork.step4.detail3': 'Yashash joyiga hamrohlik',
    'howWeWork.step4.detail4': 'Moslashishga yordam',
    'howWeWork.timeline': 'Qayta rasmiylash muddatlari',
    'howWeWork.timeline.weeks': 'hafta',
    'howWeWork.timeline.weeksAlt': 'hafta',
    'howWeWork.timeline.months': 'oy',
    'howWeWork.timeline.docs': 'Hujjatlar tayyorlash',
    'howWeWork.timeline.visa': 'Viza olish',
    'howWeWork.timeline.total': 'Jo\'nashgacha to\'liq tsikl',
    'howWeWork.ready': 'Boshlashga tayyormisiz?',
    'howWeWork.ready.text': 'Bepul maslahat uchun yoziling va xorijda ishlash uchun birinchi qadamni qo\'ying',

    // Contact
    'contact.title': 'Aloqa',
    'contact.subtitle': 'Biz bilan qulay usulda bog\'laning',
    'contact.address': 'Manzil',
    'contact.address.value': 'Toshkent shahri, Buyuk Ipak Yo\'li dahasi, 32-uy, 3-xonadon, C-1',
    'contact.address.factual': 'Haqiqiy manzil',
    'contact.address.legal': 'Yuridik manzil',
    'contact.address.factual.value': 'Toshkent shahri, Buyuk Ipak Yo\'li dahasi, 32-uy, 3-xonadon, C-1',
    'contact.address.legal.value': 'Toshkent shahri, Yakkasaroy tumani, Belariq MFY, Toshbuloq ko\'chasi, 53-uy',
    'contact.phone': 'Telefon',
    'contact.email': 'Email',
    'contact.website': 'Veb-sayt',
    'contact.hours': 'Ish vaqti',
    'contact.hours.weekday': 'Dush-Jum: 9:00 - 18:00',
    'contact.hours.weekend': 'Shan: 10:00 - 15:00',
    'contact.location': 'Joylashuvimiz',
    'contact.form.title': 'Biz bilan bog\'laning',
    'contact.form.name': 'To\'liq ism',
    'contact.form.name.placeholder': 'Ismingizni kiriting',
    'contact.form.phone': 'Telefon',
    'contact.form.phone.placeholder': '+998 XX XXX XX XX',
    'contact.form.email': 'Email',
    'contact.form.country': 'Maqsad mamlakat',
    'contact.form.message': 'Xabar',
    'contact.form.message.placeholder': 'Xabaringizni yozing...',
    'contact.form.submit': 'Yuborish',
    'contact.form.success': 'Rahmat! So\'rovingiz yuborildi. Tez orada siz bilan bog\'lanamiz.',
    'contact.form.error': 'Yuborishda xatolik',
    'contact.form.error.text': 'Iltimos, keyinroq urinib ko\'ring yoki telefon orqali bog\'laning',
    'contact.form.sending': 'Yuborilmoqda...',

    // Application Form
    'application.form.title': 'Ariza qoldiring, biz siz bilan bog\'lanamiz',
    'application.form.fullName': 'To\'liq ism',
    'application.form.fullName.placeholder': 'Ismingizni kiriting',
    'application.form.phone': 'Telefon raqami',
    'application.form.phone.placeholder': 'Telefon raqamini kiriting',
    'application.form.desiredPosition': 'Ishga qo\'yiladigan vaziyat',
    'application.form.desiredPosition.placeholder': 'Masalan: Suvchil, Elektr (boshqarilmasa)',
    'application.form.submit': 'Ariza yuborish',
    'application.form.submitting': 'Yuborilmoqda...',
    'application.form.success.title': 'Ariza yuborildi!',
    'application.form.success.message': 'Rahmat! So\'rovingiz yuborildi. Tez orada siz bilan bog\'lanamiz.',
    'application.form.error.title': 'Yuborishda xatolik',
    'application.form.error.message': 'Iltimos, keyinroq urinib ko\'ring yoki telefon orqali bog\'laning',

    // Footer
    'footer.description': 'Ishga joylashishda ishonchli hamkor — sizning xorijdagi qonuniy ish yo\'lingiz.',
    'footer.contacts': 'Aloqa',
    'footer.address': 'Toshkent shahri, Buyuk Ipak Yo\'li dahasi, 32-uy, 3-xonadon, C-1',
    'footer.rights': '© 2024 HORIZON WORK. Barcha huquqlar himoyalangan.',
    'footer.quickLinks': 'Tezkor havolalar',

    // CTA
    'cta.ready': 'Xorijda yangi hayot boshlashga tayyormisiz?',
    'cta.consultation': 'Bugun bepul maslahat oling',

    // Meta
    'meta.title': 'HORIZON WORK - Xorijda rasmiy ishga joylashish',
    'meta.description': 'Xorijda qonuniy ishga joylashish. 5 yildan ortiq tajribaga ega litsenziyalangan agentlik.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.jobs': 'Vacancies',
    'nav.howWeWork': 'How We Work',
    'nav.contact': 'Contacts',
    'nav.legal': 'Legal Information',

    // Hero Section
    'hero.title': 'Official Employment Abroad',
    'hero.subtitle': 'A reliable partner in finding legal employment abroad.',
    'hero.agency': 'Private Employment Agency',
    'hero.overseas': 'Overseas Employment',
    'hero.welcome': 'Welcome!',
    'hero.cta': 'Find a Job',
    'hero.consultation': 'Free Consultation',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Full range of services for your successful employment abroad',
    'services.legal.title': 'Legal Employment',
    'services.legal.desc': 'Official processing of all documents and work visas',
    'services.support.title': 'Support at Every Stage',
    'services.support.desc': 'We assist candidates from application to employment',
    'services.verified.title': 'Verified Employers',
    'services.verified.desc': 'We only work with reliable companies',
    'services.housing.title': 'Employee Training and Adaptation Programs',
    'services.housing.desc': 'We organize professional adaptation and training programs for employees preparing to work abroad',

    // Mission
    'mission.title': 'Our Mission',
    'mission.text': 'HORIZON WORK helps people find decent work abroad in full compliance with the law. We guarantee transparency of the process, legal employment and support at every stage.',

    // Mehnat.uz Integration
    'mehnat.title': 'Integration with Mehnat.uz',
    'mehnat.description': 'HORIZON WORK is integrated with the state portal Mehnat.uz to ensure maximum transparency and legality in the employment process.',
    'mehnat.benefits': 'Benefits of integration:',
    'mehnat.benefit1': 'Official registration of all employment contracts',
    'mehnat.benefit2': 'Protection of workers\' rights at the state level',
    'mehnat.benefit3': 'Access to a verified database of employers',
    'mehnat.benefit4': 'Guaranteed legal employment',
    'mehnat.button': 'Go to Mehnat.uz →',

    // Location
    'location.title': 'Our Location',
    'location.address': 'Tashkent City, Buyuk Ipak Yuli District, House 32, Apartment 3, C-1',

    // About Page - Updated stats
    'about.title': 'About Company',
    'about.subtitle': 'HORIZON WORK - reliable partner in employment abroad',
    'about.license': 'License',
    'about.licenseText': 'HORIZON WORK holds an official license for overseas employment services issued by the Ministry of Employment and Poverty Reduction of the Republic of Uzbekistan.',
    'about.advantages.title': 'Our Advantages',
    'about.advantage1': 'More than 2 years on the market',
    'about.advantage1.desc': 'Successfully operating since 2022',
    'about.advantage2': 'Over 400+ successfully employed candidates',
    'about.advantage2.desc': 'Helped find employment abroad',
    'about.advantage3': '100% legal employment',
    'about.advantage3.desc': 'All documents and contracts are legal',
    'about.advantage4': 'Over 200 successfully employed candidates across various countries',
    'about.advantage4.desc': 'We assist candidates from application to employment',

    // Legal Information
    'about.legal.tin': 'TIN',
    'about.legal.tinValue': '311027133',
    'about.legal.oked': 'OKED',
    'about.legal.okedValue': '78100',
    'about.legal.address': 'Legal address',
    'about.legal.addressValue': 'Tashkent City, Yakkasaroy District, Belariq MFY, Toshbuloq Street, Building 53',

    // License Details
    'about.license.caption': 'Official License No. 297974 — Issued: 12.06.2024 — Valid indefinitely — Status: Active',
    'about.license.official': 'Officially Licensed',
    'about.license.number': 'License Number',
    'about.license.numberValue': '№297974',
    'about.license.issued': 'Issue Date',
    'about.license.issuedValue': '12.06.2024',
    'about.license.issuer': 'Issuing Authority',
    'about.license.issuerName': 'Ministry of Employment and Poverty Reduction of the Republic of Uzbekistan',
    'about.license.validity': 'Validity Period',
    'about.license.unlimited': 'Unlimited',
    'about.license.status': 'Status',
    'about.license.active': 'Active',

    // QR Code
    'about.license.qr': 'Scan the QR code to verify the license on the license.gov.uz portal',

    // Jobs Page
    'jobs.title': 'Jobs Abroad',
    'jobs.subtitle': 'Find the perfect job abroad',
    'jobs.employmentSpheres': 'Main employment sectors:',
    'jobs.employmentSphere1': 'Construction companies',
    'jobs.employmentSphere2': 'Industrial enterprises',
    'jobs.employmentSphere3': 'Restaurant and hotel business',
    'jobs.employmentSphere4': 'Trade and delivery services',
    'jobs.whoWeSeek': 'Who we are looking for?',

    // Job Categories
    'jobs.category1.title': 'Technical Specialists',
    'jobs.category1.job1': 'Welders',
    'jobs.category1.job2': 'Operators',
    'jobs.category1.job3': 'Mechanics',
    'jobs.category1.job4': 'Engineers',
    'jobs.category1.job5': 'Electricians',
    'jobs.category1.job6': 'Installation workers in various fields',

    'jobs.category2.title': 'Service Personnel',
    'jobs.category2.job1': 'Housekeepers',
    'jobs.category2.job2': 'Cook assistants',
    'jobs.category2.job3': 'Loaders',
    'jobs.category2.job4': 'Hotel and restaurant employees',
    'jobs.category2.job5': 'Cleaning Staff',

    'jobs.category3.title': 'Construction Specialists',
    'jobs.category3.job1': 'Reinforcement workers',
    'jobs.category3.job2': 'Formwork workers',
    'jobs.category3.job3': 'Drywall masters',
    'jobs.category3.job4': 'Painters',
    'jobs.category3.job5': 'Plasterers',
    'jobs.category3.job6': 'Facade workers and other construction professions',

    'jobs.category4.title': 'Retail Sector',
    'jobs.category4.job1': 'Delivery courier',
    'jobs.category4.job2': 'Supermarket employees',
    'jobs.category4.job3': 'Warehouse employees',

    'jobs.category5.title': 'Drivers',
    'jobs.category5.job1': 'Truck Drivers',
    'jobs.category5.job2': 'Samosval Drivers',
    'jobs.category5.job3': 'Concrete Mixer Drivers',
    'jobs.category5.job4': 'Heavy Equipment Operators',
    'jobs.category5.job5': 'Forklift Operators',

    'jobs.filter': 'Filter by countries',
    'jobs.all': 'All Countries',
    'jobs.israel': 'Israel',
    'jobs.israel.desc': 'Caregiving, medical and agriculture jobs',
    'jobs.hungary': 'Hungary',
    'jobs.hungary.desc': 'Construction companies, industrial enterprises',
    'jobs.bulgaria': 'Bulgaria',
    'jobs.bulgaria.desc': 'Restaurant and hotel business, trade',
    'jobs.czechia': 'Czech Republic',
    'jobs.czechia.desc': 'Manufacturing, construction, industry',
    'jobs.russia': 'Russia',
    'jobs.russia.desc': 'Manufacturing, construction and service jobs',
    'jobs.croatia': 'Croatia',
    'jobs.croatia.desc': 'Tourism, hotel business, seasonal work',
    'jobs.apply': 'Apply',
    'jobs.salary': 'Salary',
    'jobs.duration': 'Duration',

    // Latest Vacancies
    'jobs.latest.title': 'Latest Vacancies',
    'jobs.latest.russia.title': 'Russia',
    'jobs.latest.russia.job1': 'Electric-gas welder',
    'jobs.latest.russia.job2': 'Rebar worker',
    'jobs.latest.russia.job3': 'Bridge crane operator (floor-controlled)',
    'jobs.latest.russia.job4': 'Control panel operator',
    'jobs.latest.russia.job5': 'General laborer',
    'jobs.latest.russia.job6': 'Molder (concreter)',
    'jobs.latest.russia.job7': 'Finisher',
    'jobs.latest.russia.job8': 'Worker',
    'jobs.latest.russia.job9': 'Duty vehicle driver',
    'jobs.latest.russia.job10': 'Forklift operator',
    'jobs.latest.russia.job11': 'Electric cart driver',
    'jobs.latest.russia.job12': 'Pressure vessel inspection engineer (2 positions)',
    'jobs.latest.russia.job13': 'I&C Engineer',
    'jobs.latest.russia.job14': 'Lifting equipment mechanic',
    'jobs.latest.russia.job15': 'Lifting equipment inspector',
    'jobs.latest.russia.job16': 'QC Engineer (OTK)',
    'jobs.latest.russia.job17': 'Environmental engineer',
    'jobs.latest.russia.job18': 'QC Engineer',
    'jobs.latest.russia.job19': 'Environmental engineer',
    'jobs.latest.croatia.title': 'Croatia',
    'jobs.latest.croatia.job1': 'General construction worker',
    'jobs.latest.croatia.job2': 'Plasterers',
    'jobs.latest.croatia.job3': 'Painters',
    'jobs.latest.israel.title': 'Israel',
    'jobs.latest.israel.job1': 'Truck drivers',
    'jobs.latest.israel.job2': 'Housekeeping staff',
    'jobs.latest.israel.job3': 'Cleaners',
    'jobs.latest.israel.job4': 'Waiters',
    'jobs.latest.israel.job5': 'Furniture assemblers and carpenters (factory)',
    'jobs.latest.israel.job6': 'Aluminum composite panel installer',
    'jobs.latest.israel.job7': 'Monolithic concrete worker (Bernovich technology)',
    'jobs.latest.germany.title': 'Germany',
    'jobs.latest.germany.job1': 'Category CE drivers',

    // Job Listings
    'jobs.type.fulltime': 'Full-time',
    'jobs.duration.12months': '12 months',
    'jobs.duration.18months': '18 months',
    'jobs.duration.24months': '24 months',
    'jobs.duration.36months': '36 months',

    // How We Work
    'howWeWork.title': 'How We Work',
    'howWeWork.subtitle': 'Simple and clear employment process abroad',
    'howWeWork.goalsTitle': 'Our main goals:',
    'howWeWork.goal1': 'Helping candidates find jobs matching their knowledge, skills, and experience',
    'howWeWork.goal2': 'Assisting with document preparation and obtaining D-category work visa',
    'howWeWork.goal3': 'Organizing adaptation courses for departing workers',
    'howWeWork.goal4': 'Working exclusively with officially registered employers',
    'howWeWork.goal5': 'Jointly developed official language courses and preparatory programs with Russian partners',
    'howWeWork.step1': 'Consultation',
    'howWeWork.step1desc': 'Free consultation and job selection',
    'howWeWork.step1.detail1': 'Free consultation by phone or in office',
    'howWeWork.step1.detail2': 'Analysis of your skills and experience',
    'howWeWork.step1.detail3': 'Selection of suitable vacancies',
    'howWeWork.step1.detail4': 'Complete information about working conditions',
    'howWeWork.step2': 'Documents',
    'howWeWork.step2desc': 'Preparation and processing of all necessary documents',
    'howWeWork.step2.detail1': 'Collection of necessary documents',
    'howWeWork.step2.detail2': 'Translation and notarization',
    'howWeWork.step2.detail3': 'Submission of documents for work visa',
    'howWeWork.step2.detail4': 'Medical certificate processing',
    'howWeWork.step3': 'Visa',
    'howWeWork.step3desc': 'Obtaining a work visa',
    'howWeWork.step3.detail1': 'Preparation for embassy interview',
    'howWeWork.step3.detail2': 'Interview accompaniment',
    'howWeWork.step3.detail3': 'Obtaining a work visa',
    'howWeWork.step3.detail4': 'Employment contract processing',
    'howWeWork.step4': 'Departure',
    'howWeWork.step4desc': 'Travel organization and meeting in destination country',
    'howWeWork.step4.detail1': 'Assistance in purchasing airline tickets',
    'howWeWork.step4.detail2': 'Meeting at arrival airport',
    'howWeWork.step4.detail3': 'Accompaniment to accommodation',
    'howWeWork.step4.detail4': 'Assistance in adapting to new place',
    'howWeWork.timeline': 'Processing Timeline',
    'howWeWork.timeline.weeks': 'weeks',
    'howWeWork.timeline.weeksAlt': 'weeks',
    'howWeWork.timeline.months': 'months',
    'howWeWork.timeline.docs': 'Document preparation',
    'howWeWork.timeline.visa': 'Visa processing',
    'howWeWork.timeline.total': 'Full cycle before departure',
    'howWeWork.ready': 'Ready to start?',
    'howWeWork.ready.text': 'Sign up for a free consultation and we will help you take the first step towards working abroad',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Contact us in any convenient way',
    'contact.address': 'Address',
    'contact.address.value': 'Tashkent City, Buyuk Ipak Yuli District, House 32, Apartment 3',
    'contact.address.factual': 'Factual address',
    'contact.address.legal': 'Legal address',
    'contact.address.factual.value': 'Tashkent City, Buyuk Ipak Yuli District, House 32, Apartment 3, C-1',
    'contact.address.legal.value': 'Tashkent City, Yakkasaray District, Belariq Neighborhood (MFY), Toshbuloq Street, House 53',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.website': 'Website',
    'contact.hours': 'Working Hours',
    'contact.hours.weekday': 'Mon-Fri: 9:00 AM - 6:00 PM',
    'contact.hours.weekend': 'Sat: 10:00 AM - 3:00 PM',
    'contact.location': 'Our Location',
    'contact.form.title': 'Contact Us',
    'contact.form.name': 'Full Name',
    'contact.form.name.placeholder': 'Enter your full name',
    'contact.form.phone': 'Phone Number',
    'contact.form.phone.placeholder': '+998 XX XXX XX XX',
    'contact.form.email': 'Email',
    'contact.form.country': 'Destination Country',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Write your message...',
    'contact.form.submit': 'Send',
    'contact.form.success': 'Thank you! Your request has been sent successfully. We will contact you soon.',
    'contact.form.error': 'Sending error',
    'contact.form.error.text': 'Please try again later or contact us by phone',
    'contact.form.sending': 'Sending...',

    // Application Form
    'application.form.title': 'Leave a request and we will contact you',
    'application.form.fullName': 'Full Name',
    'application.form.fullName.placeholder': 'Enter your full name',
    'application.form.phone': 'Phone number',
    'application.form.phone.placeholder': '+998 XX XXX XX XX',
    'application.form.desiredPosition': 'Desired Position',
    'application.form.desiredPosition.placeholder': 'For example: Welder, Electrician (optional)',
    'application.form.submit': 'Submit Application',
    'application.form.submitting': 'Sending...',
    'application.form.success.title': 'Application submitted successfully!',
    'application.form.success.message': 'Thank you! Your request has been sent successfully. We will contact you soon.',
    'application.form.error.title': 'Sending error',
    'application.form.error.message': 'Please try again later or contact us by phone',

    // Footer
    'footer.description': 'Your reliable partner in finding legal employment abroad.',
    'footer.contacts': 'Contact',
    'footer.address': 'Tashkent City, Buyuk Ipak Yuli District, House 32, Apartment 3, C-1',
    'footer.rights': '© 2024 HORIZON WORK. All rights reserved.',
    'footer.quickLinks': 'Quick Links',

    // CTA
    'cta.ready': 'Ready to start a new life abroad?',
    'cta.consultation': 'Get a free consultation today',

    // Meta
    'meta.title': 'HORIZON WORK - Official Employment Abroad',
    'meta.description': 'Legal employment abroad. Licensed agency with over 5 years of experience.'
  }
};

export function LanguageProvider({ children }: {children: React.ReactNode;}) {
  const [language, setLanguage] = useState<Language>('ru');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'ru' || saved === 'uz' || saved === 'en')) {
      setLanguage(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ru')) {
        setLanguage('ru');
      } else if (browserLang.startsWith('uz')) {
        setLanguage('uz');
      } else if (browserLang.startsWith('en')) {
        setLanguage('en');
      } else {
        // Default to Russian
        setLanguage('ru');
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Don't render until language is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
