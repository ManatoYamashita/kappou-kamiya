import React from 'react';
import Link from 'next/link';

type BtnVariant = 'default' | 'primary' | 'primary-white';

interface BtnProps {
  text: string;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
  variant?: BtnVariant;
}

const variantClasses: Record<BtnVariant, string> = {
  default:
    'bg-[linear-gradient(90deg,transparent_0%,transparent_50%,#151515_50%)] bg-[length:200%_100%] bg-[position:0_0] text-ink border border-ink hover:bg-[position:100%_0] hover:text-[#f5f5f5] hover:-translate-y-0.5 hover:shadow-md',
  primary:
    'bg-[linear-gradient(90deg,#111111_0%,#111111_50%,#f5f5f5_50%)] bg-[length:200%_100%] bg-[position:0_0] text-[#f5f5f5] border border-[#111111] hover:bg-[position:100%_0] hover:text-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-md',
  'primary-white':
    'bg-[linear-gradient(90deg,#f1ecdf_0%,#f1ecdf_50%,#111111_50%)] bg-[length:200%_100%] bg-[position:0_0] text-[#1a1a1a] border border-[#f1ecdf] hover:bg-[position:100%_0] hover:text-[#f5f5f5] hover:-translate-y-0.5 hover:shadow-md'
};

const Btn: React.FC<BtnProps> = ({
  text,
  href,
  onClick,
  loading = false,
  target,
  rel,
  className = '',
  variant = 'default'
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-3 rounded-none px-6 py-3.5 text-base font-medium transition-all duration-300 will-change-transform overflow-hidden';
  const disabledClasses = loading ? 'pointer-events-none opacity-70' : '';
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();

  const content = (
    <>
      {loading ? (
        <span className="h-4 w-4 rounded-full border-2 border-current/70 border-t-transparent animate-spin" aria-hidden />
      ) : null}
      <span>{loading ? '読み込み中...' : text}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={loading ? '#' : href}
        className={combinedClasses}
        onClick={loading ? e => e.preventDefault() : undefined}
        aria-disabled={loading}
        aria-label={loading ? '読み込み中...' : text}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClasses} onClick={onClick} disabled={loading}>
      {content}
    </button>
  );
};

export default Btn;
