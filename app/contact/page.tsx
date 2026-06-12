import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import SiteToast from '@/components/ui/SiteToast';

const contactTitle = 'お問い合わせ・会社概要 | FINDEST JAPAN';
const contactDescription =
  'FINDEST JAPANへの商品取扱い、業務用導入、試飲、在庫・ヴィンテージに関するお問い合わせと会社概要。';
const canonicalUrl = 'https://wine.findest-japan.com/contact';
const supportEmail = 'support@zato-trd.co.jp';
const supportPhone = '03-6804-8735';
const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('〒155-0031 東京都世田谷区北沢1丁目10番27号');

export const metadata: Metadata = {
  title: contactTitle,
  description: contactDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: contactTitle,
    description: contactDescription,
    url: canonicalUrl,
    siteName: 'FINDEST JAPAN',
    type: 'website',
    locale: 'ja_JP',
  },
};

const companyRows = [
  { label: '会社名', value: '株式会社FINDEST' },
  { label: 'ブランド名', value: 'FINDEST JAPAN' },
  {
    label: '所在地',
    value: (
      <>
        〒155-0031
        <br />
        東京都世田谷区北沢1丁目10番27号
      </>
    ),
  },
  {
    label: '電話番号',
    value: (
      <a href="tel:0368048735" className="underline decoration-[rgba(31,27,22,0.18)] underline-offset-4">
        {supportPhone}
      </a>
    ),
  },
  {
    label: 'メールアドレス',
    value: (
      <a href={`mailto:${supportEmail}`} className="underline decoration-[rgba(31,27,22,0.18)] underline-offset-4">
        {supportEmail}
      </a>
    ),
  },
  {
    label: '事業内容',
    value: (
      <>
        ドイツワインを中心とする酒類の輸入、卸売および販売
        <br />
        飲食店、ホテル、ワインバー、酒販店等への業務用商品の提案・導入支援
      </>
    ),
  },
  {
    label: 'ウェブサイト',
    value: (
      <a href="https://wine.findest-japan.com/" className="underline decoration-[rgba(31,27,22,0.18)] underline-offset-4">
        https://wine.findest-japan.com/
      </a>
    ),
  },
];

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社FINDEST',
  alternateName: 'FINDEST JAPAN',
  url: 'https://wine.findest-japan.com/',
  email: supportEmail,
  telephone: '+81-3-6804-8735',
  address: {
    '@type': 'PostalAddress',
    postalCode: '155-0031',
    addressRegion: '東京都',
    addressLocality: '世田谷区',
    streetAddress: '北沢1丁目10番27号',
    addressCountry: 'JP',
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="site-main pt-20 sm:pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <section className="mx-auto w-full max-w-[1120px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="relative overflow-hidden rounded-[30px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,252,246,0.99)_0%,rgba(247,239,228,0.92)_58%,rgba(244,235,225,0.78)_100%)] px-6 py-8 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] sm:px-7 sm:py-10 lg:px-8 lg:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-12 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(206,187,151,0.22),rgba(206,187,151,0.08)_46%,rgba(206,187,151,0)_76%)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 top-0 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(185,160,133,0.2),rgba(185,160,133,0.08)_46%,rgba(185,160,133,0)_76%)] blur-3xl"
            />
            <div className="relative max-w-[760px]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(31,27,22,0.58)]">CONTACT</p>
              <h1 className="mt-3 font-[var(--font-noto-serif-jp)] text-[clamp(2rem,4vw,3.1rem)] leading-[1.26] text-[rgba(24,22,19,0.96)]">
                お問い合わせ
              </h1>
              <p className="mt-5 text-[14px] leading-[1.95] text-[rgba(31,27,22,0.78)]">
                商品のお取り扱い、業務用導入、試飲、在庫・ヴィンテージに関するご相談など、
                <br className="hidden sm:block" />
                お気軽にお問い合わせください。
                <br />
                内容を確認のうえ、担当者よりご連絡いたします。
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-6 pb-8 sm:px-8 lg:px-12">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-[24px] border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.76)] px-5 py-5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.52)]">MAIL</p>
              <h2 className="mt-2 font-[var(--font-noto-serif-jp)] text-[1.32rem] text-[rgba(18,16,14,0.96)]">メールでのお問い合わせ</h2>
              <a
                href={`mailto:${supportEmail}`}
                className="mt-3 inline-flex text-[0.98rem] text-[rgba(31,27,22,0.82)] underline decoration-[rgba(31,27,22,0.18)] underline-offset-4"
              >
                {supportEmail}
              </a>
            </div>

            <div className="rounded-[24px] border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.76)] px-5 py-5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.52)]">PHONE</p>
              <h2 className="mt-2 font-[var(--font-noto-serif-jp)] text-[1.32rem] text-[rgba(18,16,14,0.96)]">お電話でのお問い合わせ</h2>
              <a
                href="tel:0368048735"
                className="mt-3 inline-flex text-[0.98rem] text-[rgba(31,27,22,0.82)] underline decoration-[rgba(31,27,22,0.18)] underline-offset-4"
              >
                {supportPhone}
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="layout-section">
          <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
            <div className="bridgeWrap" aria-hidden="true">
              <div className="bridgeCard bridgeCard--noBtn">
                <span className="bridgeDot" />
                <span>下記フォームよりご相談内容をお送りください。</span>
              </div>
            </div>
            <ContactSection source="Homepage Contact" />
          </div>
        </section>

        <section id="company" className="layout-section">
          <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
            <div className="section-inner top-rule">
              <header className="section-headline">
                <p className="section-eyebrow">COMPANY</p>
                <h2 className="section-heading break-keep hyphens-none [text-wrap:balance]">会社概要</h2>
              </header>

              <div className="rounded-[26px] border border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(247,241,233,0.62)_100%)] px-5 py-4 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset] sm:px-6 sm:py-5">
                <dl className="divide-y divide-[rgba(31,27,22,0.08)]">
                  {companyRows.map((row) => (
                    <div key={row.label} className="grid gap-2 py-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-6">
                      <dt className="text-[12px] tracking-[0.12em] text-[rgba(31,27,22,0.56)]">{row.label}</dt>
                      <dd className="m-0 text-[0.96rem] leading-8 text-[rgba(24,22,19,0.9)]">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 pt-5">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-[0.92rem] text-[rgba(31,27,22,0.78)] underline decoration-[rgba(31,27,22,0.18)] underline-offset-4"
                  >
                    Google Mapsで見る
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
      <SiteToast />
    </>
  );
}
