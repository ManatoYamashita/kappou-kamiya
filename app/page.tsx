import { Metadata } from 'next';
import Header from './components/Header';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Menu from './components/Menu';
import Info from './components/Info';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: '割烹 神谷 | 伝統と季節の味わい',
  description: '東京で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。',
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Menu />
        <Info />
      </main>
      <Footer />
    </>
  );
}
