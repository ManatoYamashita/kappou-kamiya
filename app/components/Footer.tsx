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
              〒100-0001<br />
              東京都千代田区丸の内1-1-1<br />
              丸の内センタービル 8F<br />
              TEL: <Link href="tel:03-1234-5678" className="hover:text-accent transition-colors">03-1234-5678</Link>
            </address>
          </div>
          
          <div>
            <h3 className="font-mincho text-xl mb-4">営業時間</h3>
            <p className="text-paper/80 leading-relaxed">
              ランチ: 11:30〜14:00 (L.O.13:30)<br />
              ディナー: 17:30〜22:00 (L.O.21:00)<br />
              定休日: 月曜日（祝日の場合は翌日）
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
                <Link href="/#reservation" className="hover:text-accent transition-colors">ご予約</Link>
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