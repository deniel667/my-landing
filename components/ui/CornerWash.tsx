type CornerWashProps = {
  corner?: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  mobileSize?: number;
  opacity?: number;
  mobileOpacity?: number;
  offset?: number;
  className?: string;
  background?: string;
};

const gradientOrigins = {
  tl: '25% 25%',
  tr: '75% 25%',
  bl: '25% 75%',
  br: '75% 75%',
} as const;

type CornerWashStyle = React.CSSProperties & {
  '--corner-opacity-mobile': string;
  '--corner-opacity-desktop': string;
};

export default function CornerWash({
  corner = 'tl',
  size = 520,
  mobileSize,
  opacity = 0.2,
  mobileOpacity,
  offset = 112,
  className = '',
  background,
}: CornerWashProps) {
  const resolvedMobileSize = mobileSize ?? 400;
  const resolvedMobileOpacity = mobileOpacity ?? 0.16;
  const washId = `${corner}-${size}-${resolvedMobileSize}-${opacity}-${resolvedMobileOpacity}-${offset}`
    .replace(/\./g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '');
  const anchoredStyle =
    corner === 'tl'
      ? { top: `-${offset}px`, left: `-${offset}px` }
      : corner === 'tr'
        ? { top: `-${offset}px`, right: `-${offset}px` }
        : corner === 'bl'
          ? { bottom: `-${offset}px`, left: `-${offset}px` }
          : { bottom: `-${offset}px`, right: `-${offset}px` };

  const washStyle: CornerWashStyle = {
    '--corner-opacity-mobile': String(resolvedMobileOpacity),
    '--corner-opacity-desktop': String(opacity),
    width: `clamp(${resolvedMobileSize}px, 32vw, ${size}px)`,
    height: `clamp(${resolvedMobileSize}px, 32vw, ${size}px)`,
    ...anchoredStyle,
    background:
      background ??
      `radial-gradient(circle at ${gradientOrigins[corner]}, rgba(124,92,255,0.80) 0%, rgba(255,92,168,0.36) 28%, rgba(255,170,92,0.24) 52%, rgba(0,0,0,0) 72%)`,
  };

  return (
    <>
      <div
        aria-hidden="true"
        data-corner-wash={washId}
        className={`corner-wash pointer-events-none absolute z-0 blur-3xl${className ? ` ${className}` : ''}`}
        style={washStyle}
      />
      <style>{`
        [data-corner-wash="${washId}"] {
          opacity: ${resolvedMobileOpacity};
        }

        @media (min-width: 768px) {
          [data-corner-wash="${washId}"] {
            opacity: ${opacity};
          }
        }
      `}</style>
    </>
  );
}
