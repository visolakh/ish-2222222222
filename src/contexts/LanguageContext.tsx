// src/contexts/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ru" | "uz" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type Translations = Record<Language, Record<string, string>>;

const translations: Translations = {
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.jobs": "Вакансии",
    "nav.howWeWork": "Наши услуги",
    "nav.contact": "Контакты",
    "nav.legal": "Правовая информация",

    // Hero Section
    "hero.title": "Официальное трудоустройство за рубежом",
    "hero.subtitle": "Надёжный партнёр в поиске легальной работы за рубежом.",
    "hero.agency": "Агентство Частной Занятости",
    "hero.overseas": "Трудоустройство за рубежом",
    "hero.welcome": "Добро пожаловать!",
    "hero.cta": "Подобрать вакансию",
    "hero.consultation": "Бесплатная консультация",

    // Services
    "services.title": "Наши услуги",
    "services.subtitle": "Полный комплекс поддержки для успешного трудоустройства за рубежом",
    "services.legal.title": "Официальное трудоустройство",
    "services.legal.desc": "Оформление документов и рабочих виз в соответствии с законодательством",
    "services.support.title": "Сопровождение на всех этапах",
    "services.support.desc": "Помогаем кандидатам от подачи заявки до начала работы",
    "services.verified.title": "Проверенные работодатели",
    "services.verified.desc": "Сотрудничаем только с проверенными и надёжными компаниями",
    "services.housing.title": "Программы адаптации и подготовки",
    "services.housing.desc": "Организуем профессиональную подготовку и адаптацию сотрудников перед выездом за рубеж",

    // Services page
    "servicesPage.title": "Наши услуги и работа с клиентами",
    "servicesPage.intro": "Мы предоставляем профессиональную поддержку на каждом этапе трудоустройства за рубежом.",
    "servicesPage.services.social.title": "Информационные медиа и отчётность",
    "servicesPage.services.social.desc": "Ведём прозрачную коммуникацию с клиентами через официальные социальные сети, публикуем реальные результаты и отчёты о проделанной работе.",
    "servicesPage.services.consult.title": "Профессиональные консультации",
    "servicesPage.services.consult.desc": "Проводим индивидуальные консультации, помогаем подобрать подходящую вакансию и даём честную оценку требований и условий работы за рубежом.",
    "servicesPage.services.fairs.title": "Отборочные туры и ярмарки вакансий",
    "servicesPage.services.fairs.desc": "Организуем и участвуем в официальных отборочных мероприятиях, практических экзаменах и собеседованиях с зарубежными работодателями.",
    "servicesPage.services.docs.title": "Оформление документов",
    "servicesPage.services.docs.desc": "Подготавливаем анкеты, резюме, трудовые договоры и весь пакет необходимых документов для легального трудоустройства.",
    "servicesPage.services.adapt.title": "Курсы адаптации и подготовки",
    "servicesPage.services.adapt.desc": "Готовим кандидатов к жизни и работе за границей: обучаем правилам безопасности, трудовой дисциплине и социальной адаптации.",
    "servicesPage.services.russian.title": "Курсы русского языка",
    "servicesPage.services.russian.desc": "Обучаем языку для прохождения собеседований, сдачи тестов и успешной коммуникации на рабочем месте.",
    "servicesPage.services.tickets.title": "Организация выезда",
    "servicesPage.services.tickets.desc": "Помогаем с перелётом, трансфером, бронированием и координацией поездки до места трудоустройства.",

    // Services → video block
    "servicesPage.video2.title": "Сопровождение кандидатов",
    "servicesPage.video2.subtitle": "Поддерживаем на каждом этапе выезда и трудоустройства",
    "servicesPage.videoBlock.title": "Как мы работаем на практике",
    "servicesPage.videoBlock.subtitle": "Реальный процесс отбора и сопровождения кандидатов",

    // Mission
    "mission.title": "Наша миссия",
    "mission.text":
      "HORIZON WORK помогает людям найти достойную работу за рубежом с полным соблюдением законодательства. Мы гарантируем прозрачность процесса, легальное трудоустройство и поддержку на каждом этапе.",

    // Mehnat.uz Integration
    "mehnat.title": "Интеграция с Mehnat.uz",
    "mehnat.description":
      "HORIZON WORK интегрирован с государственным порталом Mehnat.uz для обеспечения максимальной прозрачности и легальности процесса трудоустройства.",
    "mehnat.benefits": "Преимущества интеграции:",
    "mehnat.benefit1": "Официальная регистрация всех трудовых контрактов",
    "mehnat.benefit2": "Защита прав работников на государственном уровне",
    "mehnat.benefit3": "Доступ к базе проверенных работодателей",
    "mehnat.benefit4": "Гарантированная легальность трудоустройства",
    "mehnat.button": "Перейти на Mehnat.uz →",

    // Location
    "location.title": "Наше местоположение",
    "location.address": "г. Ташкент, махалля Буюк Ипак Йўли, дом 32, квартира 3, Ц-1",

    // About → video block
    "about.video.title": "Участие в ярмарке вакансий",
    "about.video.subtitle": "Наша компания открыто участвует в государственных и региональных программах по трудоустройству.",

    // About Page - Updated stats
    "about.title": "О компании",
    "about.subtitle": "HORIZON WORK - надежный партнер в трудоустройстве за рубежом",
    "about.license": "Лицензия",
    "about.licenseText":
      "HORIZON WORK имеет официальную лицензию на трудоустройство граждан за рубежом, выданную Министерством занятости и сокращения бедности Республики Узбекистан.",
    "about.advantages.title": "Наши преимущества",
    "about.advantage1": "Более 2 лет на рынке",
    "about.advantage1.desc": "Успешно работаем с 2022 года",
    "about.advantage2": "Более 400 устроенных кандидатов",
    "about.advantage2.desc": "Помогли найти работу за рубежом",
    "about.advantage3": "100% легальное трудоустройство",
    "about.advantage3.desc": "Все документы и контракты легальны",
    "about.advantage4": "Более 200 трудоустроенных кандидатов в разных странах",
    "about.advantage4.desc": "Мы помогаем кандидатам от подачи заявки до трудоустройства",

    // Values Section (single, non-duplicated block)
    "about.values.title": "Наши ценности",
    "about.values.item1.title": "Прозрачность",
    "about.values.item1.desc":
      "Открыто предоставляем информацию о вакансиях, условиях и работодателях. Работаем честно и официально.",
    "about.values.item2.title": "Ответственность",
    "about.values.item2.desc":
      "Отвечаем за каждый этап процесса и выполняем обязательства перед кандидатами и партнёрами.",
    "about.values.item3.title": "Поддержка",
    "about.values.item3.desc":
      "Сопровождаем кандидатов от консультации до полного трудоустройства за рубежом.",
    "about.values.item4.title": "Надежность",
    "about.values.item4.desc":
      "Работаем только с проверенными работодателями и партнёрами. Все процессы оформляются официально.",

    // Legal Information
    "about.legal.tin": "ИНН",
    "about.legal.tinValue": "311027133",
    "about.legal.oked": "ОКЭД",
    "about.legal.okedValue": "78100",
    "about.legal.address": "Юридический адрес",
    "about.legal.addressValue": "г. Ташкент, Яккасарайский район, Belariq МФЙ, улица Тошбулоқ, дом 53",

    // License Details
    "about.license.caption":
      "Лицензия № 297974 — Выдана: 12.06.2024 — Срок действия: бессрочная — Статус: активна",
    "about.license.official": "Официально лицензировано",
    "about.license.number": "Номер лицензии",
    "about.license.numberValue": "№297974",
    "about.license.issued": "Дата выдачи",
    "about.license.issuedValue": "12.06.2024",
    "about.license.issuer": "Орган, выдавший лицензию",
    "about.license.issuerName":
      "Министерство занятости и сокращения бедности Республики Узбекистан",
    "about.license.validity": "Срок действия",
    "about.license.unlimited": "Бессрочная",
    "about.license.status": "Статус",
    "about.license.active": "Активна",
    "about.license.qr": "Отсканируйте QR-код, чтобы проверить лицензию на портале license.gov.uz",

    // Jobs Page and others (kept unique)
    "jobs.title": "Вакансии за рубежом",
    "jobs.subtitle": "Найдите идеальную работу за рубежом",
    "jobs.employmentSpheres": "Основные сферы трудоустройства:",
    "jobs.employmentSphere1": "Строительные компании",
    "jobs.employmentSphere2": "Промышленные предприятия",
    "jobs.employmentSphere3": "Ресторанный и гостиничный бизнес",
    "jobs.employmentSphere4": "Торговля и службы доставки",
    "jobs.whoWeSeek": "Кого мы ищем?",
    "jobs.apply": "Подать заявку",
    "jobs.salary": "Заработная плата",
    "jobs.duration": "Продолжительность",

    // Latest Vacancies (abbreviated example)
    "jobs.latest.title": "Актуальные вакансии",

    // Video Title
    "jobs.video.title": "Онлайн-собеседование: процесс оформления на работу в Израиль",

    // Contact
    "contact.title": "Контакты",
    "contact.subtitle": "Свяжитесь с нами любым удобным способом",
    "contact.address": "Адрес",
    "contact.address.value": "г. Ташкент, махалля Буюк Ипак Йўли, дом 32, квартира 3, Ц-1",
    "contact.form.title": "Связаться с нами",
    "contact.form.name": "ФИО",
    "contact.form.phone": "Телефон",
    "contact.form.submit": "Отправить",

    // Application Form & Modal
    "application.form.title": "Оставьте заявку, и мы свяжемся с вами",
    "modal.apply.title": "Подать заявку",

    // Footer / CTA / Meta
    "footer.description": "Надёжный партнёр в поиске легальной работы за рубежом.",
    "cta.ready": "Готовы начать новую жизнь за рубежом?",
    "meta.title": "HORIZON WORK - Официальное трудоустройство за рубежом",
    "meta.description": "Официальное трудоустройство за рубежом. Агентство с более чем 5-летним опытом.",
  },

  uz: {
    // Navigation
    "nav.home": "Bosh sahifa",
    "nav.about": "Biz haqimizda",
    "nav.jobs": "Bo'sh ish o'rinlari",
    "nav.howWeWork": "Qanday ishlaymiz",
    "nav.contact": "Aloqa",
    "nav.legal": "Huquqiy ma'lumot",

    // Hero
    "hero.title": "Xorijda rasmiy ishga joylashish",
    "hero.subtitle": "Chet elda qonuniy ish topishda ishonchli hamkor.",
    "hero.agency": "Xususiy Bandlik Agentligi",
    "hero.overseas": "Chet elda ishga joylashish",
    "hero.welcome": "Xush kelibsiz!",
    "hero.cta": "Vakansiya tanlash",
    "hero.consultation": "Bepul maslahat",

    // Services (kept unique)
    "services.title": "Xizmatlarimiz",
    "services.subtitle": "Chet elda muvaffaqiyatli ishga joylashish uchun to'liq qo'llab-quvvatlash",
    "services.legal.title": "Rasmiy ishga joylashish",
    "services.legal.desc": "Hujjatlar va ishchi vizalarni qonuniy rasmiylashtirish",
    "services.support.title": "Har bir bosqichda yordam",
    "services.support.desc": "Ariza topshirishdan ish boshlashgacha nomzodlarga yordam beramiz",
    "services.verified.title": "Ishonchli ish beruvchilar",
    "services.verified.desc": "Faqat ishonchli va tekshirilgan kompaniyalar bilan hamkorlik qilamiz",
    "services.housing.title": "Moslashuv va tayyorlov dasturlari",
    "services.housing.desc":
      "Xorijda ishlashga ketayotgan xodimlar uchun tayyorgarlik va moslashuv dasturlarini tashkil etamiz",

    // Mission
    "mission.title": "Bizning missiyamiz",
    "mission.text":
      "HORIZON WORK odamlarga qonunchilikka to'liq rioya qilgan holda xorijda munosib ish topishda yordam beradi. Biz jarayonning shaffofligini, qonuniy ishga joylashishni va har bosqichda qo'llab-quvvatlashni kafolatlaymiz.",

    // Values (single block)
    "about.values.title": "Bizning qadriyatlarimiz",
    "about.values.item1.title": "Shaffoflik",
    "about.values.item1.desc":
      "Vakansiyalar, ish shartlari va ish beruvchilar haqida aniq va ishonchli ma'lumot beramiz. Ish jarayoni ochiq va halol olib boriladi.",
    "about.values.item2.title": "Mas'uliyat",
    "about.values.item2.desc":
      "Nomzodlar va hamkorlar oldidagi majburiyatlarimizni to'liq bajarishga intilamiz.",
    "about.values.item3.title": "Qo'llab-quvvatlash",
    "about.values.item3.desc":
      "Nomzodlarni dastlabki maslahatdan tortib to chet elda ish boshlashigacha hamroh bo'lamiz.",
    "about.values.item4.title": "Ishonchlilik",
    "about.values.item4.desc":
      "Faqat tekshirilgan ish beruvchilar bilan ishlaymiz va qonuniylikka qat'iy amal qilamiz.",

    // Jobs
    "jobs.title": "Xorijdagi vakansiyalar",
    "jobs.subtitle": "Xorijda ideal ish toping",

    // Video Title
    "jobs.video.title": "Onlayn suhbat: Isroilda ishga joylashish jarayoni",

    // Misc
    "contact.title": "Aloqa",
    "contact.form.title": "Biz bilan bog'laning",
    "application.form.title": "Ariza qoldiring, biz siz bilan bog'lanamiz",
    "modal.apply.title": "Ariza topshirish",
    "footer.description": "Ishga joylashishda ishonchli hamkor — sizning xorijdagi qonuniy ish yo'lingiz.",
    "meta.title": "HORIZON WORK - Xorijda rasmiy ishga joylashish",
  },

  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.jobs": "Vacancies",
    "nav.howWeWork": "How We Work",
    "nav.contact": "Contacts",
    "nav.legal": "Legal Information",

    // Hero
    "hero.title": "Official Employment Abroad",
    "hero.subtitle": "A reliable partner in finding legal employment abroad.",
    "hero.agency": "Private Employment Agency",
    "hero.overseas": "Overseas Employment",
    "hero.welcome": "Welcome!",
    "hero.cta": "Find a Job",
    "hero.consultation": "Free Consultation",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Full range of services for your successful employment abroad",
    "services.legal.title": "Legal Employment",
    "services.legal.desc": "Official processing of all documents and work visas",
    "services.support.title": "Support at Every Stage",
    "services.support.desc": "We assist candidates from application to employment",
    "services.verified.title": "Verified Employers",
    "services.verified.desc": "We only work with reliable companies",
    "services.housing.title": "Employee Training and Adaptation Programs",
    "services.housing.desc":
      "We organize professional adaptation and training programs for employees preparing to work abroad",

    // Mission
    "mission.title": "Our Mission",
    "mission.text":
      "HORIZON WORK helps people find decent work abroad in full compliance with the law. We guarantee transparency of the process, legal employment and support at every stage.",

    // Values (single block)
    "about.values.title": "Our Values",
    "about.values.item1.title": "Transparency",
    "about.values.item1.desc":
      "We provide clear and reliable information about jobs, conditions, and employers. All processes are open and honest.",
    "about.values.item2.title": "Responsibility",
    "about.values.item2.desc":
      "We fulfill our commitments to candidates and partners at every stage of cooperation.",
    "about.values.item3.title": "Support",
    "about.values.item3.desc":
      "We support candidates from the first consultation to official employment abroad.",
    "about.values.item4.title": "Reliability",
    "about.values.item4.desc":
      "We work only with verified employers and strictly follow legal requirements.",

    // Jobs
    "jobs.title": "Jobs Abroad",
    "jobs.subtitle": "Find the perfect job abroad",

    // Video Title
    "jobs.video.title": "Online interview: the process of getting a job in Israel",

    // Misc
    "contact.title": "Contact",
    "contact.form.title": "Contact Us",
    "application.form.title": "Leave a request and we will contact you",
    "modal.apply.title": "Apply",
    "footer.description": "Your reliable partner in finding legal employment abroad.",
    "meta.title": "HORIZON WORK - Official Employment Abroad",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Защита: window/localStorage доступны только на клиенте
    if (typeof window === "undefined") {
      setIsLoaded(true);
      return;
    }

    const saved = (localStorage.getItem("language") as Language | null) ?? null;
    if (saved && (saved === "ru" || saved === "uz" || saved === "en")) {
      setLanguage(saved);
    } else {
      const browserLang = (navigator.language || navigator.userLanguage || "ru").toLowerCase();
      if (browserLang.startsWith("ru")) {
        setLanguage("ru");
      } else if (browserLang.startsWith("uz")) {
        setLanguage("uz");
      } else if (browserLang.startsWith("en")) {
        setLanguage("en");
      } else {
        setLanguage("ru");
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    const dict = translations[language] ?? {};
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
