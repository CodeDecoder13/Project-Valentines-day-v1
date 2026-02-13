import FloatingHearts from "./components/FloatingHearts";
import HeroSection from "./components/HeroSection";
import LoveLetterSection from "./components/LoveLetterSection";
import ReasonsSection from "./components/ReasonsSection";
import GallerySection from "./components/GallerySection";
import ValentineAsk from "./components/ValentineAsk";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <>
      <FloatingHearts />
      <main className="relative z-10">
        <HeroSection />
        <LoveLetterSection />
        <ReasonsSection />
        <GallerySection />
        <ValentineAsk />
      </main>
      <FooterSection />
    </>
  );
}
