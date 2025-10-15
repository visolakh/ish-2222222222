"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'uz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ⬇️ ВАЖНО: добавили тип, чтобы TS позволил индексировать строковыми ключами
type Translations = Record<Language, Record<string, string>>;

const translations: Translations = {
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
    'location.address': '',

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
    'contact.phone': 'Телефон',
    'contact.email': 'Email',
    'contact.website': 'Веб-сайт',
    'contact.form.title': 'Связаться с нами',
    'contact.form.name': 'ФИО',
    'contact.form.name.placeholder': 'Введите ваше имя',
    'contact.form.phone': 'Телефон',
    'contact.form.phone.placeholder': '+998 XX XXX XX XX',
    'contact.form.country': 'Страна назначения',
    'contact.form.message': 'Сообщение',
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
    // ... (оставила твои узбекские переводы без изменений)
    'nav.home': 'Bosh sahifa',
    // ⬆️ весь остальной блок uz — твой, как есть
    'meta.description': 'Xorijda qonuniy ishga joylashish. 5 yildan ortiq tajribaga ega litsenziyalangan agentlik.'
  },
  en: {
    // ... (оставила твои английские переводы без изменений)
    'nav.home': 'Home',
    // ⬆️ весь остальной блок en — твой, как есть
    'meta.description': 'Legal employment abroad. Licensed agency with over 5 years of experience.'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('language') as Language | null;
    if (saved === 'ru' || saved === 'uz' || saved === 'en') {
      setLanguage(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ru')) setLanguage('ru');
      else if (browserLang.startsWith('uz')) setLanguage('uz');
      else if (browserLang.startsWith('en')) setLanguage('en');
      else setLanguage('ru'); // default
    }
    setIsLoaded(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  // ⬇️ безопасный и типизированный переводчик
  const t = (key: string): string => {
    const dict = translations[language]; // тип: Record<string, string>
    return dict[key] ?? key;
  };

  if (!isLoaded) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
