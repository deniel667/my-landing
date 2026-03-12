import Image from 'next/image';
import CornerWash from '@/components/ui/CornerWash';

export default function FoundationSection() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-16 sm:px-8 lg:px-12 lg:py-20" aria-label="foundation section">
        <div className="relative w-full overflow-hidden rounded-2xl border border-black/5 bg-[color:var(--bg)] p-10 lg:p-12">
          <CornerWash
            corner="tl"
            size={520}
            mobileSize={400}
            opacity={0.2}
            mobileOpacity={0.16}
            offset={112}
            background="radial-gradient(circle at 25% 25%, rgba(124,92,255,0.80) 0%, rgba(255,92,168,0.36) 28%, rgba(255,170,92,0.24) 52%, rgba(0,0,0,0) 72%)"
          />
          <div className="relative z-10 grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
            <div className="min-w-0">
              <p className="section-kicker foundation-kicker">F O U N D A T I O N / 表 現 の 背 景</p>
              <h2 className="section-title-mincho foundation-title break-keep hyphens-none [text-wrap:balance]">
                <span className="foundation-title-line">表現の現場を、</span>
                <span className="foundation-title-line">知り尽くしているから</span>
              </h2>

              <div className="foundation-fulltext">
                <p className="foundation-lead-copy">この表現が可能なのは、代表のこれまでの経験が大きく関係しています。</p>

                <div className="foundation-proof-list" aria-label="3つの根拠">
                  <div className="foundation-proof-row">
                    <p className="foundation-proof-label">現場</p>
                    <p className="foundation-proof-body">
                      代表は、飲食店を数十店舗運営し、人材育成と現場運営に長年携わってきました。忙しい現場の中で、「どうすれば無理なく、伝わるのか」を研究し続けてきたのです。
                    </p>
                  </div>

                  <div className="foundation-proof-row">
                    <p className="foundation-proof-label">表現</p>
                    <p className="foundation-proof-body">
                      また学生時代には、芸術大学で音楽を専攻し、構造としての「時間・緊張・余白」を学びました。さらに心理領域でも、人の感性や内面に向き合う活動を続けています。
                    </p>
                  </div>

                  <div className="foundation-proof-row">
                    <p className="foundation-proof-label">信頼</p>
                    <p className="foundation-proof-body">
                      生産者とは初期から直接対話を重ね、今も年に数回、密なコミュニケーションを取り続けています。現場・芸術・心理・生産者との信頼そのすべてが重なり、FINDESTのスタイルが生まれました。
                    </p>
                  </div>
                </div>
              </div>

              <div className="foundation-cta-wrap">
                <a href="#contact" className="cta-button cta-button-ink foundation-cta-button">
                  <span>導入相談</span>
                  <span className="foundation-cta-arrow" aria-hidden="true">→</span>
                </a>
                <p className="foundation-cta-note">※初回はヒアリングから（30分）</p>
              </div>
            </div>

            <div className="min-w-0 grid content-start gap-5">
              <figure className="foundation-portrait">
                <div className="foundation-portrait-media">
                  <Image
                    src="/story/story-main-president-v2.png"
                    alt="代表写真"
                    fill
                    className="object-cover object-[50%_28%]"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                </div>
                <figcaption className="foundation-photo-caption">※ 参 考 写 真 （ 過 去 の 現 場 よ り ）</figcaption>
              </figure>

              <figure className="foundation-strip" aria-label="proof strip">
                <p className="foundation-strip-label">FIELD SNAPSHOTS / 現場記録</p>
                <div className="foundation-strip-media">
                  <Image
                    src="/story/story-trip-collage.jpg"
                    alt="代表と生産者の現場記録"
                    fill
                    className="object-cover object-center foundation-strip-image"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                </div>
                <figcaption className="foundation-strip-caption">代表と生産者の対話の記録</figcaption>
              </figure>
            </div>
          </div>
        </div>
    </div>
  );
}
