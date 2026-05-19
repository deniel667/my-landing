'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';

const tocItems = [
  { id: 'sec-01', label: 'バッハ（評価の遅れ）' },
  { id: 'sec-02', label: '体感覚（Kinesthetic）' },
  { id: 'sec-03', label: 'FINDESTの史実' },
  { id: 'tool-01', label: 'ワイン作法' },
  { id: 'tool-03', label: 'エレメントセレクションカード' },
  { id: 'tool-02', label: 'ミラーティスティング' },
] as const;

function Paragraph({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-line text-[16.8px] leading-[2.0] tracking-[0.01em] text-[rgba(22,20,18,0.94)] [text-wrap:pretty] [line-break:strict] [word-break:normal]">
      {text}
    </p>
  );
}

function ToolSigil({ kind }: { kind: 'sahou' | 'mirror' | 'element' }) {
  if (kind === 'sahou') {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8 text-[rgba(22,20,18,0.55)]" aria-label="ワイン作法の象徴">
        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18 32c4-4 8-4 12 0s8 4 12 0 8-4 12 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (kind === 'mirror') {
    return (
      <svg viewBox="0 0 64 64" className="h-8 w-8 text-[rgba(22,20,18,0.55)]" aria-label="ミラーテイスティングの象徴">
        <rect x="18" y="14" width="28" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18 42h28M22 47h20" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8 text-[rgba(22,20,18,0.55)]" aria-label="エレメントセレクションの象徴">
      <rect x="14" y="16" width="18" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="24" y="12" width="18" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="34" y="18" width="16" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ThoughtPage() {
  const toc = useMemo(() => tocItems, []);
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? 'sec-01');
  const [progress, setProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, true>>({});

  const scrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const nav = document.querySelector<HTMLElement>('.site-nav');
    const offset = (nav?.getBoundingClientRect().height ?? 72) + 24;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  useEffect(() => {
    const sections = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0.05, 0.12, 0.2, 0.35, 0.5],
      }
    );

    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [toc]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(ratio);
      setShowBackTop(window.scrollY > window.innerHeight * 1.5);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>('[data-thought-heading]'));
    if (!headings.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('data-thought-heading');
          if (!id) return;
          setRevealed((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' }
    );

    headings.forEach((heading) => io.observe(heading));
    return () => io.disconnect();
  }, []);

  const activeLabel = toc.find((item) => item.id === activeId)?.label ?? '';

  const headingReveal = (id: string) =>
    `transition-all duration-200 ease-out ${revealed[id] ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'}`;

  return (
    <>
      <SiteHeader />
      <span
        aria-hidden="true"
        className="fixed left-0 right-0 top-[70px] z-[55] h-px origin-left bg-[rgba(24,21,18,0.36)]"
        style={{ transform: `scaleX(${progress})` }}
      />

      <main id="top" lang="ja" className="min-h-screen bg-[#f5f0e8] pt-20 text-[rgba(22,20,18,0.94)] sm:pt-24">
        <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 sm:px-6">
          <header className="border-b border-[rgba(22,20,18,0.1)] pb-6 pt-4">
            <p className="text-[11px] tracking-[0.15em] text-[rgba(22,20,18,0.6)]">THOUGHT / 思想</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="font-serif text-[32px] font-medium leading-[1.3] tracking-[0.01em] text-[rgba(22,20,18,0.96)] [text-wrap:balance] sm:text-[35px]">
                FINDESTの思想
              </h1>
              <p className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] text-[rgba(22,20,18,0.72)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(22,20,18,0.45)] shadow-[0_0_0_4px_rgba(22,20,18,0.08)]" />
                <span className="max-w-[36ch] overflow-hidden text-ellipsis whitespace-nowrap">{activeLabel}</span>
              </p>
            </div>
            <p className="mt-3 border-l border-[rgba(22,20,18,0.18)] pl-4 font-serif text-[clamp(22px,4.6vw,30px)] font-medium leading-[1.45] text-[rgba(22,20,18,0.9)] [text-wrap:balance]">
              評価の前に、体感覚がある。
            </p>
            <a
              href="/background"
              className="mt-4 inline-flex text-[12px] tracking-[0.08em] text-[rgba(22,20,18,0.68)] transition hover:text-[rgba(22,20,18,0.92)]"
            >
              ← 表現の背景へ
            </a>
          </header>

          <div
            className="mt-6 h-[200px] overflow-hidden rounded-[18px] border border-[rgba(22,20,18,0.1)] sm:h-[240px]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(245,240,232,0.66) 0%, rgba(245,240,232,0.76) 100%), url('/story/bg-1.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span className="block h-full w-full bg-[linear-gradient(90deg,rgba(22,20,18,0.05)_0%,rgba(22,20,18,0)_38%,rgba(22,20,18,0.04)_100%)]" />
          </div>
          <div className="mt-4 h-px bg-[rgba(22,20,18,0.1)]" />

          <div className="mt-10 grid grid-cols-12 gap-8">
            <article className="col-span-12 lg:col-span-8">
              <div className="max-w-[720px] space-y-[92px]">
                <section id="sec-01" className="scroll-mt-24 space-y-5">
                  <div className="inline-flex items-center gap-3">
                    <p className="text-[11.5px] leading-[1.25] tracking-[0.15em] text-[rgba(22,20,18,0.56)]">SECTION 01</p>
                    <span className="h-px w-8 bg-[rgba(22,20,18,0.18)]" />
                  </div>
                  <Paragraph text={`ヨハン・セバスチャン・バッハは\n今日では誰もが認める巨匠です。`} />
                  <Paragraph text={`しかしその作品が広く再評価されたのは、\n19世紀、メンデルスゾーンによる復活演奏以降のことでした。`} />
                  <Paragraph text={`真に優れたものは、\n必ずしも最初から正しく評価されるとは限りません。`} />
                </section>

                <section
                  id="sec-02"
                  className="scroll-mt-24 rounded-[16px] border border-[rgba(22,20,18,0.12)] bg-[rgba(255,255,255,0.5)] px-5 py-5"
                >
                  <div className="inline-flex items-center gap-3">
                    <p className="text-[11.5px] leading-[1.25] tracking-[0.15em] text-[rgba(22,20,18,0.56)]">SECTION 02</p>
                    <span className="h-px w-8 bg-[rgba(22,20,18,0.18)]" />
                  </div>
                  <Paragraph text={`一方、【体感覚】（Kinesthetic／キネステティック）というのは、受け取り手の感覚が整っているとき、感覚的にそれを深く理解し、強い共鳴を起こします。\nその共鳴は、好みや流行を超えて、原型的（Archetypal）であり、正典的（Canonical）であり、超越的（Transcendent）な何か、\n──美しさや真理のようなものへ触れる感覚を伴います。\nFINDESTは、\n評価を基準に選んだのではありません。`} />
                </section>

                <section id="sec-03" className="scroll-mt-24 space-y-5">
                  <div className="inline-flex items-center gap-3">
                    <p className="text-[11.5px] leading-[1.25] tracking-[0.15em] text-[rgba(22,20,18,0.56)]">SECTION 03</p>
                    <span className="h-px w-8 bg-[rgba(22,20,18,0.18)]" />
                  </div>
                  <Paragraph text={`30年前、情報が今ほど整っていない時代に\nドイツ13生産地域に渡り、\nひとつの地域につき数十軒単位で試飲を重ね、`} />
                  <Paragraph text={`「これは何かを表している！」と立ち止まり、\n（give one pause）体感で選び続けました。`} />
                  <Paragraph text={`その中の多くが、\n後に三つ星、四つ星、五つ星へと評価を高めていった。`} />
                  <Paragraph text={`結果として\n世界規準で評価される生産者と\n長く取引を続けることになったのです。`} />
                  <Paragraph text={`そこで、FINDESTは、その体感の整え方を、誰にでも共有可能な形へ落とし込むことにフォーカスしています。`} />
                </section>

                <section id="tool-01" className="scroll-mt-24 space-y-5 border-t border-[rgba(22,20,18,0.1)] pt-8">
                  <div className="inline-flex items-center gap-3">
                    <p className="text-[11.5px] leading-[1.25] tracking-[0.15em] text-[rgba(22,20,18,0.56)]">TOOL 01</p>
                    <span className="h-px w-8 bg-[rgba(22,20,18,0.18)]" />
                  </div>
                  <div className={`flex items-center gap-3 ${headingReveal('tool-01')}`} data-thought-heading="tool-01">
                    <ToolSigil kind="sahou" />
                    <h2 className="font-serif text-[21px] font-medium leading-[1.45] [text-wrap:balance]">ワイン作法</h2>
                  </div>
                  <figure className="overflow-hidden rounded-[14px] border border-[rgba(22,20,18,0.1)] bg-[rgba(255,255,255,0.56)]">
                    <div className="relative aspect-[16/10]">
                      <Image src="/story/saho.jpg" alt="ワイン作法" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 720px" />
                    </div>
                  </figure>
                  <Paragraph text={`姿勢や呼吸を通して、\n五感を静かに整え、\n先入観や緊張をほどきます。\n【思考モード】から【体感 kinestheticモード】へ\n受取手が整った状態で向き合うと、\nワインは本来の表情を現します。\n姿勢、呼吸、間、観察。\nFINDESTは（瞑想行の正規指導にも関わる背景があるからこそ）、五感だけに頼らず、体感を一瞬で整えるための入り口を再現性ある形で提示します。`} />
                </section>

                <section id="tool-03" className="scroll-mt-24 space-y-5 border-t border-[rgba(22,20,18,0.1)] pt-8">
                  <div className="inline-flex items-center gap-3">
                    <p className="text-[11.5px] leading-[1.25] tracking-[0.15em] text-[rgba(22,20,18,0.56)]">TOOL 02</p>
                    <span className="h-px w-8 bg-[rgba(22,20,18,0.18)]" />
                  </div>
                  <div className={`flex items-center gap-3 ${headingReveal('tool-03')}`} data-thought-heading="tool-03">
                    <ToolSigil kind="element" />
                    <h2 className="font-serif text-[21px] font-medium leading-[1.45] [text-wrap:balance]">エレメントセレクションカード</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <figure className="overflow-visible rounded-[14px] border border-[rgba(22,20,18,0.1)] bg-white p-[14px] shadow-[0_6px_18px_rgba(22,20,18,0.04)] sm:p-[20px]">
                      <div className="relative flex h-[200px] w-full items-center justify-center sm:h-[280px]">
                        <Image src="/story/element-1.png" alt="エレメントセレクションカード 1" fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw" />
                      </div>
                    </figure>
                    <figure className="overflow-visible rounded-[14px] border border-[rgba(22,20,18,0.1)] bg-white p-[14px] shadow-[0_6px_18px_rgba(22,20,18,0.04)] sm:p-[20px]">
                      <div className="relative flex h-[200px] w-full items-center justify-center sm:h-[280px]">
                        <Image src="/story/element-2.png" alt="エレメントセレクションカード 2" fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw" />
                      </div>
                    </figure>
                  </div>
                  <figure className="overflow-visible rounded-[14px] border border-[rgba(22,20,18,0.1)] bg-white p-[14px] shadow-[0_6px_18px_rgba(22,20,18,0.04)] sm:p-[20px]">
                    <div className="relative flex h-[240px] w-full items-center justify-center sm:h-[360px]">
                      <Image src="/story/menu.jpg" alt="エレメントセレクションカード menu" fill className="object-contain" sizes="(max-width: 1024px) 100vw, 720px" />
                    </div>
                  </figure>
                  <Paragraph text={`ワインを専門用語で説明するのではなく、\n生産者の人物像、生き方、背景、そしてワインが醸し出す雰囲気を、\n「シンボリックなワード」や「デザイン」で現したもの。\nお客様は自分の感覚で選び、スタッフはリラックスして語れる状態を、このカードがつくります。`} />
                </section>

                <section id="tool-02" className="scroll-mt-24 space-y-5 border-t border-[rgba(22,20,18,0.1)] pt-8">
                  <div className="inline-flex items-center gap-3">
                    <p className="text-[11.5px] leading-[1.25] tracking-[0.15em] text-[rgba(22,20,18,0.56)]">TOOL 03</p>
                    <span className="h-px w-8 bg-[rgba(22,20,18,0.18)]" />
                  </div>
                  <div className={`flex items-center gap-3 ${headingReveal('tool-02')}`} data-thought-heading="tool-02">
                    <ToolSigil kind="mirror" />
                    <h2 className="font-serif text-[21px] font-medium leading-[1.45] [text-wrap:balance]">ミラーティスティング</h2>
                  </div>
                  <figure className="overflow-hidden rounded-[14px] border border-[rgba(22,20,18,0.1)] bg-[rgba(255,255,255,0.56)]">
                    <div className="relative aspect-[16/10]">
                      <Image src="/story/kagami.jpg" alt="ミラーティスティング" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 720px" />
                    </div>
                  </figure>
                  <p className="rounded-[12px] border border-[rgba(22,20,18,0.1)] border-l-[2px] border-l-[rgba(180,146,97,0.58)] bg-[rgba(255,255,255,0.46)] px-4 py-3 text-[15px] leading-[1.75] text-[rgba(22,20,18,0.84)]">
                    この一杯から、どんな出来事を思い出しましたか？
                  </p>
                  <Paragraph text={`③　ミラーティスティングは、
ワインを“鏡”として使い、
一杯から浮かんだ印象や記憶を共有した後に、そのワインの背景を知る。
その一致や重なりに、参加者は静かな驚きを覚えます。
ワインは、無意識と対話する媒介になり得るのです。`} />
                </section>

                <section className="space-y-5 rounded-[18px] border border-[rgba(22,20,18,0.13)] bg-[rgba(255,255,255,0.52)] px-5 py-8">
                  <div className="inline-flex items-center gap-3">
                    <p className="text-[11.5px] leading-[1.25] tracking-[0.15em] text-[rgba(22,20,18,0.56)]">SECTION 05</p>
                    <span className="h-px w-8 bg-[rgba(22,20,18,0.18)]" />
                  </div>
                  <Paragraph text={`■ 私たちが目指すもの\n\nFINDESTが大切にしているのは、\n\nワインの販売だけではなく、\nワインを通して育つ審美眼です。\n\n受け取る側が整えば、\n生み出す側の質も自然と高まります。\n\nそれはワインに限らず、\n文化そのものの成熟につながります。`} />
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center rounded-[12px] border border-[rgba(22,20,18,0.18)] bg-[rgba(22,20,18,0.92)] px-5 py-3 text-[14px] text-white transition hover:bg-[rgba(22,20,18,0.98)]"
                    >
                      導入相談
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center rounded-[12px] border border-[rgba(22,20,18,0.18)] bg-[rgba(255,255,255,0.75)] px-5 py-3 text-[14px] text-[rgba(22,20,18,0.92)] transition hover:bg-[rgba(255,255,255,0.92)]"
                    >
                      資料請求PDF
                    </Link>
                  </div>
                </section>

              </div>
            </article>

            <aside className="col-span-12 hidden lg:col-span-4 lg:block">
              <div className="sticky top-24">
                <nav
                  aria-label="このページの構造"
                  className="relative overflow-hidden rounded-[16px] border border-[rgba(22,20,18,0.14)] bg-[rgba(255,255,255,0.48)] px-4 py-5 shadow-[0_14px_34px_rgba(0,0,0,0.06)] backdrop-blur-[8px]"
                >
                  <div className="mb-1 flex items-center justify-between px-1">
                    <h3 className="font-serif text-[20px] text-[rgba(22,20,18,0.9)]">このページの構造</h3>
                    <span className="text-[11px] tracking-[0.12em] text-[rgba(22,20,18,0.6)]">{Math.round(progress * 100)}%</span>
                  </div>
                  <span className="absolute bottom-4 right-4 top-[58px] w-px bg-[rgba(22,20,18,0.1)]" />
                  <span
                    className="absolute right-4 top-[58px] w-px bg-[rgba(22,20,18,0.35)]"
                    style={{ height: `calc((100% - 74px) * ${progress})` }}
                  />
                  <ul className="mt-4 space-y-1">
                    {toc.map((item, idx) => {
                      const isActive = item.id === activeId;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            aria-current={isActive ? 'location' : undefined}
                            onClick={(event) => {
                              event.preventDefault();
                              scrollToId(item.id);
                            }}
                            className={`relative grid grid-cols-[26px_1fr] items-start gap-2 rounded-[10px] px-2 py-2 text-left transition ${
                              isActive
                                ? 'bg-[rgba(22,20,18,0.05)] text-[rgba(22,20,18,0.9)]'
                                : 'text-[rgba(22,20,18,0.66)] hover:bg-[rgba(255,255,255,0.76)] hover:text-[rgba(22,20,18,0.86)]'
                            }`}
                          >
                            <span className="text-[11px] tracking-[0.15em]">{String(idx + 1).padStart(2, '0')}</span>
                            <span className="text-[13px] leading-[1.45]">{item.label}</span>
                            {isActive ? (
                              <>
                                <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-[999px] bg-[rgba(22,20,18,0.55)]" />
                                <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[rgba(22,20,18,0.5)]" />
                              </>
                            ) : null}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>

        {tocOpen ? (
          <div className="fixed inset-0 z-[80] flex items-end bg-[rgba(16,14,12,0.38)] lg:hidden" onClick={() => setTocOpen(false)}>
            <div
              className="w-full rounded-t-[18px] border border-[rgba(22,20,18,0.12)] bg-[#f5f0e8] px-4 pb-6 pt-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[12px] tracking-[0.14em] text-[rgba(22,20,18,0.72)]">目次</p>
                <button
                  type="button"
                  onClick={() => setTocOpen(false)}
                  className="rounded-[999px] border border-[rgba(22,20,18,0.14)] px-3 py-1 text-[12px] text-[rgba(22,20,18,0.72)]"
                >
                  閉じる
                </button>
              </div>
              <ul className="space-y-1">
                {toc.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setTocOpen(false);
                        window.setTimeout(() => scrollToId(item.id), 10);
                      }}
                      className="grid grid-cols-[26px_1fr] items-start gap-2 rounded-[10px] px-2 py-2 text-[rgba(22,20,18,0.84)] hover:bg-[rgba(255,255,255,0.72)]"
                    >
                      <span className="text-[11px] tracking-[0.14em]">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="text-[13px] leading-[1.45]">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTocOpen(true)}
            className="inline-flex items-center rounded-[999px] border border-[rgba(22,20,18,0.16)] bg-[rgba(255,255,255,0.72)] px-4 py-2 text-[12px] tracking-[0.08em] text-[rgba(22,20,18,0.82)] shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-[6px] transition hover:bg-[rgba(255,255,255,0.9)] lg:hidden"
          >
            目次
          </button>
          {showBackTop ? (
            <button
              type="button"
              aria-label="ページ上部へ戻る"
              onClick={() => scrollToId('top')}
              className="inline-flex items-center rounded-[999px] border border-[rgba(22,20,18,0.16)] bg-[rgba(255,255,255,0.72)] px-4 py-2 text-[12px] tracking-[0.08em] text-[rgba(22,20,18,0.82)] shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-[6px] transition hover:bg-[rgba(255,255,255,0.9)]"
            >
              トップへ戻る
            </button>
          ) : null}
        </div>
      </main>
    </>
  );
}
