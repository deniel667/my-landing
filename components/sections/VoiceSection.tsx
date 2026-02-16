import Image from 'next/image';

type Testimonial = {
  id: string;
  tag: string;
  body: string;
  signature: string;
  withPhoto?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: 'voice-a',
    tag: 'ゲスト',
    body: `ワインは知識がないと楽しめないものだと思っていました。

でも、音楽家とワインを重ねた表現や、
感じ方を教えてもらったことで、
初めて飲むのに懐かしさを感じ、不思議な体験でした。

ワインは「飲むもの」ではなく、
「体験するもの」だと感じました。`,
    signature: 'ゲスト様',
    withPhoto: true,
  },
  {
    id: 'voice-b',
    tag: '代理店',
    body: `まだ日本では数少ない希少なワインを扱え、
周りの方が喜んでもらえるワインです。

フィンデストさんの提案は、
「MKティスティング作法」や芸術視点からのアプローチなどがあり、紹介先に胸を張ってシェアできるのが魅力だと感じました。

自分の好きを仕事にでき、提供した先も喜んでくれるワインは安心して勧められます。`,
    signature: '代理店様',
  },
  {
    id: 'voice-c',
    tag: '飲食店',
    body: `ワイナリーの歴史や秘話と、
私たちの店の想いが重なるワインを提案してくださいます。そのおかげで、
店舗のブランディングが一段上がりました。

そして、飲むとやはり「すごい」と感じるワインです。`,
    signature: '飲食店様',
  },
  {
    id: 'voice-d',
    tag: '飲食店',
    body: `人手不足で、本当はソムリエが丁寧にご案内したい時間帯でも、
それが叶わない現実がありました。

FINDESTさんはかつて25年にわたるレストラン多店舗経営のご経験の知見と、別事業でのサポート・コンサル業での伴走力を基に、弊社の場に合わせた形を一緒に考えていただけるので、心強いです。

弊社ですぐ使えるツールも提示いただき、
「これなら私たちでも伝えられる」と思えたのが導入の決め手です。

ゲスト様にも好評で、ワインを通じたスタッフ教育にもつながっています。`,
    signature: '飲食店様',
  },
];

export default function VoiceSection() {
  const photoCaption = 'イベントの一場面';

  return (
    <section className="voice-layout panel-section section-reveal-root">
      <div className="grid12 voice-main-grid">
        <header className="voice-head section-cap section-reveal reveal-delay-0">
          <p className="voice-eyebrow">VOICE / 現場の声</p>
          <h2 className="voice-title">導入店舗・体験者の声</h2>
          <p className="voice-desc">導入後の現場で実感された変化をご紹介します。</p>

          <div className="voice-cta-row">
            <a href="#contact" className="cta-button cta-button-ink voice-cta">導入相談</a>
            <a href="#contact" className="voice-cta-textlink">試飲の相談</a>
          </div>
        </header>

        <div className="voice-cards-grid">
          {testimonials.map((item, index) => {
            const revealDelayClass = index < 2 ? 'reveal-delay-1' : 'reveal-delay-2';
            const body = item.body.replace(/\n{2,}/g, '\n');

            return (
              <article key={item.id} className={`voice-card ${revealDelayClass} section-reveal`}>
                <p className="voice-card-tag">{item.tag}</p>
                {item.withPhoto ? (
                  <>
                    <div className="voice-card-photo">
                      <Image src="/story/voice-1.jpg" alt={photoCaption} fill className="object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
                    </div>
                    <p className="voice-card-caption">{photoCaption}</p>
                  </>
                ) : null}
                <p className="voice-card-quote">{body}</p>
                <p className="voice-card-sign">— {item.signature}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
