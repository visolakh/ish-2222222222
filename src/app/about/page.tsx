"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] to-[#1a1a1a] pointer-events-none" style={{ zIndex: -1 }} />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#FFD347]">
              {t('about.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* About Company Section - Plain Text */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-6">
                  {t('about.advantages.title')}
                </h2>
                
                <ul className="space-y-4 text-base sm:text-lg text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF7A00] mt-1 flex-shrink-0 font-bold">✓</span>
                    <span><strong>{t('about.advantage1')}</strong> — {t('about.advantage1.desc')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF7A00] mt-1 flex-shrink-0 font-bold">✓</span>
                    <span><strong>{t('about.advantage2')}</strong> — {t('about.advantage2.desc')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF7A00] mt-1 flex-shrink-0 font-bold">✓</span>
                    <span><strong>{t('about.advantage3')}</strong> — {t('about.advantage3.desc')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Section - Plain Text with License Image */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-6 text-center">
              {t('about.license')}
            </h2>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              {t('about.licenseText')}
            </p>
            
            <Card className="border-2 border-[#FFD347]/50 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-2xl rounded-lg overflow-hidden border-2 border-[#FFD347]/30 shadow-lg">
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/_page-0001-1760118772882.jpg"
                      alt={t('about.license')}
                      width={800}
                      height={1131}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement - Plain Text */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-4 sm:mb-6">
              {t('mission.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {t('mission.text')}
            </p>
          </div>
        </div>
      </section>

      {/* Company Legal Information Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-[#FFD347]/30">
                  <p className="text-sm text-[#000000]/60 mb-1">{t('about.legal.tin')}</p>
                  <p className="text-lg font-semibold text-[#000000]">{t('about.legal.tinValue')}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-[#FFD347]/30">
                  <p className="text-sm text-[#000000]/60 mb-1">{t('about.legal.oked')}</p>
                  <p className="text-lg font-semibold text-[#000000]">{t('about.legal.okedValue')}</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-[#FFD347]/30">
                <p className="text-sm text-[#000000]/60 mb-2">{t('about.legal.address')}</p>
                <p className="text-base font-medium text-[#000000]">{t('about.legal.addressValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}