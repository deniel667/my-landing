'use client';

import { useEffect, useRef, useState } from 'react';
import { showSiteToast } from '../ui/SiteToast';

const businessOptions = ['レストラン', 'バー', 'ホテル', '小売', 'その他'] as const;
export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [businessType, setBusinessType] = useState<(typeof businessOptions)[number]>('レストラン');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPdfSubmitting, setIsPdfSubmitting] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!selectRef.current) return;
      if (!selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const postToSupport = async (payload: {
    source: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    businessType: string;
    products: string;
    quantity: string;
    notes: string;
    requestsPdf: string;
  }) => {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = (await response.json()) as { ok?: boolean };
    if (!result.ok) {
      throw new Error('submit failed');
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      showSiteToast('必須項目（お名前・メール・内容）を入力してください。', 'error');
      return;
    }

    setIsSubmitting(true);
    showSiteToast('送信中です…', 'info');

    try {
      await postToSupport({
        source: 'Homepage Contact',
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: '',
        businessType,
        products: '',
        quantity: '',
        notes: message.trim(),
        requestsPdf: 'なし',
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      showSiteToast('送信できませんでした。恐れ入りますが、時間をおいて再度お試しください。', 'error');
      return;
    }

    setIsSubmitting(false);
    setName('');
    setCompany('');
    setEmail('');
    setMessage('');
    setBusinessType('レストラン');
    showSiteToast('送信が完了しました。内容を確認のうえ、担当者よりご連絡いたします。', 'success');
    window.setTimeout(() => {
      showSiteToast('担当者より1〜2営業日以内にご連絡いたします。', 'info');
    }, 650);
  };

  const handlePdfRequest = async () => {
    if (!name.trim() || !email.trim()) {
      showSiteToast('資料請求には「お名前」と「メール」を入力してください。', 'error');
      return;
    }

    setIsPdfSubmitting(true);
    showSiteToast('資料請求を送信中です…', 'info');

    try {
      await postToSupport({
        source: 'Homepage Contact',
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: '',
        businessType,
        products: '',
        quantity: '',
        notes: message.trim() || '資料請求のみ',
        requestsPdf: 'あり（PDF）',
      });
    } catch (error) {
      console.error(error);
      setIsPdfSubmitting(false);
      showSiteToast('送信できませんでした。恐れ入りますが、時間をおいて再度お試しください。', 'error');
      return;
    }

    setIsPdfSubmitting(false);
    showSiteToast('送信が完了しました。内容を確認のうえ、担当者よりご連絡いたします。', 'success');
    window.setTimeout(() => {
      showSiteToast('担当者より1〜2営業日以内にご連絡いたします。', 'info');
    }, 650);
  };

  return (
    <section id="contact-final" className="contactSection">
      <div className="contactInner">
        <div className="contactGrid">
          <div className="contactCopy">
            <div className="contactKicker">CONTACT</div>
            <h2 className="section-title-mincho contactTitle break-keep hyphens-none [text-wrap:balance]">導入相談・お問い合わせ</h2>
            <p className="contactLead">
              レストラン／ホテル／小売・法人向けに、導入提案・資料送付・試飲会のご相談を承ります。
            </p>

            <ul className="contactPoints">
              <li>目的・業態に合わせた提案</li>
              <li>ラインナップ／価格帯の整理</li>
              <li>資料（PDF）・テック情報の共有</li>
            </ul>

            <div className="contactMeta">
              <span className="metaPill">通常 1-2 営業日以内に返信</span>
              <span className="metaPill">日本語／英語 対応</span>
            </div>
          </div>

          <div className="contactPanel">
            <div className="panelHead">
              <div className="panelTitle">ご相談内容</div>
              <div className="panelSub">必要事項をご入力ください。</div>
            </div>

            <div className="panelForm" role="form" aria-label="contact form">
              <div className="fieldRow">
                <label className="field">
                  <span className="label">お名前</span>
                  <input
                    className="input"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="例）山田 太郎"
                  />
                </label>

                <label className="field">
                  <span className="label">会社名</span>
                  <input
                    className="input"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="例）ABC Restaurant"
                  />
                </label>
              </div>

              <div className="fieldRow">
                <label className="field">
                  <span className="label">メール</span>
                  <input
                    className="input"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="example@mail.com"
                  />
                </label>

                <div className="field customSelectField" ref={selectRef}>
                  <span className="label">業態</span>
                  <input type="hidden" name="businessType" value={businessType} />
                  <button
                    type="button"
                    className={`input selectTrigger ${isOpen ? 'is-open' : ''}`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <span>{businessType}</span>
                    <span className="selectChevron" aria-hidden="true">▾</span>
                  </button>
                  {isOpen ? (
                    <div className="selectMenu" role="listbox" aria-label="業態">
                      {businessOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          role="option"
                          aria-selected={businessType === option}
                          className={`selectOption ${businessType === option ? 'is-active' : ''}`}
                          onClick={() => {
                            setBusinessType(option);
                            setIsOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <label className="field">
                <span className="label">内容</span>
                <textarea
                  className="input textarea"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="例）導入検討中。価格帯は◯◯、スパークリング中心..."
                />
              </label>

              <div className="panelActions">
                <button type="button" className="btnPrimary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? '送信中…' : '送信する'}
                </button>
                <button
                  type="button"
                  className="btnGhost"
                  onClick={handlePdfRequest}
                  disabled={isPdfSubmitting}
                >
                  {isPdfSubmitting ? '送信中…' : '資料を希望（PDF）'}
                </button>
              </div>

              <div className="panelFoot">
                <span className="fine">送信によりプライバシーポリシーに同意したものとします。</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
