"use client";

import React, { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// renamed import to avoid collision with global Image constructor
import NextImage from "next/image";
import {
  Eye,
  Award,
  Users,
  ShieldCheck,
  Shield,
  CheckCircle,
  FileCheck,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  const gallery = [
    {
      thumb: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/IMG_0259-1761484969341.JPG",
      full: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/IMG_0259-1761484969341.JPG",
      alt: "Gallery 1",
    },
    {
      thumb: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/photo_2025-10-26-17.20.55-1761485002912.jpeg",
      full: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/photo_2025-10-26-17.20.55-1761485002912.jpeg",
      alt: "Gallery 2",
    },
    {
      thumb: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/photo_2025-10-26-17.21.06-1761485008002.jpeg",
      full: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/photo_2025-10-26-17.21.06-1761485008002.jpeg",
      alt: "Gallery 3",
    },
    {
      thumb: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/IMG_0258-1761485014943.JPG",
      full: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/IMG_0258-1761485014943.JPG",
      alt: "Gallery 4",
    },
    {
      thumb: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/IMG_0109-1761485020447.JPG",
      full: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/IMG_0109-1761485020447.JPG",
      alt: "Gallery 5",
    },
  ];

  const [index, setIndex] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const openAt = (i: number) => {
    setIndex(i);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setIndex(null);
    document.body.style.overflow = "";
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index === null) return;
    setIndex((prev) => ((prev ?? 0) + 1) % gallery.length);
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index === null) return;
    setIndex((prev) => ((prev ?? 0) - 1 + gallery.length) % gallery.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex((prev) => ((prev ?? 0) + 1) % gallery.length);
      if (e.key === "ArrowLeft") setIndex((prev) => ((prev ?? 0) - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  // swipe support
  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    let startX = 0;
    let dist = 0;
    const threshold = 50;

    const onTouchStart = (ev: TouchEvent) => {
      startX = ev.touches[0].clientX;
      dist = 0;
    };
    const onTouchMove = (ev: TouchEvent) => {
      dist = ev.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      if (dist > threshold) showPrev();
      else if (dist < -threshold) showNext();
    };

    img.addEventListener("touchstart", onTouchStart, { passive: true });
    img.addEventListener("touchmove", onTouchMove, { passive: true });
    img.addEventListener("touchend", onTouchEnd);

    return () => {
      img.removeEventListener("touchstart", onTouchStart);
      img.removeEventListener("touchmove", onTouchMove);
      img.removeEventListener("touchend", onTouchEnd);
    };
  }, [index]);

  // preload neighbors using global Image constructor
  useEffect(() => {
    if (index === null) return;
    const next = (index + 1) % gallery.length;
    const prev = (index - 1 + gallery.length) % gallery.length;
    const p1 = new window.Image();
    p1.src = gallery[next].full;
    const p2 = new window.Image();
    p2.src = gallery[prev].full;
  }, [index]);

  return (
    <div className="min-h-screen relative">
      <Navigation />

      {/* LIGHTBOX */}
      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
        >
          <button
            onClick={(e) => showPrev(e)}
            aria-label="Previous"
            className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center z-[10001]"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <button
            onClick={(e) => showNext(e)}
            aria-label="Next"
            className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center z-[10001]"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center z-[10002]"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          <div
            className="max-w-[95vw] max-h-[92vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={imgRef}
              src={gallery[index].full}
              alt={gallery[index].alt || `Image ${index + 1}`}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              style={{ objectFit: "contain", imageRendering: "auto" }}
            />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1 rounded-md z-[10001]">
            {gallery[index].alt} · {index + 1}/{gallery.length}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 relative">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#000000] to-[#1a1a1a] pointer-events-none"
          style={{ zIndex: -1 }}
        />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-8 leading-snug">
              {t("about.title")}
            </h1>
            <p className="text-lg sm:text-xl text-white/80">{t("about.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-4">
              {t("about.values.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: "item1" },
              { icon: Award, title: "item2" },
              { icon: Users, title: "item3" },
              { icon: ShieldCheck, title: "item4" },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <Card
                  key={i}
                  className="border-2 border-[#FFD347]/30 hover:border-[#FF7A00] transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#000000] mb-3">
                      {t(`about.values.${v.title}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t(`about.values.${v.title}.desc`)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-6">
              {t("about.advantages.title")}
            </h2>
            <ul className="space-y-4 text-base sm:text-lg text-gray-700">
              {[1, 2, 3].map((n) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="text-[#FF7A00] mt-1 font-bold">✓</span>
                  <span>
                    <strong>{t(`about.advantage${n}`)}</strong> — {t(`about.advantage${n}.desc`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery thumbnails */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Images className="w-8 h-8 text-[#FF7A00]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#000000] tracking-tight">
                {t("about.gallery.title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {gallery.map((g, i) => (
              <div
                key={i}
                onClick={() => openAt(i)}
                className="relative overflow-hidden rounded-xl cursor-zoom-in hover:scale-105 transform transition"
              >
                <NextImage
                  src={g.thumb}
                  alt={g.alt}
                  width={500}
                  height={500}
                  className="object-cover w-full h-48 sm:h-40 md:h-44"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FFF8E7] to-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileCheck className="w-8 h-8 text-[#FF7A00]" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#000000] tracking-tight">
              {t("about.license")}
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#000000]/70 mb-8">{t("about.license.official")}</p>

          <div
            className="max-w-2xl mx-auto border-2 border-[#FFD347]/30 rounded-xl overflow-hidden cursor-zoom-in hover:opacity-95"
            onClick={() => openAt(0)}
          >
            <NextImage
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/_page-0001-1760118394562.jpg"
              alt={t("about.license")}
              width={800}
              height={1131}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
