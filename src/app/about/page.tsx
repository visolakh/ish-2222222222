"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Eye,
  Award,
  Users,
  ShieldCheck,
  Shield,
  CheckCircle,
  FileCheck,
} from 'lucide-react';

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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#000000] mb-8 leading-snug">
              {t('about.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-4">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 - Прозрачность */}
            <Card className="border-2 border-[#FFD347]/30 hover:border-[#FF7A00] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#000000] mb-3">
                  {t('about.values.item1.title')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('about.values.item1.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Value 2 - Ответственность */}
            <Card className="border-2 border-[#FFD347]/30 hover:border-[#FF7A00] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#000000] mb-3">
                  {t('about.values.item2.title')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('about.values.item2.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Value 3 - Поддержка */}
            <Card className="border-2 border-[#FFD347]/30 hover:border-[#FF7A00] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#000000] mb-3">
                  {t('about.values.item3.title')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('about.values.item3.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Value 4 - Надежность */}
            <Card className="border-2 border-[#FFD347]/30 hover:border-[#FF7A00] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#000000] mb-3">
                  {t('about.values.item4.title')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('about.values.item4.desc')}
                </p>
              </CardContent>
            </Card>
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

      {/* Mehnat.uz Integration Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#FF7A00]" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#000000] tracking-tight">
                  {t('mehnat.title')}
                </h2>
              </div>
              <p className="text-base sm:text-lg text-[#000000]/70 font-light leading-relaxed">
                {t('mehnat.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8E7] to-white border-2 border-[#FFD347]/30 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#000000] mb-6">
                {t('mehnat.benefits')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                  <span className="text-[#000000]/80 leading-relaxed">{t('mehnat.benefit1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                  <span className="text-[#000000]/80 leading-relaxed">{t('mehnat.benefit2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                  <span className="text-[#000000]/80 leading-relaxed">{t('mehnat.benefit3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                  <span className="text-[#000000]/80 leading-relaxed">{t('mehnat.benefit4')}</span>
                </li>
              </ul>
              
              <div className="mt-8 text-center">
                <a
                  href="https://mehnat.uz"
                  target="_blank"
                  rel="noopener noreferrer">

                  <Button className="bg-gradient-to-r from-[#FF7A00] to-[#FFB347] hover:from-[#FF7A00]/90 hover:to-[#FFB347]/90 text-white rounded-lg transition-all duration-300 font-medium text-sm sm:text-base px-6 py-5 border-none">
                    {t('mehnat.button')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileCheck className="w-8 h-8 text-[#FF7A00]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#000000] tracking-tight">
                {t('about.license')}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#000000]/70 font-light leading-relaxed max-w-3xl mx-auto">
              {t('about.license.official')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-[#FFD347]/50 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col items-center">
                  {/* License Image */}
                  <div className="w-full max-w-2xl rounded-lg overflow-hidden border-2 border-[#FFD347]/30 shadow-lg">
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/_page-0001-1760118394562.jpg"
                      alt={t('about.license')}
                      width={800}
                      height={1131}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

 {/* Video block */}
<section className="px-4 pb-20">
  <div className="max-w-[1280px] mx-auto text-center">
    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#000000] mb-6 leading-snug tracking-wide">
      {t("about.video.subtitle")}
    </h2>

    <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-black/10">
      <iframe
        className="w-full aspect-video"
        src="https://www.youtube.com/embed/bTn8BenfZq0"
        title="Job Fair Participation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
}
