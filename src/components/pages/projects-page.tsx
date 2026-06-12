"use client";

import { TopNavBar } from "../top-nav-bar";
import { DeveloperShowcase } from "../developer-showcase";
import { Footer } from "../footer";

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  return (
    <div className="bg-surface text-on-surface font-body-md" style={{ overflowX: "hidden" }}>
      <TopNavBar activePage="projects" onNavigate={onNavigate} />

      {/* Spacing for fixed header */}
      <div className="pt-[80px]"></div>

      {/* Main Content */}
      <main className="min-h-screen">
        <DeveloperShowcase />
      </main>

      <Footer variant="dark" />
    </div>
  );
}
