import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { PopularCategories } from "@/components/PopularCategories";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";
import { TrustBar } from "@/components/TrustBar";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-400" style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. WHY CHOOSE US */}
      <ValueProposition />

      {/* 3. POPULAR CATEGORIES */}
      <PopularCategories />

      {/* 4. HOW IT WORKS */}
      <HowItWorks />

      {/* 5. FEATURED PRODUCTS */}
      <FeaturedProductsSection />

      {/* 6. TRUST BAR */}
      <TrustBar />

      {/* 7. CTA BAND */}
      <CTA />
    </div>
  );
}
