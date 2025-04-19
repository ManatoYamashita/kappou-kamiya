import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="text-3xl font-mincho mb-4">ページが見つかりません</h2>
      <p className="mb-8">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent text-white rounded transition hover:bg-accent/80"
      >
        トップページに戻る
      </Link>
    </div>
  );
} 