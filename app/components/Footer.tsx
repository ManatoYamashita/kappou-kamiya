import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ink text-paper py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-mincho text-xl mb-4">割烹 神谷</h3>
            <address className="not-italic leading-relaxed text-paper/80">
              〒332-0017<br />
              埼玉県川口市栄町2-1-26<br />
              神谷ビル1･2F<br />
              TEL: <Link href="tel:050-5487-4317" className="hover:text-accent transition-colors">050-5487-4317</Link>
            </address>
          </div>
          
          <div>
            <h3 className="font-mincho text-xl mb-4">営業時間</h3>
            <p className="text-paper/80 leading-relaxed">
              ランチ: 水～日・祝前日・祝日 11:30～14:30<br />
              ディナー: 火～日・祝前日・祝日 16:00～22:00<br />
              定休日: 月曜日
            </p>
          </div>
          
          <div>
            <h3 className="font-mincho text-xl mb-4">リンク</h3>
            <ul className="space-y-2 text-paper/80">
              <li>
                <Link href="/#concept" className="hover:text-accent transition-colors">店舗理念</Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-accent transition-colors">お品書き</Link>
              </li>
              <li>
                <Link href="/#info" className="hover:text-accent transition-colors">店舗情報</Link>
              </li>
              <li>
                <Link href="/#access" className="hover:text-accent transition-colors">アクセス</Link>
              </li>
              <li>
                <Link href="tel:050-5487-4317" className="hover:text-accent transition-colors">ご予約</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-paper/20 text-center text-paper/60 text-sm">
          <p>© {currentYear} 割烹 神谷 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
} 