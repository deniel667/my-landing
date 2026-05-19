export type WineryDetailTemplateKey = 'editorial-reference';

export type WinerySectionRole =
  | 'illustration'
  | 'overview'
  | 'heritage-renewal'
  | 'wine-focus'
  | 'recognition'
  | 'award'
  | 'essay'
  | 'gallery'
  | 'video'
  | 'wines'
  | 'inquiry'
  | 'navigation';

export const EDITORIAL_WINERY_REFERENCE_TEMPLATE = {
  key: 'editorial-reference' as const,
  name: 'Editorial Winery Detail Reference',
  narrativeFlow: [
    'hero',
    'overview',
    'heritage-renewal',
    'wine-focus',
    'recognition',
    'award',
    'gallery',
    'video',
    'wines',
    'inquiry',
    'navigation',
  ] as const,
  notes: {
    hero: 'Large image-led first screen with an integrated editorial info card.',
    overview: 'Why FINDEST works with this winery, supported by compact fact cards.',
    heritageRenewal: 'House history, generational logic, and estate renewal.',
    wineFocus: 'A representative wine or varietal used to explain house character.',
    recognition: 'Long-term validation, scan-friendly facts, and supporting narrative.',
    award: 'Source-based award or recognition block with concise factual structure.',
    gallery: 'One dominant image with a curated supporting hierarchy.',
    video: 'Quiet full-width media emphasis without heavy explanation.',
    wines: 'Curated equal-card bottle grid that stays editorial rather than e-commerce.',
    inquiry: 'Calm premium B2B CTA with a clear next step.',
    navigation: 'Elegant continuation to other wineries.',
  },
};

export function getVisibleWinerySections<T extends { id: string }>(sections: T[], hiddenSectionIds: string[] = []) {
  if (!hiddenSectionIds.length) return sections;
  const hidden = new Set(hiddenSectionIds);
  return sections.filter((section) => !hidden.has(section.id));
}

export function getRotatedWineries<T extends { slug: string }>(wineries: T[], currentSlug: string) {
  const index = wineries.findIndex((entry) => entry.slug === currentSlug);
  if (index < 0) return wineries.filter((entry) => entry.slug !== currentSlug);

  return Array.from({ length: Math.max(0, wineries.length - 1) }, (_, offset) => wineries[(index + 1 + offset) % wineries.length]).filter(
    (entry) => entry.slug !== currentSlug
  );
}
