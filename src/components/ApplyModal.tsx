"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ApplyModal({
  open,
  onClose,
  country,
}: { open: boolean; onClose: () => void; country?: string | null }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    console.log({ name, phone, country: country ?? null });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-black/10"
      >
        <h3 className="text-xl font-semibold">
          {t('modal.apply.title')}{country ? ` — ${country}` : ""}
        </h3>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm mb-1">{t('modal.apply.name')}</label>
            <input
              type="text"
              className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('modal.apply.namePlaceholder')}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{t('modal.apply.phone')}</label>
            <input
              type="tel"
              className="w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('modal.apply.phonePlaceholder')}
              required
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl py-2.5 font-medium text-white"
              style={{ background: "linear-gradient(90deg,#ffd700,#ffa500)" }}
            >
              {t('modal.apply.submit')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl py-2.5 font-medium border border-black/15"
            >
              {t('modal.apply.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
