import Link from 'next/link';

export default function WineryBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="パンくず" className="text-[11px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.5)]">
      <ol className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 p-0" style={{ listStyle: 'none' }}>
        <li>
          <Link href="/" className="text-inherit no-underline transition-colors hover:text-[rgba(31,27,22,0.78)]">
            ホーム
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/wineries" className="text-inherit no-underline transition-colors hover:text-[rgba(31,27,22,0.78)]">
            ワイナリー
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-[rgba(31,27,22,0.76)]">{current}</li>
      </ol>
    </nav>
  );
}
