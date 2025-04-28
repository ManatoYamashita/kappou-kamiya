import React from 'react';
import Link from 'next/link';

// ボタンのプロパティ型定義
interface BtnProps {
  text: string; // ボタンのテキスト
  href?: string; // リンク先URL（省略可能）
  onClick?: () => void; // クリックイベントハンドラ（省略可能）
  color?: 'black' | 'white'; // ボタンの色（省略可能）
  loading?: boolean; // 読み込み中かどうか（省略可能）
}

/**
 * アニメーション付きボタンコンポーネント
 * @param text ボタンに表示するテキスト
 * @param href リンク先URL（指定された場合はLinkコンポーネントとしてレンダリング）
 * @param onClick クリック時のコールバック関数
 * @param color ボタンの色（'black'または'white'）
 * @param loading 読み込み中の状態を表示するかどうか
 */
const Btn: React.FC<BtnProps> = ({ 
  text, 
  href, 
  onClick, 
  color = 'black', 
  loading = false 
}) => {
  // テキストの色とアンダーラインの色を設定
  const textColor = color === 'white' ? 'text-white' : 'text-black';
  const underlineColor = color === 'white' ? 'after:bg-white' : 'after:bg-black';
  
  // SVGの色を設定
  const svgFill = color === 'white' ? 'white' : 'black';
  
  // ボタンの内部コンテンツ（共通部分）
  const buttonContent = (
    <>
      <span className={`relative pb-7 pr-4 uppercase text-sm tracking-wider ${textColor} after:content-[''] after:absolute after:w-full after:h-0.5 ${underlineColor} after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-hover:after:origin-bottom-left flex items-center`}>
        {loading ? (
          // ローディングスピナー表示
          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke={svgFill} strokeWidth="4"></circle>
            <path className="opacity-75" fill={svgFill} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {loading ? '読み込み中...' : text}
      </span>
      <svg
        className={`transform -translate-x-2 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-active:scale-90 ${loading ? 'opacity-50' : 'opacity-100'}`}
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="10"
        viewBox="0 0 46 16"
      >
        <path
          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
          transform="translate(30)"
          fill={svgFill}
        />
      </svg>
    </>
  );

  // 共通のクラス
  const commonClasses = "border-none bg-transparent cursor-pointer flex items-center group";
  const disabledClasses = loading ? "pointer-events-none opacity-80" : "";
  const combinedClasses = `${commonClasses} ${disabledClasses}`;

  // hrefが指定されている場合はLinkでラップ
  if (href) {
    return (
      <Link 
        href={loading ? '#' : href} 
        className={combinedClasses}
        onClick={loading ? (e) => e.preventDefault() : undefined}
        aria-disabled={loading}
        aria-label={loading ? '読み込み中...' : text}
      >
        {buttonContent}
      </Link>
    );
  }
  
  // hrefがない場合はbuttonでラップ
  return (
    <button
      type="button"
      className={combinedClasses}
      onClick={onClick}
      disabled={loading}
    >
      {buttonContent}
    </button>
  );
};

export default Btn;
