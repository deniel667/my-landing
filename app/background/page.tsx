import type { ReactNode } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import FooterSection from '@/components/sections/FooterSection';
import FoundationSection from '@/components/sections/FoundationSection';
import StorySection from '@/components/sections/StorySection';
import NextStepSection from '@/components/sections/NextStepSection';

const philosophySections = [
  {
    title: '① 理念',
    paragraphs: [
      ['FINDESTと関わるすべての場には、', '共通する理念があります。'],
      ['それは、'],
      ['品位と丁寧さを守ること。', 'そして、自分軸を尊重すること。'],
      ['その理念を、', '私たちは二つの言葉で表しています。'],
      ['Sustainable Integrity（品位と丁寧さを守る）× Honoring Identity（自分軸を尊重）'],
    ],
  },
  {
    title: '② 目的',
    paragraphs: [
      ['FINDESTは、関わる場や人々において'],
      [
        '・近視眼的な消費や他人軸の評価に影響されていることに気付く',
        '・本質と向き合う姿勢を取り戻す',
        '・自分の感覚で受け取る',
      ],
      ['このようなステイタスを作り出し', 'ワインを通した文化的姿勢の再設計を目指しています。'],
    ],
  },
  {
    title: '③ 共鳴',
    paragraphs: [
      ['FINDESTは、共鳴します。'],
      ['志を持つ人、', '自分軸を大切にする姿勢。'],
      ['そこに共鳴したとき、', '私たちはワインを重ねます。'],
    ],
  },
  {
    title: '④ 構造',
    paragraphs: [
      ['品位と丁寧さを守り', '自分軸を尊重するために', '私たちは構造ある適応を選びます。', '→ Structured Adaptation'],
      ['それは、無秩序な拡大ではなく、', '関係性に応じて深度を整えていくものです。'],
    ],
  },
  {
    title: '⑤ 暖簾という発想～深度が深まった関係性～',
    paragraphs: [
      ['日本文化の【暖簾 ～Noren～】に着想を得て、', '私たちは近視眼的ではなく、', '品位と軸を保ちながら展開するスタイルを取り入れました。'],
      ['暖簾分けとは本来、', '本家の信用（屋号）を預けられる相手にだけ、', '営業の権利も責任も受け渡す日本の商慣行です。'],
      ['FINDESTがここから学ぶのは、', '“数を増やす”ことだけではなく、', '浅い理解ではなく深い理念と価値を崩さないための「型（約束事）」を共有することです。'],
      ['この暖簾システムは、後述の【公認パートナー】に適用されます。'],
    ],
  },
] as const;

const relationSections = [
  {
    title: '① 取扱店',
    paragraphs: [
      ['FINDESTワインを扱ってくださる場。既に流儀をお持ちの店舗。'],
      ['既存の流儀の中にワインを重ね、型を壊さずに寄り添う関係です。'],
      ['格あるお客様と、格ある生産者をこの場に繋げる'],
      ['店舗様固有の名称のワインパッケージを設計させていただき、お客様を繋ぐ。'],
    ],
  },
  {
    title: '② 共鳴パートナー',
    paragraphs: [
      ['ワインを卸すだけでなく、'],
      ['「店や組織などの場の自分軸を可視化する」ことをサポート'],
      ['それにより、その場の目標達成や「自分らしい成功」が実現化されます。'],
    ],
  },
  {
    title: '③ 場の創造パートナー',
    paragraphs: [],
  },
  {
    title: '④ 公認パートナー（暖簾システム）',
    paragraphs: [
      ['理念と世界観を理解し、「四つの軸」や「ワインMK作法」などを実践。表現の為の場を自ら持ち、地域やカテゴリーや分野、社会の文化的姿勢の再設計を共にしていただける方。表現を支えるためにFINDESTの構造が使えます。'],
      ['理念と構造を「型」として共有し、「FINDESTセレクトのワインを体験できる店・場」として紹介される暖簾を授け、共に体現する。'],
      ['自分らしさ、その場らしさの再発見サポート'],
    ],
  },
] as const;

function Paragraph({ lines, dark = false }: { lines: readonly string[]; dark?: boolean }) {
  return (
    <p className={dark ? 'text-[15px] leading-[2.05] text-white/86' : 'text-[15px] leading-[2.05] text-[rgba(31,27,22,0.82)]'}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}

function LightSection({
  id,
  label,
  title,
  introLines,
  children,
}: {
  id: string;
  label: string;
  title?: ReactNode;
  introLines?: readonly string[];
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-8 lg:py-10">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
        <div className="section-inner section-inner--tight top-rule pt-0">
          <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1fr)] lg:gap-14">
            <div className="space-y-3">
              <p className="section-kicker">{label}</p>
              {title ? (
                <h2 className="section-title-mincho break-keep hyphens-none [text-wrap:balance]">{title}</h2>
              ) : null}
              {introLines ? <Paragraph lines={introLines} /> : null}
            </div>
            <div className="space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BackgroundPage() {
  return (
    <>
      <SiteHeader />
      <main className="site-main bg-[color:var(--bg)] pt-20 sm:pt-24">
        <section id="philosophy" className="relative overflow-hidden bg-[#141923] py-12 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(174,197,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
          <div className="relative mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1fr)] lg:gap-14">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/62">PHILOSOPHY / 理念</p>
                <h1 className="section-title-mincho break-keep hyphens-none text-white [text-wrap:balance]">理念</h1>
                <Paragraph lines={['① 理念', '② 目的', '③ 共鳴', '④ 構造', '⑤ 暖簾']} dark />
              </div>
              <div className="space-y-8">
                {philosophySections.map((item) => (
                  <div key={item.title} className="space-y-4">
                    <h2 className="jp-serif-heading text-[20px] leading-9 tracking-[0.04em] text-white">
                      {item.title}
                    </h2>
                    <div className="space-y-4">
                      {item.paragraphs.map((lines, index) => (
                        <Paragraph key={`${item.title}-${index}`} lines={lines} dark />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <LightSection id="thought" label="THOUGHT / 思想">
          <div className="max-w-[720px] rounded-[20px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.65)] px-5 py-5 sm:px-6 sm:py-6">
            <div className="space-y-4">
              <p className="jp-serif-heading text-[22px] leading-9 tracking-[0.04em] text-[rgba(31,27,22,0.94)]">
                評価の前に、体感がある。
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/thought" className="cta-button cta-button-ink">
                  思想ページへ →
                </Link>
                <Link href="/thought#top" className="cta-button">
                  目次を見る
                </Link>
              </div>
            </div>
          </div>
        </LightSection>

        <LightSection
          id="relation"
          label="NOREN NETWORK / 関係性"
          title={
            <>
              FINDESTの
              <br />
              四つの関係性
            </>
          }
          introLines={['① 取扱店', '② 共鳴パートナー', '③ 場の創造パートナー', '④ 公認パートナー（暖簾システム）']}
        >
          {relationSections.map((item) => (
            <div key={item.title} className="space-y-4">
              <h3 className="jp-serif-heading text-[20px] leading-9 tracking-[0.04em] text-[rgba(31,27,22,0.94)]">
                {item.title}
              </h3>
              <div className="space-y-4">
                {item.paragraphs.map((lines, index) => (
                  <Paragraph key={`${item.title}-${index}`} lines={lines} />
                ))}
              </div>
            </div>
          ))}
        </LightSection>

        <section id="foundation">
          <FoundationSection />
        </section>

        <section id="story" className="relative py-8 lg:py-10">
          <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
            <div className="section-inner section-inner--tight top-rule pt-0">
              <StorySection />
            </div>
          </div>
        </section>

        <section id="contact">
          <NextStepSection />
        </section>

        <FooterSection />
      </main>
    </>
  );
}
