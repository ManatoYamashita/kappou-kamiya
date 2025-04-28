import { Metadata } from 'next';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Menu from './components/Menu';
import Info from './components/Info';
import Footer from './components/Footer';
import News from './components/News';
export const metadata: Metadata = {
  title: '割烹 神谷 | 三代続く川口の老舗日本料理店',
  description: '埼玉県川口市で四季折々の食材が織り成す逸品を和の空間で味わえる老舗割烹料理店。ご接待・結納・法事・歓送迎会などに最適な空間をご用意しております。',
};

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <News />
        <Concept />
        <Menu />
        <Info />
      </main>
      <Footer />
    </>
  );
}
