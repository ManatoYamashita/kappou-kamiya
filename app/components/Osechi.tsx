import Image from 'next/image';
import Btn from './Btn';

const OSECHI_URL = 'https://kamiya.base.ec/categories/4774666';

export default function Osechi() {
  return (
    <section id="osechi" className="bg-ink text-paper py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-10 md:flex-row md:items-center">
          <div className="md:w-1/2 space-y-6">
            <p className="font-mincho text-3xl md:text-4xl">
              <span className="border-b border-accent pb-2">特製おせちのご案内</span>
            </p>
            <p className="leading-relaxed text-sm md:text-base">
              三代続く割烹の技で仕上げる手作りおせちを、数量限定でご用意しております。食材の下ごしらえから盛り付けまで職人が丁寧に仕立て、華やかな新年を彩ります。
            </p>
            <div className="grid gap-3 text-xs md:text-sm">
              <div className="bg-white/10 border border-white/20 rounded-sm p-4">
                <p className="font-mincho text-lg mb-1">店頭受取・配送対応</p>
                <p className="text-paper/80">受取日時や配送希望は購入ページのフォームでお知らせください。</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-sm p-4">
                <p className="font-mincho text-lg mb-1">数量限定</p>
                <p className="text-paper/80">予定数に達し次第終了となります。お早めのご注文をおすすめします。</p>
              </div>
            </div>
            <div>
              <Btn
                text="おせちを購入する"
                href={OSECHI_URL}
                color="white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="おせちを購入する"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/menu-hana.webp"
                alt="割烹神谷 特製おせちの盛り付け"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
