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
  dbProjects?: any[];
  dbSpaces?: any[];
  dbNews?: any[];
}

export function HomePage({ onNavigate, dbProjects = [], dbSpaces = [], dbNews = [] }: HomePageProps) {
  const featured = dbProjects.filter(p => p.isFeatured);
  const tailored = dbProjects.filter(p => p.type === 'tailored');
  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-antique-gold selection:text-white" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="home" onNavigate={onNavigate} />
      <main className="pt-0">
        <HeroSection onNavigate={onNavigate} />
        <SpaceShowcase spaces={dbSpaces} />
        <TailoredSection onViewDetail={() => onNavigate("detail")} projects={tailored} />
        <FeaturedProjects projects={featured} />
        <LocationSection />
        <FeaturedNews news={dbNews} />
        <CTASection onSchedule={() => onNavigate("listing")} onViewCatalog={() => onNavigate("listing")} />
      </main>
      <Footer variant="default" />
    </div>
  );
}
