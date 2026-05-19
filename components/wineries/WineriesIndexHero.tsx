export default function WineriesIndexHero() {
  return (
    <section className="border-b border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(251,247,242,0.28))]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 sm:px-8 sm:py-18 lg:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)] lg:gap-14 lg:px-12 lg:py-24">
        <div className="space-y-7">
          <p className="m-0 text-[11px] uppercase tracking-[0.28em] text-[rgba(31,27,22,0.56)]">ワイナリー一覧</p>
          <h1 className="section-title-mincho m-0 max-w-[11ch] text-[clamp(2.5rem,4.8vw,4.7rem)] leading-[1.08] tracking-[0.008em] text-[var(--ink)]">
            FINDEST が扱う
            <br />
            ワイナリー
          </h1>

          <div className="max-w-[63ch] space-y-4.5 text-[15.4px] leading-[1.94] text-[rgba(31,27,22,0.8)]">
            <p className="m-0">
              FINDEST は、ワインを単体の商品としてではなく、料理、場の温度、言葉の選び方まで含めて成立する体験として捉えています。ここでは、その背景にある造り手を、静かな編集視点で紹介しています。
            </p>
            <p className="m-0">
              ただ銘柄を並べるのではなく、土地の文脈、家の継続性、そして現場で自然に伝わる品格まで含めて見渡せること。個々のワイナリーの輪郭が、次の提案へつながる入口になるよう整えています。
            </p>
          </div>

          <a
            href="#wineries-grid"
            className="inline-flex items-center gap-2 pt-1 text-[12px] tracking-[0.14em] text-[rgba(31,27,22,0.8)] no-underline transition-colors hover:text-[rgba(31,27,22,1)]"
          >
            <span>ワイナリーを見る</span>
            <span aria-hidden="true" className="transition-transform duration-200 hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        <aside className="self-end rounded-[24px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(248,242,235,0.78))] px-6 py-6 shadow-[0_18px_36px_rgba(19,16,13,0.04)] sm:px-7 sm:py-7">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]">Selection View</p>
              <h2 className="section-title-mincho m-0 max-w-[10ch] text-[clamp(1.42rem,2vw,1.74rem)] leading-[1.34] tracking-[0.01em] text-[var(--ink)]">
                選定の視点
              </h2>
            </div>

            <p className="m-0 text-[13.5px] leading-[1.86] text-[rgba(31,27,22,0.72)]">
              造り手の背景まで含めて、提案の場で自然に説明できるか。その観点から、土地・品質・継続性を静かに見極めています。
            </p>

            <ul className="m-0 grid gap-3.5 p-0 text-[13.6px] leading-[1.78] text-[rgba(31,27,22,0.8)]" style={{ listStyle: 'none' }}>
              <li className="border-t border-[rgba(31,27,22,0.08)] pt-3">品質の再現性があること</li>
              <li className="border-t border-[rgba(31,27,22,0.08)] pt-3">土地や家の文脈を言葉にできること</li>
              <li className="border-t border-[rgba(31,27,22,0.08)] pt-3">飲食店や売場で自然に機能すること</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
