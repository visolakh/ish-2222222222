"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HowWeWorkPage() {
  const { t } = useLanguage();

  const goals = [
    t('howWeWork.goal1'),
    t('howWeWork.goal2'),
    t('howWeWork.goal3'),
    t('howWeWork.goal4'),
    t('howWeWork.goal5'),
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] to-[#1a1a1a] pointer-events-none" style={{ zIndex: -1 }} />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#FFD347]">
              {t('howWeWork.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              {t('howWeWork.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 sm:py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000] pointer-events-none" style={{ zIndex: -1 }} />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-[#FFD347]">
            {t('howWeWork.goalsTitle')}
          </h2>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-white">
            {goals.map((goal, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-2xl sm:text-3xl flex-shrink-0 text-[#FF7A00]">✔</span>
                <span className="text-base sm:text-lg leading-relaxed pt-1">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}