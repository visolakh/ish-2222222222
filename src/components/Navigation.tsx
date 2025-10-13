"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/jobs', label: t('nav.jobs') },
    { href: '/how-we-work', label: t('nav.howWeWork') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#000000] to-[#1a1a1a] backdrop-blur-md border-b border-[#FFD347]/20 fixed w-full top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-14 w-auto flex-shrink-0">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/logo-qora-1_page-0001-1760118602136.jpg"
                alt="Horizon Work Logo"
                width={120}
                height={56}
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-[#FFD347] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/5 text-[15px]"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-white/5 relative z-[10000]"
            >
              {isOpen ? <X className="w-6 h-6 text-[#FFD347]" /> : <Menu className="w-6 h-6 text-[#FFD347]" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[9998] m-0"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="md:hidden fixed top-0 left-0 right-0 w-full bg-gradient-to-br from-[#000000] to-[#1a1a1a] shadow-lg z-[9999] max-h-screen overflow-y-auto m-0 border-b border-[#FFD347]/20">
            <div className="max-w-[1200px] mx-auto px-4 pt-24 pb-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-white/70 hover:text-[#FFD347] transition-colors font-medium px-2 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}