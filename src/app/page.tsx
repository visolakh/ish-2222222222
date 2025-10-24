"use client";

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Globe, Users, Home, Shield, ArrowRight, FileCheck, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ApplicationForm } from '@/components/ApplicationForm';
import ApplyModal from '@/components/ApplyModal';

export default function HomePage() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const services = [
  {
    icon: Shield,
    title: t('services.legal.title'),
    description: t('services.legal.desc')
  },
  {
    icon: Users,
    title: t('services.support.title'),
    description: t('services.support.desc')
  },
  {
    icon: CheckCircle,
    title: t('services.verified.title'),
    description: t('services.verified.desc')
  },
  {
    icon: Home,
    title: t('services.housing.title'),
    description: t('services.housing.desc')
  }];

  const countryImages = {
    israel: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/file-1760723841386.jpg',
    hungary: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/file-1760723845545.jpg',
    bulgaria: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/bulgaria-veliko-tarnovo-best-for-affordability-1760723849644.jpg',
    czechia: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/6aa51a67c7672a9df2a1c345d308c3e6-1760723878077.webp',
    russia: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/moskovskij-kreml-1760723860813.jpg',
    croatia: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/96547f73e832f73676ecddac047c17c2-1760723867075.webp'
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - 50/50 Split Design */}
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Full Background Image - Sunset with Airplane */}
        <div className="absolute inset-0">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ed17f39e-58fc-4682-a700-c619d833ebee/generated_images/professional-commercial-airplane-silhoue-f8377ad1-20251010174347.jpg"
            alt="Airplane flying in sunset sky"
            fill
            className="object-cover"
            priority />

          {/* Gradient Overlay - Black transparent on left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center min-h-[85vh] px-8 lg:px-16">
          {/* Text Content - Left Side */}
          <div className="max-w-[700px] space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#D4AF37] tracking-tight leading-[1.1]">
                Horizon Work
              </h1>
              <div className="space-y-2 text-xl sm:text-2xl lg:text-3xl font-light text-white">
                <p>{t('hero.agency')}</p>
                <p>{t('hero.overseas')}</p>
              </div>
            </div>
            
            {/* Bottom Logo */}
            <div className="flex items-center gap-3 mt-8">
              <div className="text-[#D4AF37] font-bold">
                <div className="text-4xl sm:text-5xl lg:text-6xl tracking-wider" style={{ fontFamily: 'serif' }}>HW</div>
                <div className="text-xs sm:text-sm tracking-[0.3em] mt-1">HORIZON WORK</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Updated with 3 statistics */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-[#FFF8E7] to-white border-y border-[#FFD347]/20">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-semibold text-[#FF7A00] mb-2 sm:mb-3">2+</div>
              <div className="text-[#000000]/70 text-xs sm:text-sm font-medium">{t('about.advantage1')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-semibold text-[#FF7A00] mb-2 sm:mb-3">100%</div>
              <div className="text-[#000000]/70 text-xs sm:text-sm font-medium">{t('about.advantage3')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-semibold text-[#FF7A00] mb-2 sm:mb-3">400+</div>
              <div className="text-[#000000]/70 text-xs sm:text-sm font-medium">{t('about.advantage2')}</div>
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
                      className="w-full h-auto" />

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#000000] mb-4 sm:mb-5 tracking-tight" data-i18n="services.title">
              {t('services.title')}
            </h2>
            <p className="text-base sm:text-lg text-[#000000]/70 font-light leading-relaxed max-w-3xl mx-auto" data-i18n="services.subtitle">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-[#FFD347]/30 hover:border-[#FF7A00] hover:shadow-lg transition-all duration-300 bg-white group">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:from-[#FF7A00]/20 group-hover:to-[#FFB347]/20 transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF7A00]" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-[#000000] font-semibold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base text-[#000000]/70 leading-relaxed font-light">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>);

            })}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#000000] mb-4 sm:mb-5 tracking-tight" data-i18n="jobs.title">
              {t('jobs.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
            { country: 'israel', flag: "", key: 'israel' },
            { country: 'hungary', flag: "", key: 'hungary' },
            { country: 'bulgaria', flag: "", key: 'bulgaria' },
            { country: 'czechia', flag: "", key: 'czechia' },
            { country: 'russia', flag: "", key: 'russia' },
            { country: 'croatia', flag: "", key: 'croatia' }].
            map((item) =>
            <Card key={item.country} className="overflow-hidden border-[#FFD347]/30 hover:border-[#FF7A00] hover:shadow-xl transition-all duration-300 bg-white group">
                <div className="relative h-48 sm:h-56 overflow-hidden border-b border-[#FFD347]/20">
                  <Image
                    src={countryImages[item.country as keyof typeof countryImages]}
                    alt={t(`jobs.${item.key}`)}
                    fill
                    className="rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-110 shadow-sm"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#000000] font-semibold" data-i18n={`jobs.${item.key}`}>{t(`jobs.${item.key}`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#000000]/70 mb-4 sm:mb-6 leading-relaxed font-light text-sm sm:text-base" data-i18n={`jobs.${item.key}.desc`}>
                    {t(`jobs.${item.key}.desc`)}
                  </p>
                  <Button 
                    onClick={() => { 
                      setSelectedCountry(t(`jobs.${item.key}`)); 
                      setOpen(true); 
                    }}
                    className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FFB347] hover:from-[#FF7A00]/90 hover:to-[#FFB347]/90 text-white rounded-lg transition-all duration-300 font-medium text-sm sm:text-base border-none" 
                    data-i18n="jobs.apply"
                  >
                    {t('jobs.apply')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF7A00]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#000000] mb-6 sm:mb-8 tracking-tight" data-i18n="mission.title">
              {t('mission.title')}
            </h2>
            <p className="text-lg sm:text-xl text-[#000000]/70 leading-relaxed font-light" data-i18n="mission.text">
              {t('mission.text')}
            </p>
          </div>
        </div>
      </section>
{/* Видео под секцией "Наша миссия" */}
<div className="max-w-[900px] mx-auto mt-1 mb-8 bg-white rounded-2xl shadow-md">
  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
    <iframe
      src="https://www.youtube.com/embed/6jxfufz-JSU?rel=0"
      className="absolute top-0 left-0 w-full h-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</div>




      {/* CTA Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000] pointer-events-none" style={{ zIndex: -1 }} />
        
        <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6 tracking-tight text-[#FFD347]" data-i18n="cta.ready">
            {t('cta.ready')}
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-white/80 font-light max-w-2xl mx-auto leading-relaxed" data-i18n="cta.consultation">
            {t('cta.consultation')}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-[#FF7A00] to-[#FFB347] hover:from-[#FF7A00]/90 hover:to-[#FFB347]/90 text-white text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 font-medium border-none" data-i18n="contact.form.title">
              {t('contact.form.title')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Application Form Section - Moved to Bottom */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#000000] to-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ApplicationForm />
          </div>
        </div>
      </section>

      <ApplyModal open={open} onClose={() => setOpen(false)} country={selectedCountry} />

      <Footer />
    </div>);

}
