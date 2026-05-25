import type { Metadata } from 'next';
import FooterSection from '@/components/sections/FooterSection';
import JuneSelectionClient from '@/components/seasonal/JuneSelectionClient';

export const metadata: Metadata = {
  title: '初夏のワインセレクション | FINDEST',
  description: 'FINDEST JAPAN private seasonal wine selection for June.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function JunePrivateSelectionPage() {
  return (
    <>
      <JuneSelectionClient />
      <FooterSection />
    </>
  );
}
