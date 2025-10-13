"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ApplicationForm() {
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
          comment: 'Заявка с формы вакансий'
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

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-8 text-center">
            {t('application.form.title')}
          </h2>

          {isSubmitted ? (
            <Card className="bg-[#FF7A00]/10 border-[#FF7A00]/30">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-[#FF7A00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-[#FF7A00]">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">
                  {t('application.form.success.title')}
                </h3>
                <p className="text-gray-700">
                  {t('application.form.success.message')}
                </p>
              </CardContent>
            </Card>
          ) : isError ? (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-red-600">✕</span>
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  {t('application.form.error.title')}
                </h3>
                <p className="text-red-700">
                  {t('application.form.error.message')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-[#FFD347]/30">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base">{t('application.form.fullName')}</Label>
                    <Input 
                      id="name" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t('application.form.fullName.placeholder')}
                      className="text-base border-gray-300 focus:border-[#FF7A00] focus:ring-[#FF7A00]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base">{t('application.form.phone')}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder={t('application.form.phone.placeholder')}
                      className="text-base border-gray-300 focus:border-[#FF7A00] focus:ring-[#FF7A00]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full text-base py-6 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] hover:from-[#FF7A00]/90 hover:to-[#FFB347]/90 text-white border-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('application.form.submitting') : t('application.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}