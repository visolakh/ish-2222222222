"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000]">
      <div className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="relative h-11 w-auto flex-shrink-0">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/logo-qora-1_page-0001-1760118602136.jpg"
                  alt="Horizon Work Logo"
                  width={95}
                  height={44}
                  className="h-11 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/80 text-sm sm:text-[15px] leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg text-[#FFD347]">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-white/80 hover:text-[#FFD347] transition-colors text-sm sm:text-[15px] hover:translate-x-1 inline-block duration-300">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#FFD347] transition-colors text-sm sm:text-[15px] hover:translate-x-1 inline-block duration-300">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-white/80 hover:text-[#FFD347] transition-colors text-sm sm:text-[15px] hover:translate-x-1 inline-block duration-300">
                  {t('nav.jobs')}
                </Link>
              </li>
              <li>
                <Link href="/how-we-work" className="text-white/80 hover:text-[#FFD347] transition-colors text-sm sm:text-[15px] hover:translate-x-1 inline-block duration-300">
                  {t('nav.howWeWork')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#FFD347] transition-colors text-sm sm:text-[15px] hover:translate-x-1 inline-block duration-300">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg text-[#FFD347]">{t('footer.contacts')}</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3 text-white/80 text-sm sm:text-[15px]">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-[#FF7A00]" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+998773102133" className="hover:text-[#FFD347] transition-colors">+998 77 310 21 33</a>
                  <a href="tel:+998933998787" className="hover:text-[#FFD347] transition-colors">+998 93 399 87 87</a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-white/80 text-sm sm:text-[15px]">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-[#FF7A00]" />
                <a href="mailto:info@horizonwork.uz" className="break-words hover:text-[#FFD347] transition-colors">info@horizonwork.uz</a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-white/80 text-sm sm:text-[15px]">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-[#FF7A00]" />
                <a href="https://www.horizon-work.uz" target="_blank" rel="noopener noreferrer" className="break-words hover:text-[#FFD347] transition-colors">www.horizonwork.uz</a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-white/80 text-sm sm:text-[15px]">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-[#FF7A00]" />
                <span className="break-words">{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FFD347]/20 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-white/70 text-xs sm:text-sm">
            {t('footer.rights')}
          </p>
        </div>
      </div>
      
      {/* Gradient bottom border */}
      <div className="h-1 bg-gradient-to-r from-[#FF7A00] via-[#FFD347] to-[#FFB347]" />
    </footer>
  );
}
