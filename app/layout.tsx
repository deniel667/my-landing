import type { Metadata } from 'next';
import Script from 'next/script';
import { EB_Garamond, Kaisei_Tokumin, Montserrat, Noto_Sans_JP, Noto_Serif_JP, Zen_Old_Mincho } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans_JP({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const notoSerif = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const zenOldMincho = Zen_Old_Mincho({
  variable: '--font-jp-display',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

const kaiseiTokumin = Kaisei_Tokumin({
  variable: '--font-jp-alt',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
});

const ebGaramond = EB_Garamond({
  variable: '--font-en',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const CACHE_REV = '2026-02-16-1305';

export const metadata: Metadata = {
  title: 'FINDEST',
  description: 'German Wine Specialists',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <Script src="//typesquare.com/3/tsst/script/ja/typesquare.js?60cc056642f8410eb48d31d0e90393a3" strategy="beforeInteractive" />
        <Script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?80f78LLNTUM%3D&box=LzwzK3bXsVs%3D&aa=1&ab=2" strategy="beforeInteractive" />
      </head>
      <body
        data-rev={CACHE_REV}
        className={`${notoSans.variable} ${notoSerif.variable} ${zenOldMincho.variable} ${kaiseiTokumin.variable} ${ebGaramond.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
