import PinLock from "./components/PinLock";
import FloatingHearts from "./components/FloatingHearts";
import HeroSection from "./components/HeroSection";
import LoveLetterSection from "./components/LoveLetterSection";
import ReasonsSection from "./components/ReasonsSection";
import GallerySection from "./components/GallerySection";
import ValentineAsk from "./components/ValentineAsk";
import FooterSection from "./components/FooterSection";
import CookieConsent from "./components/CookieConsent";

export default function Home() {
  return (
    <PinLock>
      <FloatingHearts />
      <main className="relative z-10">
        <HeroSection />
        <LoveLetterSection />
        <ReasonsSection />
        <GallerySection />
        <ValentineAsk />
      </main>
      <FooterSection />
      <CookieConsent />
    </PinLock>
  );
}
