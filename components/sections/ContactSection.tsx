'use client';

import { useEffect, useRef, useState } from 'react';
import { showSiteToast } from '../ui/SiteToast';

const businessOptions = ['レストラン', 'バー', 'ホテル', '小売', 'その他'] as const;
const successMessage = '送信が完了しました。内容を確認のうえ、担当者よりご連絡いたします。';
const errorMessage = '送信できませんでした。恐れ入りますが、時間をおいて再度お試しください。';

type ContactSectionProps = {
  source?: 'Homepage Contact' | 'Private June Selection';
};

export default function ContactSection({ source = 'Homepage Contact' }: ContactSectionProps) {
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

  const resetForm = () => {
    setName('');
    setCompany('');
    setEmail('');
    setMessage('');
    setBusinessType('レストラン');
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      showSiteToast('必須項目（お名前・メールアドレス・お問い合わせ内容）をご入力ください。', 'error');
      return;
    }

    setIsSubmitting(true);
    showSiteToast('送信中です…', 'info');

    try {
      await postToSupport({
        source,
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
      showSiteToast(errorMessage, 'error');
      return;
    }

    setIsSubmitting(false);
    resetForm();
    showSiteToast(successMessage, 'success');
  };

  const handlePdfRequest = async () => {
    if (!name.trim() || !email.trim()) {
      showSiteToast('資料希望の送信には「お名前」と「メールアドレス」をご入力ください。', 'error');
      return;
    }

    setIsPdfSubmitting(true);
    showSiteToast('送信中です…', 'info');

    try {
      await postToSupport({
        source,
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: '',
        businessType,
        products: '',
        quantity: '',
        notes: message.trim() || '資料希望',
        requestsPdf: 'あり（PDF）',
      });
    } catch (error) {
      console.error(error);
      setIsPdfSubmitting(false);
      showSiteToast(errorMessage, 'error');
      return;
    }

    setIsPdfSubmitting(false);
    resetForm();
    showSiteToast(successMessage, 'success');
  };

  return (
    <section id="contact-final" className="contactSection">
      <div className="contactInner">
        <div className="contactGrid">
          <div className="contactCopy">
            <div className="contactKicker">CONTACT</div>
            <h2 className="section-title-mincho contactTitle break-keep hyphens-none [text-wrap:balance]">
              導入相談・お問い合わせ
            </h2>
            <p className="contactLead">
              商品のお取り扱い、業務用導入、試飲、在庫・ヴィンテージに関するご相談など、内容に応じてご案内いたします。
            </p>

            <ul className="contactPoints">
              <li>導入先の業態やご用途に合わせたご提案</li>
              <li>在庫・ヴィンテージ・資料共有のご相談</li>
              <li>試飲やお取引開始に向けた初回相談</li>
            </ul>

            <div className="contactMeta">
              <span className="metaPill">通常 1〜2 営業日以内にご返信</span>
              <span className="metaPill">日本語 / English 対応</span>
            </div>
          </div>

          <div className="contactPanel">
            <div className="panelHead">
              <div className="panelTitle">ご相談内容</div>
              <div className="panelSub">必要事項をご入力ください。</div>
            </div>

            <div className="panelForm" role="form" aria-label="導入相談・お問い合わせフォーム">
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
                  <span className="label">メールアドレス</span>
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
                    <span className="selectChevron" aria-hidden="true">
                      ▾
                    </span>
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
                <span className="label">お問い合わせ内容</span>
                <textarea
                  className="input textarea"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="例）業務用導入を検討しています。希望価格帯や資料送付について相談したいです。"
                />
              </label>

              <div className="panelActions">
                <button type="button" className="btnPrimary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? '送信中…' : '送信する'}
                </button>
                <button type="button" className="btnGhost" onClick={handlePdfRequest} disabled={isPdfSubmitting}>
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
