"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Sparkles, HardHat, ShoppingCart, Truck } from 'lucide-react';
import { ApplicationForm } from '@/components/ApplicationForm';
import { useLanguage } from '@/contexts/LanguageContext';

export default function JobsPage() {
  const { t } = useLanguage();

  // -----------------------------
  // 1) Категории отраслей (сверху)
  // -----------------------------
  const jobCategories = [
    {
      title: t('jobs.category1.title'),
      icon: Wrench,
      iconColor: 'text-[#FF7A00]',
      bgColor: 'bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10',
      jobs: [
        t('jobs.category1.job1'),
        t('jobs.category1.job2'),
        t('jobs.category1.job3'),
        t('jobs.category1.job4'),
        t('jobs.category1.job5'),
        t('jobs.category1.job6'),
      ],
    },
    {
      title: t('jobs.category2.title'),
      icon: Sparkles,
      iconColor: 'text-[#FFD347]',
      bgColor: 'bg-gradient-to-br from-[#FFD347]/10 to-[#FFB347]/10',
      jobs: [
        t('jobs.category2.job1'),
        t('jobs.category2.job2'),
        t('jobs.category2.job3'),
        t('jobs.category2.job4'),
        t('jobs.category2.job5'),
      ],
    },
    {
      title: t('jobs.category3.title'),
      icon: HardHat,
      iconColor: 'text-[#FF7A00]',
      bgColor: 'bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10',
      jobs: [
        t('jobs.category3.job1'),
        t('jobs.category3.job2'),
        t('jobs.category3.job3'),
        t('jobs.category3.job4'),
        t('jobs.category3.job5'),
        t('jobs.category3.job6'),
      ],
    },
    {
      title: t('jobs.category4.title'),
      icon: ShoppingCart,
      iconColor: 'text-[#FFD347]',
      bgColor: 'bg-gradient-to-br from-[#FFD347]/10 to-[#FFB347]/10',
      jobs: [
        t('jobs.category4.job1'),
        t('jobs.category4.job2'),
        t('jobs.category4.job3'),
      ],
    },
    {
      title: t('jobs.category5.title'),
      icon: Truck,
      iconColor: 'text-[#FF7A00]',
      bgColor: 'bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10',
      jobs: [
        t('jobs.category5.job1'),
        t('jobs.category5.job2'),
        t('jobs.category5.job3'),
        t('jobs.category5.job4'),
        t('jobs.category5.job5'),
      ],
    },
  ];

  // -----------------------------
  // 2) Вакансии по странам (ниже)
  // -----------------------------
  type Vacancy = {
    dept?: string;
    title: string;
    salary?: string;
    conditions?: string[];
    requirements?: string[];
    documents?: string[];
    notes?: string[];
  };

  type VacanciesByCountry = Record<string, Vacancy[]>;

  const vacanciesByCountry: VacanciesByCountry = {
    [t('jobs.latest.russia.title')]: [
      { dept: 'Цех арматурно-сварочных работ', title: t('jobs.latest.russia.job1'), salary: '2400 $/мес' },
      { dept: 'Цех арматурно-сварочных работ', title: t('jobs.latest.russia.job2'), salary: '2250 $' },
      { dept: 'Цех арматурно-сварочных работ', title: t('jobs.latest.russia.job3'), salary: '2400 $' },
      { dept: 'Цех арматурно-сварочных работ', title: t('jobs.latest.russia.job4'), salary: '2600 $' },
      { dept: 'Цех арматурно-сварочных работ', title: t('jobs.latest.russia.job5'), salary: '2100 $' },

      { dept: 'Цех железобетонных изделий', title: t('jobs.latest.russia.job6'), salary: '2250 $' },
      { dept: 'Цех железобетонных изделий', title: t('jobs.latest.russia.job7'), salary: '2250 $' },
      { dept: 'Цех железобетонных изделий', title: t('jobs.latest.russia.job8'), salary: '2400 $' },
      { dept: 'Цех железобетонных изделий', title: t('jobs.latest.russia.job9'), salary: '2600 $' },
      { dept: 'Цех железобетонных изделий', title: t('jobs.latest.russia.job10'), salary: '1974 $' },

      { dept: 'Автотранспортный отдел', title: t('jobs.latest.russia.job11'), salary: '2100 $' },
      { dept: 'Автотранспортный отдел', title: t('jobs.latest.russia.job12'), salary: '2400 $' },
      { dept: 'Автотранспортный отдел', title: t('jobs.latest.russia.job13'), salary: '2100 $' },

      { dept: 'Отдел главного энергетика', title: t('jobs.latest.russia.job14'), salary: '2700 $' },
      { dept: 'Отдел главного энергетика', title: t('jobs.latest.russia.job15'), salary: '3100 $' },

      { dept: 'Отдел главного механика', title: t('jobs.latest.russia.job16'), salary: '3500 $' },
      { dept: 'Отдел главного механика', title: t('jobs.latest.russia.job17'), salary: '2700 $' },

      { dept: 'Отдел контроля качества', title: t('jobs.latest.russia.job18'), salary: '2700 $' },

      { dept: 'ОТ и ПБ', title: t('jobs.latest.russia.job19'), salary: '3624 $' },
    ],

    [t('jobs.latest.croatia.title')]: [
      {
        title: t('jobs.latest.croatia.job1'),
        salary: '€1300 → до €1600; +50% сверхурочные',
        conditions: ['07:00–17:00', '1 выходной: Yakshanba', 'Проживание предоставляется', '1-разовое питание', 'Медстраховка', 'Трудовой договор'],
        requirements: ['Опыт обязателен', 'Разговорный русский', 'Отбор — онлайн видео'],
        documents: ['Загранпаспорт', 'Аттестат/колледж диплом', 'Справка о несудимости (RU, с печатью)'],
      },
      {
        title: t('jobs.latest.croatia.job2'),
        salary: '€1300 → до €1600; +50% сверхурочные',
        conditions: ['07:00–17:00', '1 выходной: Yakshanba', 'Проживание предоставляется', '1-разовое питание', 'Медстраховка', 'Трудовой договор'],
        requirements: ['Опыт обязателен', 'Разговорный русский', 'Отбор — онлайн видео'],
      },
      {
        title: t('jobs.latest.croatia.job3'),
        salary: '€1300 → до €1600; +50% сверхурочные',
      },
    ],

    [t('jobs.latest.israel.title')]: [
      {
        title: t('jobs.latest.israel.job1'),
      },
      {
        title: t('jobs.latest.israel.job2'),
        salary: '35 шек/час',
      },
      {
        title: t('jobs.latest.israel.job3'),
        salary: '35 шек/час',
      },
      {
        title: t('jobs.latest.israel.job4'),
        salary: '35 шек/час',
      },
      {
        title: t('jobs.latest.israel.job5'),
        salary: '11 000 шек/мес (~$3270)',
      },
      {
        title: t('jobs.latest.israel.job6'),
        salary: '35 шек/час (брутто)',
      },
      {
        title: t('jobs.latest.israel.job7'),
      },
    ],

    [t('jobs.latest.germany.title')]: [
      {
        title: t('jobs.latest.germany.job1'),
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#000000] to-[#1a1a1a] pointer-events-none"
          style={{ zIndex: -1 }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#FFD347]">
              {t('jobs.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/80">{t('jobs.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Employment Spheres Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-6">
              {t('jobs.employmentSpheres')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#FF7A00] mt-1 flex-shrink-0">•</span>
                <span className="text-base sm:text-lg text-gray-700">{t('jobs.employmentSphere1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF7A00] mt-1 flex-shrink-0">•</span>
                <span className="text-base sm:text-lg text-gray-700">{t('jobs.employmentSphere2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF7A00] mt-1 flex-shrink-0">•</span>
                <span className="text-base sm:text-lg text-gray-700">{t('jobs.employmentSphere3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF7A00] mt-1 flex-shrink-0">•</span>
                <span className="text-base sm:text-lg text-gray-700">{t('jobs.employmentSphere4')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CATEGORIES (сверху) */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-4">
              {t('jobs.whoWeSeek')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {jobCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-[#FFD347]/30">
                  <CardHeader>
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${category.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-center text-[#000000]">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.jobs.map((job, jobIndex) => (
                        <li key={jobIndex} className="flex items-start gap-3">
                          <span className="text-[#FF7A00] mt-1 flex-shrink-0">✓</span>
                          <span className="text-base text-gray-700">{job}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* COUNTRIES (ниже) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-4">
              {t('jobs.latest.title')}
            </h2>
          </div>

          {/* Helper: флаги для стран */}
          {(() => {
            const flagOf: Record<string, string> = {
              [t('jobs.latest.russia.title')]: '🇷🇺',
              [t('jobs.latest.croatia.title')]: '🇭🇷',
              [t('jobs.latest.israel.title')]: '🇮🇱',
              [t('jobs.latest.germany.title')]: '🇩🇪',
            };

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {Object.entries(vacanciesByCountry).map(([country, vacs]) => (
                  <Card key={country} className="hover:shadow-lg transition-shadow border-[#FFD347]/30">
                    <CardHeader>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFD347]/10 to-[#FFB347]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl sm:text-4xl" aria-hidden>
                          {flagOf[country] || '🌍'}
                        </span>
                      </div>
                      <CardTitle className="text-xl sm:text-2xl text-center text-[#000000]">
                        {country}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {vacs.map((vac, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#FF7A00] mt-1 flex-shrink-0">•</span>
                            <span className="text-base text-gray-700">{vac.title}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Application Form Section */}
      <ApplicationForm />


  






      {/* YouTube Shorts video section */}
<div className="max-w-[900px] mx-auto my-12 p-4 bg-white rounded-2xl shadow-md">
  {/* Заголовок с переводом */}
  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
    {t('jobs.video.title')}
  </h3>

  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
    {/* iframe с переводом в title */}
    <iframe
      src="https://www.youtube.com/embed/kV-8-514AZI?rel=0"
      title={t('jobs.video.title')}
      className="absolute top-0 left-0 w-full h-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</div>





      <Footer />
    </div>
  );
}
