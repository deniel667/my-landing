export default function ProducerStorySection() {
  return (
    <section id="producer-story" className="section-padding px-6 md:px-12 border-t border-line chapter-target">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="fade-in-block">
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-3">Producer Story</p>
          <h2 className="font-serif text-3xl mb-4">生産者の背景と思想</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            どの銘柄を売るかではなく、誰がどの思想で造っているかまで遡って選定します。
          </p>
        </div>
        <div className="fade-in-block border border-line bg-white p-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            産地・畑・醸造・人柄を含めて文脈を共有し、現場で再現できる表現へ落とし込みます。
          </p>
        </div>
      </div>
    </section>
  );
}
