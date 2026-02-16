'use client';

import React from 'react';

type Variant = 'heroDark' | 'philosophy' | 'relations' | 'neutral';
type Layout = 'A' | 'B' | 'C';

export default function NorenBlobs({
  variant = 'neutral',
  layout = 'A',
  className = '',
}: {
  variant?: Variant;
  layout?: Layout;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`noren-blobs noren-blobs--${variant} noren-blobs--${layout} ${className}`}>
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
      <span className="veil" />
    </div>
  );
}
