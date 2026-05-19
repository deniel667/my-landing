import Link from 'next/link';

export default function WineryBackLink() {
  return (
    <Link
      href="/wineries"
      className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] text-[rgba(31,27,22,0.68)] no-underline transition-colors hover:text-[rgba(31,27,22,0.92)]"
    >
      <span aria-hidden="true">←</span>
      <span>ワイナリー一覧へ戻る</span>
    </Link>
  );
}
