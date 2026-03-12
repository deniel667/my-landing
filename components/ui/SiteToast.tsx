'use client';

import { useEffect, useRef, useState } from 'react';

type ToastKind = 'info' | 'success' | 'error';

type ToastItem = {
  id: number;
  message: string;
  kind: ToastKind;
  ttl: number;
};

type SiteToastDetail = {
  message: string;
  kind?: ToastKind;
};

declare global {
  interface WindowEventMap {
    'site:toast': CustomEvent<SiteToastDetail>;
  }
}

export function showSiteToast(message: string, kind: ToastKind = 'info') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('site:toast', { detail: { message, kind } }));
}

export default function SiteToast() {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(1);

  useEffect(() => {
    const onToast = (event: CustomEvent<SiteToastDetail>) => {
      const message = event.detail?.message?.trim();
      if (!message) return;

      const id = idRef.current++;
      const kind = event.detail?.kind ?? 'info';
      const ttl = kind === 'success' ? 3200 : 3600;
      setItems((prev) => [...prev, { id, message, kind, ttl }]);

      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, ttl);
    };

    window.addEventListener('site:toast', onToast as EventListener);
    return () => window.removeEventListener('site:toast', onToast as EventListener);
  }, []);

  if (items.length === 0) return null;

  const getToastTitle = (kind: ToastKind) => {
    if (kind === 'success') return '送信完了';
    if (kind === 'error') return '入力内容をご確認ください';
    return 'ご案内';
  };

  return (
    <div className="site-toast-root" role="status" aria-live="polite">
      {items.map((item) => (
        <div key={item.id} className={`site-toast site-toast-${item.kind}`}>
          <div className="site-toast-head">
            <span className="site-toast-dot" aria-hidden="true" />
            <p className="site-toast-title">{getToastTitle(item.kind)}</p>
            <button
              type="button"
              className="site-toast-close"
              aria-label="閉じる"
              onClick={() => setItems((prev) => prev.filter((toast) => toast.id !== item.id))}
            >
              ×
            </button>
          </div>
          <p className="site-toast-message">{item.message}</p>
          <span className="site-toast-progress" style={{ animationDuration: `${item.ttl}ms` }} aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
