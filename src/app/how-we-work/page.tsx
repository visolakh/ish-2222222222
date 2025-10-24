"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const GOLD = "#ffd700";
const YELLOW = "#ffa500";

const IconDoc = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.6a1 1 0 01.7.3l5.4 5.4a1 1 0 01.3.7V19a2 2 0 01-2 2z" />
  </svg>
);
const IconChat = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconHall = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7h18M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7" />
  </svg>
);
const IconCall = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M22 16.9V21a1 1 0 01-1.1 1 19.9 19.9 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.9 19.9 0 012 3.1 1 1 0 013 2h4.1a1 1 0 011 .8c.1.7.3 1.3.6 1.9a1 1 0 01-.2 1.1L7.7 7.7a16 16 0 006 6l1.9-1.9a1 1 0 011.1-.2c.6.3 1.3.5 1.9.6a1 1 0 01.7 1V21z" />
  </svg>
);
const IconPaper = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 2H6a2 2 0 00-2 2v16l4-2h6a2 2 0 002-2V4a2 2 0 00-2-2z" />
  </svg>
);
const IconShield = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2v6M5 8v6a7 7 0 1014 0V8" />
  </svg>
);
const IconBook = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 15V9a2 2 0 00-2-2H5l-2 4v4a2 2 0 002 2h16" />
  </svg>
);
const IconPlane = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2l4 4M12 22l4-4" />
  </svg>
);

export default function HowWeWorkPage() {
  const { t } = useLanguage();

  const services = [
    { k: "social",  icon: IconDoc,   title: t("servicesPage.services.social.title"),  desc: t("servicesPage.services.social.desc") },
    { k: "consult", icon: IconChat,  title: t("servicesPage.services.consult.title"), desc: t("servicesPage.services.consult.desc") },
    { k: "fairs",   icon: IconHall,  title: t("servicesPage.services.fairs.title"),   desc: t("servicesPage.services.fairs.desc") },
    { k: "docs",    icon: IconPaper, title: t("servicesPage.services.docs.title"),    desc: t("servicesPage.services.docs.desc") },
    { k: "adapt",   icon: IconShield,title: t("servicesPage.services.adapt.title"),   desc: t("servicesPage.services.adapt.desc") },
    { k: "russian", icon: IconBook,  title: t("servicesPage.services.russian.title"), desc: t("servicesPage.services.russian.desc") },
    { k: "tickets", icon: IconPlane, title: t("servicesPage.services.tickets.title"), desc: t("servicesPage.services.tickets.desc") },
  ];

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow">
        <section className="pt-28 md:pt-32 pb-12 px-4">
          <div className="max-w-[1280px] mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
              {t("servicesPage.title")}
            </h1>
            <p className="mt-4 text-base md:text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
              {t("servicesPage.intro")}
            </p>
            <div className="mx-auto mt-8 h-[4px] w-28 rounded-full"
                 style={{ background: `linear-gradient(90deg, ${GOLD}, ${YELLOW})` }} />
          </div>
        </section>

        <section className="px-4 py-14 md:py-18">
          <div className="max-w-[1280px] mx-auto">
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
                <div className="h-full w-[6px] rounded-full" style={{ background: GOLD }} />
              </div>

              <ol className="space-y-14 md:space-y-16">
                {services.map((s, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <li key={s.k} className="grid grid-cols-1 lg:grid-cols-2 lg:gap-14 items-stretch">
                      <div className={`relative ${isLeft ? "" : "lg:order-2"}`}>
                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[-36px]">
                          <span
                            className="block w-5 h-5 rounded-full"
                            style={{ background: GOLD, boxShadow: `0 0 0 8px ${GOLD}22` }}
                          />
                        </div>

                        <div
                          className="rounded-3xl border bg-white/95 backdrop-blur px-8 py-8 md:px-10 md:py-10"
                          style={{
                            borderColor: "rgba(0,0,0,0.08)",
                            boxShadow:
                              "0 1px 0 rgba(0,0,0,0.04), 0 10px 24px -12px rgba(0,0,0,0.15)",
                          }}
                        >
                          <div
                            className="h-[4px] w-20 rounded mb-5"
                            style={{ background: `linear-gradient(90deg, ${GOLD}, ${YELLOW})` }}
                            aria-hidden
                          />
                          <div className="flex items-start gap-5">
                            <div
                              className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${GOLD}26, ${YELLOW}33)`,
                                border: `1px solid ${GOLD}80`,
                                color: "#111",
                              }}
                            >
                              {s.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base md:text-lg font-semibold text-black leading-snug">
                                {s.title}
                              </h3>
                              <p className="text-sm md:text-base text-black/70 mt-2 leading-relaxed">
                                {s.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`hidden lg:block ${isLeft ? "lg:order-2" : ""}`}>
                        <div
                          className={`h-[2px] ${isLeft ? "ml-10" : "mr-10"} my-4 rounded-full`}
                          style={{ background: "rgba(0,0,0,0.08)" }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="lg:hidden pointer-events-none">
                <div className="absolute left-4 top-0 bottom-0 w-[3px]" style={{ background: GOLD }} />
              </div>
            </div>
          </div>
        </section>
        {/* VIDEO SECTION */}
<section className="px-4 pb-20">
  <div className="max-w-[1280px] mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-black">
        {t("servicesPage.videoBlock.title")}
      </h2>
      <p className="text-black/70">
        {t("servicesPage.videoBlock.subtitle")}
      </p>
    </div>

    {/* Два видео рядом */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Видео 1 */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-black/10">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/j33xZW2g7Dg"
          title="Video 1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Видео 2 */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-black/10">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/QNagwj_WsxE"
          title="Video 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
</section>




      </main>

      <Footer />
    </div>
  );
}
