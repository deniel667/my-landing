export default function FooterSection() {
  return (
    <footer className="footer-wrap px-6 md:px-8 py-12">
      <div className="shell footer-inner">
        <div>
          <h2 className="brand-main text-base break-keep hyphens-none [text-wrap:balance]">FINDEST</h2>
          <p className="brand-sub mt-1">German Wine Curation</p>
        </div>
        <div className="footer-links">
          <a href="/contact#company">会社概要</a>
          <a href="/contact#contact">お問い合わせ</a>
          <a href="https://www.instagram.com/findest_japan/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
