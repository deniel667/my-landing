'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type KeyboardEvent, type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import WineDetailModal from '@/components/wines/WineDetailModal';
import SiteToast, { showSiteToast } from '@/components/ui/SiteToast';
import {
  seasonalJuneMerlotPair,
  seasonalJuneSelection,
  seasonalJuneWines,
  type SeasonalJunePair,
  type SeasonalJuneWine,
} from '@/data/my-landing/seasonalJuneSelection';

const typeTone: Record<string, string> = {
  White: 'border-[rgba(176,160,121,0.34)] bg-[rgba(255,252,245,0.76)] text-[rgba(76,66,45,0.9)]',
  Sparkling: 'border-[rgba(179,139,89,0.36)] bg-[rgba(255,246,224,0.72)] text-[rgba(95,68,30,0.92)]',
  Red: 'border-[rgba(125,70,76,0.32)] bg-[rgba(246,232,232,0.66)] text-[rgba(86,42,48,0.92)]',
  Blanc: 'border-[rgba(158,153,126,0.34)] bg-[rgba(251,250,241,0.72)] text-[rgba(72,69,47,0.92)]',
};

function BottleFallback() {
  return (
    <div className="flex h-full min-h-[188px] items-center justify-center rounded-[8px] border border-[rgba(38,32,25,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(245,239,229,0.74))]">
      <svg viewBox="0 0 72 168" aria-hidden="true" className="h-[124px] w-[54px] text-[rgba(92,76,56,0.42)]">
        <path
          d="M29 8h14v24l7 13v101c0 10-6 17-14 17s-14-7-14-17V45l7-13V8Z"
          fill="rgba(255,255,255,0.55)"
          stroke="currentColor"
          strokeWidth="1.45"
        />
        <path d="M29 20h14" stroke="currentColor" strokeWidth="1.2" />
        <path d="M24 62h24v58H24z" fill="rgba(126,102,75,0.1)" />
      </svg>
    </div>
  );
}

function PairingModal({
  pair,
  isOpen,
  onClose,
  onInquiry,
}: {
  pair: SeasonalJunePair;
  isOpen: boolean;
  onClose: () => void;
  onInquiry: () => void;
}) {
  const portalTarget = typeof document === 'undefined' ? null : document.body;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !portalTarget) return null;

  return createPortal(
    <div className="fixed inset-0 z-[170]" role="dialog" aria-modal="true" aria-label={pair.title}>
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-[rgba(19,16,13,0.54)] backdrop-blur-[5px]"
        aria-label="閉じる"
      />

      <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
        <div
          className="relative mx-auto w-full max-w-[980px] rounded-[30px] border border-[rgba(105,84,58,0.12)] bg-[linear-gradient(180deg,rgba(255,252,248,0.995)_0%,rgba(247,241,232,0.985)_100%)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:p-6 lg:p-7"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.88)] text-[rgba(31,27,22,0.82)] transition-colors duration-200 hover:bg-[rgba(248,242,234,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.28)]"
            aria-label="閉じる"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-[14px] w-[14px] shrink-0" fill="none">
              <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>

          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start">
            <div className="rounded-[22px] border border-[rgba(105,84,58,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,245,238,0.98)_100%)] px-4 py-5">
              <div className="grid grid-cols-2 gap-4">
                {pair.wines.map((wine) => (
                  <div key={wine.key} className="text-center">
                    <div className="relative mx-auto h-[260px] max-w-[150px]">
                      {wine.imageSrc ? (
                        <Image
                          src={wine.imageSrc}
                          alt={`${wine.producer} ${wine.name}`}
                          fill
                          className="object-contain object-center"
                          sizes="150px"
                          priority
                        />
                      ) : (
                        <BottleFallback />
                      )}
                    </div>
                    <p className="mt-3 text-[12px] leading-[1.5] text-[rgba(31,27,22,0.78)]">{wine.name} {wine.vintage}</p>
                    <p className="mt-1 font-[var(--font-noto-serif-jp)] text-[17px] text-[rgba(24,20,17,0.94)]">
                      {wine.price}
                      <span className="ml-1 text-[9px] font-sans tracking-[0.14em] text-[rgba(38,32,25,0.48)]">税抜</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(31,27,22,0.5)]">{pair.eyebrow}</p>
              <h3 className="mt-3 font-[var(--font-noto-serif-jp)] text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.22] text-[rgba(16,14,12,0.98)]">
                {pair.title}
              </h3>
              <p className="mt-2 text-[13px] tracking-[0.06em] text-[rgba(31,27,22,0.68)]">{pair.producer}</p>
              <p className="mt-5 text-[14px] leading-[1.95] text-[rgba(31,27,22,0.82)]">{pair.modalBody}</p>

              <section className="mt-6 rounded-[18px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.58)] px-4 py-4">
                <p className="text-[11px] tracking-[0.14em] text-[rgba(31,27,22,0.48)]">内容</p>
                <div className="mt-3 grid gap-3">
                  {pair.wines.map((wine) => (
                    <div key={`modal-${wine.key}`} className="rounded-[14px] border border-[rgba(31,27,22,0.06)] bg-[rgba(255,255,255,0.62)] px-3 py-3">
                      <p className="text-[13px] leading-[1.6] text-[rgba(31,27,22,0.82)]">{wine.name} {wine.vintage}</p>
                      <p className="mt-1 font-[var(--font-noto-serif-jp)] text-[18px] text-[rgba(24,20,17,0.94)]">
                        {wine.price}
                        <span className="ml-1 text-[9px] font-sans tracking-[0.14em] text-[rgba(38,32,25,0.48)]">税抜</span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <button
                type="button"
                onClick={onInquiry}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(66,48,31,0.18)] bg-[rgba(65,49,34,0.97)] px-5 py-2.5 text-[12px] font-medium tracking-[0.1em] text-[rgba(255,251,245,0.98)] shadow-[0_10px_22px_rgba(40,28,18,0.14)] transition-colors hover:bg-[rgba(78,58,39,0.98)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.36)]"
              >
                {pair.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}

function getSeasonalOfferLabel(wine: SeasonalJuneWine) {
  return `${wine.producer} / ${wine.name} ${wine.vintage}`;
}

function PairingCard({
  pair,
  onOpen,
  onInquiry,
}: {
  pair: SeasonalJunePair;
  onOpen: () => void;
  onInquiry: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onOpen();
  };

  const handleInquiryClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onInquiry();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${pair.title} の詳細を見る`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      className="group grid h-full cursor-pointer gap-6 rounded-[8px] border border-[rgba(92,68,43,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(249,244,236,0.76)_100%)] p-5 shadow-[0_20px_46px_rgba(32,26,18,0.07)] transition duration-200 hover:-translate-y-[1px] hover:border-[rgba(89,65,42,0.26)] hover:bg-[rgba(255,255,255,0.88)] hover:shadow-[0_24px_54px_rgba(32,26,18,0.09)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.34)] md:col-span-2 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] md:p-6"
    >
      <div className="grid grid-cols-2 gap-4 rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,240,230,0.62))] px-4 py-4">
        {pair.wines.map((wine) => (
          <div key={wine.key} className="min-w-0 text-center">
            <div className="relative mx-auto h-[178px] max-w-[120px] sm:h-[210px]">
              {wine.imageSrc ? (
                <Image
                  src={wine.imageSrc}
                  alt={`${wine.producer} ${wine.name}`}
                  fill
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(min-width: 768px) 120px, 36vw"
                />
              ) : (
                <BottleFallback />
              )}
            </div>
            <p className="mt-3 text-[12px] leading-[1.45] text-[rgba(31,27,22,0.78)]">{wine.name}</p>
            <p className="mt-0.5 text-[11px] text-[rgba(31,27,22,0.54)]">{wine.vintage}</p>
            <p className="mt-2 font-[var(--font-noto-serif-jp)] text-[19px] leading-none text-[rgba(24,20,17,0.94)]">
              {wine.price}
              <span className="ml-1 text-[9px] font-sans tracking-[0.14em] text-[rgba(38,32,25,0.48)]">税抜</span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <p className="m-0 text-[10.5px] font-medium uppercase tracking-[0.22em] text-[rgba(38,32,25,0.54)]">{pair.eyebrow}</p>
          <span className="rounded-full border border-[rgba(108,82,55,0.18)] bg-[rgba(255,255,255,0.58)] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[rgba(66,48,31,0.78)]">
            {pair.badge}
          </span>
        </div>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[rgba(38,32,25,0.6)]">{pair.producer}</p>
        <h2 className="mt-2 font-[var(--font-noto-serif-jp)] text-[clamp(1.8rem,4vw,2.55rem)] leading-[1.18] text-[rgba(23,20,17,0.98)]">
          <span className="inline-block whitespace-nowrap">Merlot 2本</span>
          <span className="inline-block whitespace-nowrap sm:ml-[0.18em]">セレクション</span>
        </h2>
        <p className="mt-4 max-w-[48ch] text-[13.5px] leading-[1.85] text-[rgba(38,32,25,0.75)]">{pair.comment}</p>
        <button
          type="button"
          onClick={handleInquiryClick}
          className="mt-5 inline-flex min-h-[40px] w-fit items-center rounded-full border border-[rgba(66,48,31,0.2)] bg-[rgba(255,255,255,0.66)] px-4 py-2 text-[12px] font-medium tracking-[0.08em] text-[rgba(65,49,34,0.92)] transition-colors hover:bg-[rgba(255,255,255,0.88)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.36)]"
        >
          {pair.ctaLabel}
        </button>
      </div>
    </article>
  );
}

function WineCard({
  wine,
  onInquiry,
  onOpenDetails,
}: {
  wine: SeasonalJuneWine;
  onInquiry: (wine: SeasonalJuneWine) => void;
  onOpenDetails: (wine: SeasonalJuneWine) => void;
}) {
  const toneKey = wine.style.startsWith('Sparkling') ? 'Sparkling' : wine.style.startsWith('Red') ? 'Red' : wine.style.startsWith('Blanc') ? 'Blanc' : 'White';
  const tone = typeTone[toneKey];
  const canOpenDetails = Boolean(wine.canonicalWineId);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!canOpenDetails) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onOpenDetails(wine);
  };

  const handleInquiryClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onInquiry(wine);
  };

  return (
    <article
      role={canOpenDetails ? 'button' : undefined}
      tabIndex={canOpenDetails ? 0 : undefined}
      aria-label={canOpenDetails ? `${wine.producer} ${wine.name} の詳細を見る` : undefined}
      onClick={canOpenDetails ? () => onOpenDetails(wine) : undefined}
      onKeyDown={handleKeyDown}
      className={`group grid h-full gap-4 rounded-[8px] border border-[rgba(38,32,25,0.12)] bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_18px_38px_rgba(32,26,18,0.055)] transition duration-200 sm:grid-cols-[132px_minmax(0,1fr)] ${canOpenDetails ? 'cursor-pointer hover:-translate-y-[1px] hover:border-[rgba(89,65,42,0.22)] hover:bg-[rgba(255,255,255,0.84)] hover:shadow-[0_22px_48px_rgba(32,26,18,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.34)]' : ''}`}
    >
      <div className="relative overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(246,240,230,0.76))]">
        {wine.imageSrc ? (
          <div className="relative min-h-[188px]">
            <Image
              src={wine.imageSrc}
              alt={`${wine.producer} ${wine.name}`}
              fill
              className="object-contain object-center p-3 transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 768px) 132px, 45vw"
            />
          </div>
        ) : (
          <BottleFallback />
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-3">
          <p className="m-0 text-[10.5px] font-medium uppercase tracking-[0.18em] text-[rgba(38,32,25,0.62)]">{wine.producer}</p>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.14em] ${tone}`}>
            {toneKey}
          </span>
        </div>

        <h2 className="mt-2 font-[var(--font-noto-serif-jp)] text-[21px] leading-[1.28] text-[rgba(23,20,17,0.98)]">
          {wine.name}
        </h2>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] leading-[1.55] text-[rgba(38,32,25,0.7)]">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.18em] text-[rgba(38,32,25,0.4)]">Vintage</span>
            {wine.vintage}
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-[0.18em] text-[rgba(38,32,25,0.4)]">Style</span>
            {wine.style}
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-[13px] leading-[1.8] text-[rgba(38,32,25,0.76)]">{wine.seasonalComment}</p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <p className="m-0 font-[var(--font-noto-serif-jp)] text-[23px] leading-none text-[rgba(24,20,17,0.94)]">
            {wine.price}
            <span className="ml-1 text-[10px] font-sans tracking-[0.16em] text-[rgba(38,32,25,0.48)]">税抜</span>
          </p>
          <button
            type="button"
            onClick={handleInquiryClick}
            className="min-h-[40px] rounded-full border border-[rgba(66,48,31,0.2)] bg-[rgba(255,255,255,0.66)] px-4 py-2 text-[12px] font-medium tracking-[0.08em] text-[rgba(65,49,34,0.92)] transition-colors hover:bg-[rgba(255,255,255,0.88)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.36)]"
          >
            詳細・お問い合わせ
          </button>
        </div>
      </div>
    </article>
  );
}

export default function JuneSelectionClient() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requestedWine, setRequestedWine] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSeasonalWine, setActiveSeasonalWine] = useState<SeasonalJuneWine | null>(null);
  const [isMerlotPairOpen, setIsMerlotPairOpen] = useState(false);

  const allWineNames = useMemo(
    () => seasonalJuneWines.map(getSeasonalOfferLabel).join('\n'),
    []
  );

  const mergeRequestedWine = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setRequestedWine((current) => {
      const currentLines = current
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      const nextLines = trimmed
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      const merged = [...currentLines];

      nextLines.forEach((line) => {
        if (!merged.includes(line)) merged.push(line);
      });

      return merged.join('\n');
    });
  };

  const focusForm = (value?: string) => {
    if (value) mergeRequestedWine(value);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleWineInquiry = (wine: SeasonalJuneWine) => {
    setActiveSeasonalWine(null);
    focusForm(getSeasonalOfferLabel(wine));
    showSiteToast('ご希望ワインをフォームに反映しました。', 'info');
  };

  const handleOpenDetails = (wine: SeasonalJuneWine) => {
    if (!wine.canonicalWineId) {
      handleWineInquiry(wine);
      return;
    }

    setActiveSeasonalWine(wine);
  };

  const handleMerlotPairInquiry = () => {
    setIsMerlotPairOpen(false);
    focusForm(seasonalJuneMerlotPair.inquiryText);
    showSiteToast('Merlot 2本セレクションをフォームに反映しました。', 'info');
  };

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('FINDEST｜初夏のワインセレクション問い合わせ');
    const body = encodeURIComponent(
      [
        `お名前: ${name}`,
        `店舗名 / 会社名: ${company}`,
        `メールアドレス: ${email}`,
        `電話番号: ${phone}`,
        `ご希望ワイン / ご希望商品:\n${requestedWine || allWineNames}`,
        `ご希望本数 / 数量: ${quantity}`,
        `備考:\n${message}`,
      ].join('\n')
    );
    return `mailto:${seasonalJuneSelection.supportEmail}?subject=${subject}&body=${body}`;
  }, [allWineNames, company, email, message, name, phone, quantity, requestedWine]);

  const handleSubmit = async () => {
    if (!name.trim() || !company.trim() || !email.trim() || !requestedWine.trim()) {
      showSiteToast('お名前・店舗名/会社名・メール・ご希望ワインを入力してください。', 'error');
      return;
    }

    setIsSubmitting(true);
    showSiteToast('送信中です…', 'info');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${seasonalJuneSelection.supportEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'FINDEST｜初夏のワインセレクション問い合わせ',
          _captcha: 'false',
          type: '初夏のワインセレクション',
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          requestedWine: requestedWine.trim(),
          quantity: quantity.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = (await response.json()) as { success?: string };
      if (!result.success) throw new Error('submit failed');
    } catch (error) {
      console.error(error);
      showSiteToast('送信に失敗しました。メール送信ボタンをご利用ください。', 'error');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setRequestedWine('');
    setQuantity('');
    setMessage('');
    showSiteToast('送信が完了しました。お問い合わせありがとうございます。', 'success');
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8f4ec_0%,#f3ecdf_52%,#eee4d4_100%)] text-[rgba(28,24,20,0.94)]">
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-10 pt-7 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-4 border-b border-[rgba(38,32,25,0.12)] pb-5">
          <Link href="/" className="flex flex-col leading-none" aria-label="FINDEST top">
            <span className="font-[var(--font-noto-serif-jp)] text-[17px] tracking-[0.16em]">FINDEST</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-[rgba(38,32,25,0.55)]">German Wine Curation</span>
          </Link>
          <button
            type="button"
            onClick={() => focusForm(allWineNames)}
            className="hidden min-h-[40px] rounded-full border border-[rgba(66,48,31,0.16)] bg-[rgba(255,255,255,0.52)] px-4 py-2 text-[11px] font-medium tracking-[0.1em] text-[rgba(38,32,25,0.82)] backdrop-blur sm:inline-flex sm:items-center"
          >
            ご注文・お問い合わせ
          </button>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:py-16">
          <div>
            <p className="m-0 text-[11px] uppercase tracking-[0.26em] text-[rgba(38,32,25,0.48)]">
              {seasonalJuneSelection.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[12ch] font-[var(--font-noto-serif-jp)] text-[clamp(2.25rem,6.2vw,4.7rem)] font-medium leading-[1.12] tracking-[0] text-[rgba(19,17,15,0.98)] sm:max-w-[15ch] lg:max-w-[18ch]">
              <span className="inline-block whitespace-nowrap">初夏のワイン</span>
              <span className="inline-block whitespace-nowrap sm:ml-[0.18em] lg:ml-0 lg:block">セレクション</span>
            </h1>
            <p className="mt-6 max-w-[56ch] text-[15px] leading-[2] text-[rgba(38,32,25,0.76)]">
              {seasonalJuneSelection.intro}
            </p>
            <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.9] text-[rgba(38,32,25,0.66)]">
              {seasonalJuneSelection.subIntro}
            </p>
            <p className="mt-4 inline-flex rounded-full border border-[rgba(38,32,25,0.12)] bg-[rgba(255,255,255,0.48)] px-4 py-2 text-[12px] leading-[1.7] tracking-[0.04em] text-[rgba(38,32,25,0.62)]">
              {seasonalJuneSelection.privateNote}
            </p>
          </div>

          <aside className="rounded-[8px] border border-[rgba(38,32,25,0.13)] bg-[rgba(255,255,255,0.6)] p-5 shadow-[0_14px_30px_rgba(32,26,18,0.05)]">
            <p className="m-0 text-[10.5px] font-medium uppercase tracking-[0.22em] text-[rgba(38,32,25,0.54)]">INFORMATION</p>
            <div className="mt-4 space-y-2.5 text-[13.5px] leading-[1.75] text-[rgba(38,32,25,0.78)]">
              {seasonalJuneSelection.notes.map((note) => (
                <p key={note} className="m-0 flex gap-2">
                  <span aria-hidden="true">・</span>
                  <span>{note}</span>
                </p>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {seasonalJuneWines.map((wine) => (
            <div key={wine.key} className="contents">
              <WineCard wine={wine} onInquiry={handleWineInquiry} onOpenDetails={handleOpenDetails} />
              {wine.key === 'dautel-trollinger-2022' ? (
                <PairingCard
                  pair={seasonalJuneMerlotPair}
                  onOpen={() => setIsMerlotPairOpen(true)}
                  onInquiry={handleMerlotPairInquiry}
                />
              ) : null}
            </div>
          ))}
        </section>

        <section className="my-12 rounded-[8px] border border-[rgba(38,32,25,0.12)] bg-[rgba(255,255,255,0.42)] px-5 py-7 shadow-[0_12px_28px_rgba(32,26,18,0.035)] sm:my-16 sm:px-7 sm:py-8">
          <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
            <p className="m-0 text-[10.5px] font-medium uppercase tracking-[0.28em] text-[rgba(38,32,25,0.52)]">Seasonal View</p>
            <p className="m-0 max-w-[70ch] font-[var(--font-noto-serif-jp)] text-[19px] leading-[1.9] text-[rgba(28,24,20,0.82)]">
              {seasonalJuneSelection.editorial}
            </p>
          </div>
        </section>

        <section ref={formRef} className="scroll-mt-6 rounded-[8px] border border-[rgba(38,32,25,0.13)] bg-[rgba(255,255,255,0.66)] p-5 shadow-[0_20px_44px_rgba(32,26,18,0.06)] sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
            <div>
              <p className="m-0 text-[10px] uppercase tracking-[0.24em] text-[rgba(38,32,25,0.46)]">Order / Inquiry</p>
              <h2 className="mt-3 font-[var(--font-noto-serif-jp)] text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.22] text-[rgba(19,17,15,0.98)]">
                ご注文・お問い合わせ
              </h2>
              <p className="mt-4 text-[14px] leading-[1.9] text-[rgba(38,32,25,0.7)]">
                ご希望ワイン、本数、店舗情報をご入力ください。内容確認後、担当者よりご連絡いたします。
              </p>
              <p className="mt-3 text-[12px] leading-[1.8] text-[rgba(38,32,25,0.56)]">
                メール送信は、フォーム送信がうまく動作しない場合の予備手段です。
              </p>
              <div className="mt-6 rounded-[8px] border border-[rgba(38,32,25,0.1)] bg-[rgba(255,255,255,0.44)] px-4 py-4">
                <p className="m-0 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[rgba(38,32,25,0.52)]">ご注文の流れ</p>
                <ol className="mt-3 space-y-2 text-[12.5px] leading-[1.75] text-[rgba(38,32,25,0.68)]">
                  <li>1. ご希望のワインと本数をご入力ください。</li>
                  <li>2. 在庫とヴィンテージを確認のうえ、ご案内いたします。</li>
                  <li>3. 内容確定後、発送またはお渡し方法をご連絡します。</li>
                </ol>
              </div>
              <a
                href={mailtoHref}
                className="mt-5 inline-flex min-h-[42px] items-center rounded-full border border-[rgba(38,32,25,0.16)] bg-[rgba(255,255,255,0.52)] px-4 py-2 text-[12px] font-medium tracking-[0.08em] text-[rgba(38,32,25,0.82)]"
              >
                メールで送信する
              </a>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[12px] text-[rgba(38,32,25,0.62)]">
                  お名前
                  <input value={name} onChange={(event) => setName(event.target.value)} className="min-h-[44px] rounded-[6px] border border-[rgba(38,32,25,0.14)] bg-[rgba(255,255,255,0.84)] px-3 text-[16px] text-[rgba(28,24,20,0.92)] outline-none focus:border-[rgba(92,68,43,0.45)]" />
                </label>
                <label className="grid gap-1.5 text-[12px] text-[rgba(38,32,25,0.62)]">
                  店舗名 / 会社名
                  <input value={company} onChange={(event) => setCompany(event.target.value)} className="min-h-[44px] rounded-[6px] border border-[rgba(38,32,25,0.14)] bg-[rgba(255,255,255,0.84)] px-3 text-[16px] text-[rgba(28,24,20,0.92)] outline-none focus:border-[rgba(92,68,43,0.45)]" />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[12px] text-[rgba(38,32,25,0.62)]">
                  メールアドレス
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-[44px] rounded-[6px] border border-[rgba(38,32,25,0.14)] bg-[rgba(255,255,255,0.84)] px-3 text-[16px] text-[rgba(28,24,20,0.92)] outline-none focus:border-[rgba(92,68,43,0.45)]" />
                </label>
                <label className="grid gap-1.5 text-[12px] text-[rgba(38,32,25,0.62)]">
                  電話番号（任意）
                  <input value={phone} onChange={(event) => setPhone(event.target.value)} className="min-h-[44px] rounded-[6px] border border-[rgba(38,32,25,0.14)] bg-[rgba(255,255,255,0.84)] px-3 text-[16px] text-[rgba(28,24,20,0.92)] outline-none focus:border-[rgba(92,68,43,0.45)]" />
                </label>
              </div>
              <label className="grid gap-1.5 text-[12px] text-[rgba(38,32,25,0.62)]">
                ご希望ワイン / ご希望商品
                <textarea value={requestedWine} onChange={(event) => setRequestedWine(event.target.value)} rows={4} className="min-h-[112px] rounded-[6px] border border-[rgba(38,32,25,0.14)] bg-[rgba(255,255,255,0.84)] px-3 py-2 text-[16px] leading-[1.6] text-[rgba(28,24,20,0.92)] outline-none focus:border-[rgba(92,68,43,0.45)]" />
              </label>
              <label className="grid gap-1.5 text-[12px] text-[rgba(38,32,25,0.62)]">
                ご希望本数 / 数量
                <input value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="例）各6本 / 合計12本 など" className="min-h-[44px] rounded-[6px] border border-[rgba(38,32,25,0.14)] bg-[rgba(255,255,255,0.84)] px-3 text-[16px] text-[rgba(28,24,20,0.92)] outline-none focus:border-[rgba(92,68,43,0.45)]" />
              </label>
              <label className="grid gap-1.5 text-[12px] text-[rgba(38,32,25,0.62)]">
                備考
                <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} className="min-h-[112px] rounded-[6px] border border-[rgba(38,32,25,0.14)] bg-[rgba(255,255,255,0.84)] px-3 py-2 text-[16px] leading-[1.6] text-[rgba(28,24,20,0.92)] outline-none focus:border-[rgba(92,68,43,0.45)]" />
              </label>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-h-[48px] rounded-full border border-[rgba(66,48,31,0.18)] bg-[rgba(65,49,34,0.97)] px-5 py-3 text-[13px] font-medium tracking-[0.1em] text-[rgba(255,251,245,0.98)] shadow-[0_10px_22px_rgba(40,28,18,0.14)] transition-colors hover:bg-[rgba(78,58,39,0.98)] disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? '送信中です…' : 'この内容で注文・問い合わせ'}
              </button>
            </div>
          </div>
        </section>
      </section>

      <div className="sticky bottom-0 z-20 border-t border-[rgba(38,32,25,0.12)] bg-[rgba(248,244,236,0.88)] px-4 py-3 backdrop-blur-md sm:hidden">
        <button
          type="button"
          onClick={() => focusForm(allWineNames)}
          className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-[rgba(65,49,34,0.97)] px-5 text-[13px] font-medium tracking-[0.1em] text-[rgba(255,251,245,0.98)]"
        >
          {seasonalJuneSelection.ctaLabel}
        </button>
      </div>

      <SiteToast />
      <WineDetailModal
        wineId={activeSeasonalWine?.canonicalWineId ?? null}
        onClose={() => setActiveSeasonalWine(null)}
        inquiryButtonLabel="このワインを問い合わせる"
        onInquiry={activeSeasonalWine ? () => handleWineInquiry(activeSeasonalWine) : undefined}
      />
      <PairingModal
        pair={seasonalJuneMerlotPair}
        isOpen={isMerlotPairOpen}
        onClose={() => setIsMerlotPairOpen(false)}
        onInquiry={handleMerlotPairInquiry}
      />
    </main>
  );
}
