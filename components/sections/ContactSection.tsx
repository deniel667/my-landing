'use client';

import { useEffect, useRef, useState } from 'react';

const businessOptions = ['レストラン', 'バー', 'ホテル', '小売', 'その他'] as const;

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [businessType, setBusinessType] = useState<(typeof businessOptions)[number]>('レストラン');
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

  return (
    <section id="contact-final" className="contactSection">
      <div className="contactInner">
        <div className="contactGrid">
          <div className="contactCopy">
            <div className="contactKicker">CONTACT</div>
            <h2 className="contactTitle">導入相談・お問い合わせ</h2>
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
                  <input className="input" name="name" type="text" placeholder="例）山田 太郎" />
                </label>

                <label className="field">
                  <span className="label">会社名</span>
                  <input className="input" name="company" type="text" placeholder="例）ABC Restaurant" />
                </label>
              </div>

              <div className="fieldRow">
                <label className="field">
                  <span className="label">メール</span>
                  <input className="input" name="email" type="email" placeholder="example@mail.com" />
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
                  placeholder="例）導入検討中。価格帯は◯◯、スパークリング中心..."
                />
              </label>

              <div className="panelActions">
                <button type="button" className="btnPrimary">送信する</button>
                <button type="button" className="btnGhost">資料を希望（PDF）</button>
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
