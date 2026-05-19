'use client';

import Link from 'next/link';

export default function BackgroundTeaserSection() {
  return (
    <section id="background-teaser" className="relative pt-8 pb-12 lg:pt-10 lg:pb-16">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
        <div className="section-inner section-inner--tight top-rule pt-0">
          <div className="grid gap-8 rounded-[28px] border border-[rgba(31,27,22,0.08)] bg-[rgba(252,249,242,0.72)] p-6 shadow-[0_24px_60px_rgba(31,24,18,0.06)] lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.78fr)] lg:gap-12 lg:p-8">
            <div className="space-y-4">
              <p className="section-kicker">
                <span className="tracking-[0.35em]">BACKGROUND</span>
                <span className="mx-2 tracking-[0.08em]">/</span>
                <span className="tracking-[0.08em]">表現の背景</span>
              </p>
              <h2 className="section-title-mincho break-keep hyphens-none [text-wrap:balance]">
                表現がどう生まれ、
                <br />
                どう現場へ届くか
              </h2>
            </div>

            <div className="space-y-4 text-[0.98rem] leading-8 text-[rgba(33,29,25,0.8)]">
              <p>
                理念だけではなく、関係性、現場、選定の背景まで含めて読むためのページとして、
                「表現の背景」を独立させました。
              </p>
              <p>
                HOME では要点だけを、詳しい成り立ちや文脈は新しい読み物ページでご覧いただけます。
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/background" className="cta-button cta-button-ink">
                  表現の背景を見る →
                </Link>
                <Link href="/thought" className="cta-button">
                  思想ページへ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
