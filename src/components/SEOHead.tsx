"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function SEOHead() {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = t('meta.title');
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('meta.description');
      document.head.appendChild(meta);
    }

    // Update html lang attribute
    document.documentElement.lang = language;

    // Remove existing hreflang links
    const existingLinks = document.querySelectorAll('link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());

    // Add hreflang links for all languages
    const languages = ['ru', 'uz', 'en'];
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${baseUrl}?lang=${lang}`;
      document.head.appendChild(link);
    });

    // Add x-default hreflang
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = baseUrl;
    document.head.appendChild(defaultLink);

  }, [language, t]);

  return null;
}