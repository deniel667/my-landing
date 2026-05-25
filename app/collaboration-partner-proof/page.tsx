'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteToast, { showSiteToast } from '@/components/ui/SiteToast';

type RequestMode = 'meeting' | 'ir_pdf';

function CopyBlock({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-line text-[16.6px] leading-[2.02] tracking-[0.01em] text-[rgba(24,22,19,0.94)] [text-wrap:pretty] [line-break:strict]">
      {text}
    </p>
  );
}

export default function CollaborationPartnerProofPage() {
  const toc = useMemo(
    () => [
      { id: 'pos', label: '重要点' },
      { id: 'proof', label: '実績' },
      { id: 'case-1', label: 'Case 1' },
      { id: 'case-2', label: 'Case 2' },
      { id: 'summary-ir', label: 'IRまとめ' },
      { id: 'what', label: '役割' },
      { id: 'partner', label: '協働可能領域' },
      { id: 'cta', label: '面談' },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? 'pos');
  const [modalOpen, setModalOpen] = useState(false);
  const [requestMode, setRequestMode] = useState<RequestMode>('meeting');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector<HTMLElement>('.site-nav');
    const offset = (nav?.getBoundingClientRect().height ?? 72) + 18;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  useEffect(() => {
    const targets = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        rootMargin: '-18% 0px -70% 0px',
        threshold: [0.08, 0.16, 0.3, 0.5],
      }
    );

    targets.forEach((target) => io.observe(target));
    return () => io.disconnect();
  }, [toc]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const postToSupport = async (payload: {
    source: string;
    subject: string;
    replyTo: string;
    fields: Array<{ label: string; value: string }>;
  }) => {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = (await response.json()) as { ok?: boolean };
    if (!result.ok) throw new Error('submit failed');
  };

  const openModal = (mode: RequestMode) => {
    setRequestMode(mode);
    setModalOpen(true);
  };

  const handleSubmitModal = async () => {
    if (!name.trim() || !email.trim()) {
      showSiteToast('「お名前」と「メール」を入力してください。', 'error');
      return;
    }

    setIsSubmitting(true);
    showSiteToast('送信中です…', 'info');

    const isMeeting = requestMode === 'meeting';
    try {
      await postToSupport({
        source: 'Collaboration Partner Proof',
        subject: isMeeting ? '【FINDEST WEB】IR面談依頼' : '【FINDEST WEB】IR概要資料請求',
        replyTo: email.trim(),
        fields: [
          { label: '種別', value: isMeeting ? '面談依頼' : 'IR概要資料請求' },
          { label: 'お名前', value: name.trim() },
          { label: '会社名', value: company.trim() || '未入力' },
          { label: 'メール', value: email.trim() },
          { label: '内容', value: message.trim() || (isMeeting ? '面談希望' : '資料請求希望') },
        ],
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      showSiteToast('送信に失敗しました。時間をおいて再度お試しください。', 'error');
      return;
    }

    setIsSubmitting(false);
    setModalOpen(false);
    setName('');
    setCompany('');
    setEmail('');
    setMessage('');
    showSiteToast('送信が完了しました。ありがとうございます。', 'success');
    window.setTimeout(() => {
      showSiteToast('担当者より1-2営業日以内にご連絡いたします。', 'info');
    }, 650);
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f5f0e8] pt-20 text-[rgba(24,22,19,0.94)] sm:pt-24">
        <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 sm:px-6">
          <header className="rounded-[18px] border border-[rgba(24,22,19,0.1)] bg-[rgba(255,255,255,0.42)] px-5 py-8 shadow-[0_4px_10px_rgba(0,0,0,0.03)] sm:px-8">
            <p className="text-[11px] tracking-[0.15em] text-[rgba(24,22,19,0.62)]">COLLABORATION PARTNER / PROOF</p>
            <h1 className="mt-3 font-serif text-[31px] leading-[1.35] text-[rgba(24,22,19,0.96)] sm:text-[36px]">協働パートナー向けページ（S様用）</h1>
            <p className="mt-3 text-[15px] leading-[1.78] text-[rgba(24,22,19,0.76)]">「哲学」ではなく「実証」。再現可能な実例と構造。</p>
            <p className="mt-4 rounded-[12px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.55)] px-4 py-3 text-[14px] leading-[1.8] text-[rgba(24,22,19,0.86)]">
              抽象（理念・テーマ）を、再現可能な構造に落とし、場のKPIを動かす設計者
            </p>
            <div className="mt-4 rounded-[14px] border border-[rgba(24,22,19,0.11)] bg-[rgba(255,255,255,0.58)] p-3">
              <p className="px-2 text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.58)]">PROOF METRICS</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <div className="rounded-[10px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.75)] px-3 py-3">
                  <p className="text-[10px] tracking-[0.1em] text-[rgba(24,22,19,0.58)]">Case 1 / 商業空間</p>
                  <p className="mt-1 font-serif text-[30px] leading-[1.05] text-[rgba(24,22,19,0.95)]">7×</p>
                  <p className="mt-1 text-[11px] tracking-[0.1em] text-[rgba(24,22,19,0.62)]">売上</p>
                  <p className="mt-0.5 text-[12px] text-[rgba(24,22,19,0.76)]">歴代テナントの7倍</p>
                </div>
                <div className="rounded-[10px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.75)] px-3 py-3">
                  <p className="text-[10px] tracking-[0.1em] text-[rgba(24,22,19,0.58)]">Case 2 / 公共空間</p>
                  <p className="mt-1 font-serif text-[30px] leading-[1.05] text-[rgba(24,22,19,0.95)]">10万人+</p>
                  <p className="mt-1 text-[11px] tracking-[0.1em] text-[rgba(24,22,19,0.62)]">動員</p>
                  <p className="mt-0.5 text-[12px] text-[rgba(24,22,19,0.76)]">クリスマスマルクト実績</p>
                </div>
                <div className="rounded-[10px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.75)] px-3 py-3">
                  <p className="text-[11px] tracking-[0.1em] text-[rgba(24,22,19,0.58)]">再現性</p>
                  <p className="mt-1 font-serif text-[20px] leading-[1.25] text-[rgba(24,22,19,0.95)]">文化翻訳 × 空間設計 × KPI接続</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 space-y-[64px] lg:col-span-8">
              <section id="pos" className="max-w-[780px] scroll-mt-24 space-y-5">
                <h2 className="font-serif text-[25px] leading-[1.4]">ここは非常に重要です</h2>
                <div className="rounded-[14px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.56)] px-4 py-4">
                  <p className="mb-2 text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.56)]">IR CHECKLIST</p>
                  <CopyBlock
                    text={`Sさんのような方が知りたいのは、次の点です。

・本当にできるのか？
・どの規模で可能なのか？
・これまで何をやってきたのか？
・どうすれば再現できるのか？

そのため、このページは思想ではなく、「構造化された実例」として整理します。`}
                  />
                  <p className="mt-2 text-[12px] text-[rgba(24,22,19,0.62)]">→ 本ページでは「実例」で回答します。</p>
                </div>
              </section>

              <section id="proof" className="max-w-[780px] scroll-mt-24 space-y-5 border-t border-[rgba(24,22,19,0.1)] pt-8">
                <h2 className="font-serif text-[28px] leading-[1.38]">テーマを、現実に変えてきた実績</h2>
                <CopyBlock
                  text={`FINDESTは、ワインを卸すだけの存在ではありません。

テーマを具体化し、
場を変え、
集客と体験を同時に設計してきました。`}
                />
              </section>

              <section id="case-1" className="scroll-mt-24 rounded-[20px] border border-[rgba(24,22,19,0.1)] bg-[rgba(255,255,255,0.5)] px-5 py-6 sm:px-6">
                <p className="text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.56)]">Case 1</p>
                <h2 className="mt-2 font-serif text-[27px] leading-[1.4] [text-wrap:balance]">Case 1｜六本木ヒルズ ドイツレストラン</h2>
                <p className="mt-4 text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.56)]">EVIDENCE</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <a href="/story/rpng1.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/rpng1.jpg" alt="Roppongi 1" width={360} height={270} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/rpng2.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/rpng2.jpg" alt="Roppongi 2" width={360} height={270} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/rpng3.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/rpng3.jpg" alt="Roppongi 3" width={360} height={270} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/rpng4.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/rpng4.jpg" alt="Roppongi 4" width={360} height={270} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/rpng5.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/rpng5.jpg" alt="Roppongi 5" width={360} height={270} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/rpng6.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/rpng6.jpg" alt="Roppongi 6" width={360} height={270} className="h-full w-full object-cover" />
                  </a>
                </div>
                <div className="mt-4 space-y-4">
                  <CopyBlock
                    text={`ブランドビールを軸にしたドイツレストラン。

六本木ヒルズで私たちが行ったのは、飲食店の運営ではありません。
ドイツ文化を東京で再設計し、象徴を可視化し、体験を増幅させることでした。

商品を売るのではなく、“場の意味”を創る。
これがFINDESTの役割です。`}
                  />
                </div>

                <div className="mt-8 border-t border-[rgba(24,22,19,0.1)] pt-6">
                  <p className="mb-2 text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.56)]">DESIGN</p>
                  <h3 className="font-serif text-[22px] leading-[1.45]">本質的にやったこと（4つの設計）</h3>
                  <div className="mt-4 divide-y divide-[rgba(24,22,19,0.12)]">
                    {[
                      ['01', '1）文化翻訳（空間の再定義）', 'ヨーロッパの開放的空気を東京の都市空間に移植。\n共有テラスを交渉し、「街とつながる」場に変えた。'],
                      ['02', '2）象徴の可視化（アイコン設計）', '2メートルのビアグラス。\n商品を「飲み物」から「文化の象徴」に昇華。'],
                      ['03', '3）体験の温度設計（心理的ハードルを下げる）', '外から見える暖炉。\n“寒いドイツ”ではなく“温もりあるドイツ”を見せる。'],
                      ['04', '4）物語の増幅（記憶への定着）', '壁画・天井画。\n店を単なる飲食店から“文化空間”へ。\n\n* 滞在時間の延長\n* 記憶への定着'],
                    ].map(([step, title, description]) => (
                      <article key={step} className="grid grid-cols-[54px_1fr] gap-3 py-5">
                        <p className="pt-0.5 font-serif text-[28px] leading-[1] text-[rgba(24,22,19,0.35)]">{step}</p>
                        <div>
                          <h4 className="text-[14px] font-medium leading-[1.6] text-[rgba(24,22,19,0.92)]">{title}</h4>
                          <p className="mt-1 whitespace-pre-line text-[14px] leading-[1.85] text-[rgba(24,22,19,0.84)] [text-wrap:pretty] [line-break:strict]">
                            {description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <section className="mt-8 space-y-4 border-t border-[rgba(24,22,19,0.1)] pt-6">
                  <h3 className="font-serif text-[22px] leading-[1.45]">何をしたのか、一文で言うなら</h3>
                  <CopyBlock text={`FINDESTは、\n「ドイツ文化」という抽象を、東京の都市文脈で再設計し、体験として増幅させた。`} />
                </section>

                <section className="mt-6 rounded-[14px] border border-[rgba(24,22,19,0.1)] bg-[rgba(255,255,255,0.6)] px-4 py-4">
                  <h3 className="text-[14px] tracking-[0.08em] text-[rgba(24,22,19,0.7)]">さらに強くするなら（要約）</h3>
                  <CopyBlock
                    text={`FINDESTがやったこと

* ✔ 文化の再設計
* ✔ 空間の翻訳
* ✔ 象徴の創出
* ✔ 体験の温度調整
* ✔ 話題化の構造化`}
                  />
                </section>
                <div className="mt-4 rounded-[12px] border border-[rgba(24,22,19,0.14)] bg-[rgba(24,22,19,0.04)] px-4 py-3">
                  <p className="text-[10px] tracking-[0.14em] text-[rgba(24,22,19,0.58)]">RESULT</p>
                  <p className="mt-1 font-serif text-[26px] font-semibold leading-[1.28] text-[rgba(24,22,19,0.95)]">歴代テナントの7倍の売上</p>
                </div>
              </section>

              <section id="case-2" className="scroll-mt-24 rounded-[20px] border border-[rgba(24,22,19,0.1)] bg-[rgba(255,255,255,0.5)] px-5 py-6 sm:px-6">
                <p className="text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.56)]">Case 2</p>
                <h2 className="mt-2 font-serif text-[27px] leading-[1.4] [text-wrap:balance]">Case 2｜ドイツ・クリスマスマルクト（屋外イベント）</h2>
                <p className="mt-4 text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.56)]">EVIDENCE</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a href="/story/crsm1.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/crsm1.jpg" alt="Christmas 1" width={540} height={405} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/crsm2.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/crsm2.jpg" alt="Christmas 2" width={540} height={405} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/crsm3.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/crsm3.jpg" alt="Christmas 3" width={540} height={405} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/crsm4.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/crsm4.jpg" alt="Christmas 4" width={540} height={405} className="h-full w-full object-cover" />
                  </a>
                </div>
                <div className="mt-4 space-y-4">
                  <CopyBlock
                    text={`ドイツ文化を象徴する冬のイベント。

私たちは、単なる模倣ではなく“翻訳”を行いました。`}
                  />
                </div>
                <div className="mt-6 border-t border-[rgba(24,22,19,0.1)] pt-6">
                  <p className="mb-2 text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.56)]">DESIGN</p>
                  <h3 className="font-serif text-[22px] leading-[1.45]">実施したこと</h3>
                  <div className="mt-4 rounded-[12px] border border-[rgba(24,22,19,0.1)] bg-[rgba(255,255,255,0.56)] px-4 py-4">
                    <CopyBlock
                      text={`* ✔ シュトゥットガルト式の飾り屋根を採用
* ✔ 宗教的配慮を踏まえ、
  　マリア像ではなくグリム童話のキャラクターを
  　ドイツ職人チームに特注制作

文化的意味を理解し、
日本社会に適した形に再構築。`}
                    />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a href="/story/crsm5.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/crsm5.jpg" alt="Christmas 5" width={540} height={405} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/crsm6.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/crsm6.jpg" alt="Christmas 6" width={540} height={405} className="h-full w-full object-cover" />
                  </a>
                  <a href="/story/crsm7.jpg" target="_blank" rel="noreferrer" className="block aspect-[4/3] overflow-hidden rounded-[8px]">
                    <Image src="/story/crsm7.jpg" alt="Christmas 7" width={540} height={405} className="h-full w-full object-cover" />
                  </a>
                </div>
                <div className="mt-4 rounded-[12px] border border-[rgba(24,22,19,0.14)] bg-[rgba(24,22,19,0.04)] px-4 py-3">
                  <p className="text-[10px] tracking-[0.14em] text-[rgba(24,22,19,0.58)]">RESULT</p>
                  <p className="mt-1 font-serif text-[26px] font-semibold leading-[1.28] text-[rgba(24,22,19,0.95)]">10万人超の動員</p>
                </div>
              </section>

              <section id="summary-ir" className="max-w-[860px] scroll-mt-24 space-y-5 border-t border-[rgba(24,22,19,0.1)] pt-8">
                <h2 className="font-serif text-[24px] leading-[1.42]">2事例の実績（IRまとめ）</h2>
                <div className="overflow-hidden rounded-[14px] border border-[rgba(24,22,19,0.11)] bg-[rgba(255,255,255,0.56)]">
                  <div className="grid grid-cols-[1.1fr_.9fr_.8fr] border-b border-[rgba(24,22,19,0.1)] px-4 py-3 text-[11px] tracking-[0.12em] text-[rgba(24,22,19,0.58)]">
                    <p>事例</p>
                    <p>空間</p>
                    <p>成果</p>
                  </div>
                  <div className="grid grid-cols-[1.1fr_.9fr_.8fr] border-b border-[rgba(24,22,19,0.08)] px-4 py-4 text-[14px] leading-[1.7] text-[rgba(24,22,19,0.9)]">
                    <p>クリスマスマルクト</p>
                    <p>公共空間</p>
                    <p className="font-serif text-[24px] leading-[1.1]">10万人+</p>
                  </div>
                  <div className="grid grid-cols-[1.1fr_.9fr_.8fr] px-4 py-4 text-[14px] leading-[1.7] text-[rgba(24,22,19,0.9)]">
                    <p>六本木ヒルズ</p>
                    <p>商業空間</p>
                    <p className="font-serif text-[24px] leading-[1.1]">7×</p>
                  </div>
                </div>
                <div className="rounded-[10px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.58)] px-4 py-3">
                  <p className="text-[12px] tracking-[0.12em] text-[rgba(24,22,19,0.68)]">抽象 → 構造 → KPI</p>
                </div>
              </section>

              <section id="what" className="max-w-[760px] scroll-mt-24 space-y-5 border-t border-[rgba(24,22,19,0.1)] pt-8">
                <h2 className="font-serif text-[24px] leading-[1.42]">何をしているのか</h2>
                <p className="text-[16.6px] leading-[2.02] text-[rgba(24,22,19,0.94)]">FINDESTは、</p>
                <ul className="grid gap-3 text-[16px] leading-[1.95] text-[rgba(24,22,19,0.9)] sm:grid-cols-2">
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />テーマを抽象で終わらせない</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />文化を翻訳する</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />世界観を具現化する</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />話題性を設計する</li>
                  <li className="flex items-start gap-2 sm:col-span-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />感動を構造化する</li>
                </ul>
                <p className="text-[16.6px] leading-[2.02] text-[rgba(24,22,19,0.94)]">という役割を担っています。</p>
              </section>

              <section id="partner" className="max-w-[760px] scroll-mt-24 space-y-5 border-t border-[rgba(24,22,19,0.1)] pt-8">
                <h2 className="font-serif text-[24px] leading-[1.42]">協働パートナーと何ができるか</h2>
                <p className="text-[16.6px] leading-[2.02] text-[rgba(24,22,19,0.94)]">IRや経営者コミュニティ、アートイベントなどで、</p>
                <ul className="grid gap-3 text-[16px] leading-[1.95] text-[rgba(24,22,19,0.9)] sm:grid-cols-2">
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />テーマを具体化するワイン設計</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />生産者の哲学を翻訳</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />体験型プログラム（ミラー／作法）設計</li>
                  <li className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />“語りたくなる素材”の提供</li>
                  <li className="flex items-start gap-2 sm:col-span-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(24,22,19,0.55)]" />継続的な文化構造づくり</li>
                </ul>
                <p className="text-[16.6px] leading-[2.02] text-[rgba(24,22,19,0.94)]">を共に行えます。</p>
              </section>

              <section id="definition" className="max-w-[760px] scroll-mt-24 rounded-[18px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.52)] px-6 py-8">
                <p className="text-[12px] tracking-[0.14em] text-[rgba(24,22,19,0.6)]">一言で言えば</p>
                <p className="mt-3 font-serif text-[30px] leading-[1.45] text-[rgba(24,22,19,0.95)]">
                  理念を“液体”にし、
                  <br />
                  それを“場”に変える設計者です。
                </p>
              </section>

              <section id="cta" className="max-w-[760px] scroll-mt-24 space-y-5 border-t border-[rgba(24,22,19,0.1)] pt-8">
                <h2 className="font-serif text-[24px] leading-[1.42]">S様に刺さる一文</h2>
                <p className="text-[17px] leading-[1.95] text-[rgba(24,22,19,0.92)]">
                  あなたの場に、まだ誰も体験したことのない
                  <br />
                  <strong>“文化的衝撃”を設計しませんか。</strong>
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      openModal('meeting');
                    }}
                    className="inline-flex items-center justify-center rounded-[12px] border border-[rgba(24,22,19,0.18)] bg-[rgba(24,22,19,0.92)] px-5 py-3 text-[14px] text-white transition hover:bg-[rgba(24,22,19,0.98)]"
                  >
                    面談を依頼する
                  </a>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      openModal('ir_pdf');
                    }}
                    className="inline-flex items-center justify-center rounded-[12px] border border-[rgba(24,22,19,0.18)] bg-[rgba(255,255,255,0.74)] px-5 py-3 text-[14px] text-[rgba(24,22,19,0.92)] transition hover:bg-[rgba(255,255,255,0.92)]"
                  >
                    IR概要資料を受け取る
                  </a>
                </div>
                <p className="text-[12px] text-[rgba(24,22,19,0.64)]">※原則1営業日以内に返信</p>
              </section>
            </div>

            <aside className="col-span-12 hidden lg:col-span-4 lg:block">
              <div className="sticky top-24">
                <nav
                  aria-label="このページの構造"
                  className="rounded-[16px] border border-[rgba(24,22,19,0.12)] bg-[rgba(255,255,255,0.46)] px-4 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                >
                  <h3 className="font-serif text-[20px] text-[rgba(24,22,19,0.9)]">このページの構造</h3>
                  <ul className="mt-3 space-y-1">
                    {toc.map((item) => {
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
                            className={`relative block rounded-[10px] px-3 py-2 text-[13px] leading-[1.45] transition ${
                              isActive
                                ? 'bg-[rgba(24,22,19,0.06)] font-medium text-[rgba(24,22,19,0.92)]'
                                : 'text-[rgba(24,22,19,0.72)] hover:bg-[rgba(255,255,255,0.72)]'
                            }`}
                          >
                            {isActive ? (
                              <span className="absolute left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[rgba(24,22,19,0.58)]" />
                            ) : null}
                            <span className={isActive ? 'pl-3' : ''}>{item.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="mt-4 inline-flex rounded-[10px] border border-[rgba(24,22,19,0.15)] px-3 py-1.5 text-[12px] text-[rgba(24,22,19,0.74)] transition hover:bg-[rgba(255,255,255,0.72)]"
                  >
                    TOPへ
                  </button>
                </nav>
              </div>
            </aside>
          </div>
        </div>

        {modalOpen ? (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(18,16,14,0.5)] p-4" onClick={() => setModalOpen(false)}>
            <div
              className="w-full max-w-[620px] rounded-[16px] border border-[rgba(24,22,19,0.16)] bg-[#f5f0e8] p-5 shadow-[0_24px_56px_rgba(0,0,0,0.22)] sm:p-6"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="IR request form"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] tracking-[0.14em] text-[rgba(24,22,19,0.62)]">IR REQUEST</p>
                  <h3 className="mt-1 font-serif text-[24px] leading-[1.35] text-[rgba(24,22,19,0.95)]">
                    {requestMode === 'meeting' ? '面談依頼フォーム' : 'IR概要資料請求フォーム'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[rgba(24,22,19,0.16)] text-[rgba(24,22,19,0.72)] hover:bg-[rgba(255,255,255,0.7)]"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[12px] text-[rgba(24,22,19,0.72)]">お名前</span>
                  <input
                    className="h-10 w-full rounded-[10px] border border-[rgba(24,22,19,0.14)] bg-[rgba(255,255,255,0.72)] px-3 text-[14px] outline-none focus:border-[rgba(180,146,97,0.45)]"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="例）山田 太郎"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[12px] text-[rgba(24,22,19,0.72)]">会社名</span>
                  <input
                    className="h-10 w-full rounded-[10px] border border-[rgba(24,22,19,0.14)] bg-[rgba(255,255,255,0.72)] px-3 text-[14px] outline-none focus:border-[rgba(180,146,97,0.45)]"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="例）ABC Holdings"
                  />
                </label>
              </div>

              <label className="mt-3 block">
                <span className="mb-1 block text-[12px] text-[rgba(24,22,19,0.72)]">メール</span>
                <input
                  type="email"
                  className="h-10 w-full rounded-[10px] border border-[rgba(24,22,19,0.14)] bg-[rgba(255,255,255,0.72)] px-3 text-[14px] outline-none focus:border-[rgba(180,146,97,0.45)]"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@mail.com"
                />
              </label>

              <label className="mt-3 block">
                <span className="mb-1 block text-[12px] text-[rgba(24,22,19,0.72)]">内容</span>
                <textarea
                  className="min-h-[110px] w-full rounded-[10px] border border-[rgba(24,22,19,0.14)] bg-[rgba(255,255,255,0.72)] px-3 py-2 text-[14px] outline-none focus:border-[rgba(180,146,97,0.45)]"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={requestMode === 'meeting' ? '面談希望日時・目的など' : '資料送付先やご要望など'}
                />
              </label>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleSubmitModal}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-[12px] border border-[rgba(24,22,19,0.18)] bg-[rgba(24,22,19,0.92)] px-5 py-3 text-[14px] text-white transition hover:bg-[rgba(24,22,19,0.98)] disabled:opacity-70"
                >
                  {isSubmitting ? '送信中…' : '送信する'}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex items-center justify-center rounded-[12px] border border-[rgba(24,22,19,0.18)] bg-[rgba(255,255,255,0.74)] px-5 py-3 text-[14px] text-[rgba(24,22,19,0.92)] transition hover:bg-[rgba(255,255,255,0.92)]"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
      <SiteToast />
    </>
  );
}
