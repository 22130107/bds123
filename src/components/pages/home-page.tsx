import { TopNavBar } from "../top-nav-bar";
import { HeroSection } from "../hero-section";
import { FeaturedNews } from "../featured-news";
import { TailoredSection } from "../tailored-section";
import { FeaturedProjects } from "../featured-projects";
import { LocationSection } from "../location-section";
import { SpaceShowcase } from "../space-showcase";
import { CTASection } from "../cta-section";
import { Footer } from "../footer";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-antique-gold selection:text-white" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="home" onNavigate={onNavigate} />
      <main className="pt-0">
        <HeroSection onNavigate={onNavigate} />
        <SpaceShowcase />
        <TailoredSection onViewDetail={() => onNavigate("detail")} />
        <FeaturedProjects />
        <LocationSection />
        <FeaturedNews />
        <CTASection onSchedule={() => onNavigate("listing")} onViewCatalog={() => onNavigate("listing")} />
      </main>
      <Footer variant="default" />
    </div>
  );
}
