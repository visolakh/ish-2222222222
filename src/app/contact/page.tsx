"use client";

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Send, Instagram } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          phone: formData.phone,
          destination_country: 'Не указано',
          comment: 'Заявка с формы контактов'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
      setFormData({ name: '', phone: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.phone'),
      details: [
        { text: '+998 77 310 21 33', link: 'tel:+998773102133' },
        { text: '+998 93 399 87 87', link: 'tel:+998933998787' },
        { text: '+998 93 501 87 87', link: 'tel:+998935018787' },
      ],
      color: 'bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10 text-[#FF7A00]',
    },
    {
      icon: Mail,
      title: t('contact.email'),
      details: [
        { text: 'info@horizonwork.uz', link: 'mailto:info@horizonwork.uz' }
      ],
      color: 'bg-gradient-to-br from-[#FFD347]/10 to-[#FFB347]/10 text-[#FFD347]',
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      details: [
        { text: t('contact.address.value'), link: null }
      ],
      color: 'bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10 text-[#FF7A00]',
    },
    {
      icon: Send,
      title: 'Telegram',
      details: [
        { text: '🔗 https://t.me/khorizon_work', link: 'https://t.me/khorizon_work' }
      ],
      color: 'bg-gradient-to-br from-[#FFD347]/10 to-[#FFB347]/10 text-[#FFD347]',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      details: [
        { text: 'Follow us on Instagram', link: 'https://www.instagram.com/horizon_work_/' }
      ],
      color: 'bg-gradient-to-br from-[#FF7A00]/10 to-[#FFB347]/10 text-[#FF7A00]',
    },
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
              {t('contact.title')}
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-[#FFD347]/30">
                  <CardHeader>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${info.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <CardTitle className="text-base sm:text-lg text-[#000000]">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {info.details.map((detail, i) => (
                        detail.link ? (
                          <a 
                            key={i}
                            href={detail.link}
                            target={detail.link.startsWith('http') ? '_blank' : undefined}
                            rel={detail.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="block text-gray-600 hover:text-[#FF7A00] transition-colors text-xs sm:text-sm break-words"
                          >
                            {detail.text}
                          </a>
                        ) : (
                          <p key={i} className="text-gray-600 text-xs sm:text-sm break-words">
                            {detail.text}
                          </p>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-4 sm:mb-6">
                {t('contact.form.title')}
              </h2>
              
              {isSubmitted ? (
                <Card className="bg-[#FF7A00]/10 border-[#FF7A00]/30">
                  <CardContent className="py-8 sm:py-12 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FF7A00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl sm:text-4xl text-[#FF7A00]">✓</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#000000] mb-2">
                      {t('contact.form.success')}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      {t('contact.form.success.text')}
                    </p>
                  </CardContent>
                </Card>
              ) : isError ? (
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="py-8 sm:py-12 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl sm:text-4xl text-red-600">✕</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-2">
                      {t('contact.form.error')}
                    </h3>
                    <p className="text-sm sm:text-base text-red-700">
                      {t('contact.form.error.text')}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-[#FFD347]/30">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm sm:text-base">{t('contact.form.name')}</Label>
                        <Input 
                          id="name" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder={t('contact.form.name.placeholder')}
                          className="text-base border-gray-300 focus:border-[#FF7A00] focus:ring-[#FF7A00]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm sm:text-base">{t('contact.form.phone')}</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          required 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder={t('contact.form.phone.placeholder')}
                          className="text-base border-gray-300 focus:border-[#FF7A00] focus:ring-[#FF7A00]"
                        />
                      </div>
                      <Button type="submit" className="w-full text-sm sm:text-base bg-gradient-to-r from-[#FF7A00] to-[#FFB347] hover:from-[#FF7A00]/90 hover:to-[#FFB347]/90 text-white border-none" disabled={isSubmitting}>
                        {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-4 sm:mb-6">
                {t('location.title')}
              </h2>
              <Card className="overflow-hidden h-[400px] sm:h-[500px] border-[#FFD347]/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d802.9947925961303!2d69.28729075878341!3d41.311418683735454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE4JzQwLjAiTiA2OcKwMTcnMTcuMSJF!5e0!3m2!1sen!2s!4v1760163001200!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="pointer-events-auto"
                ></iframe>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <Card className="border-[#FFD347]/30">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-[#000000]">{t('mehnat.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm sm:text-base text-gray-700">
                {t('mehnat.description')}
              </p>
              <div className="bg-gradient-to-br from-[#FFF8E7] to-white p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  <strong>{t('mehnat.benefits')}</strong>
                </p>
                <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                  <li>• {t('mehnat.benefit1')}</li>
                  <li>• {t('mehnat.benefit2')}</li>
                  <li>• {t('mehnat.benefit3')}</li>
                  <li>• {t('mehnat.benefit4')}</li>
                </ul>
              </div>
              <a 
                href="https://mehnat.uz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" className="text-sm sm:text-base border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00]/10">
                  {t('mehnat.button')}
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
