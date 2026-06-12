"use client";

import { useRouter } from "next/navigation";
import { ProjectsPage } from "../../components/pages/projects-page";

export default function ProjectsRoute() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return <ProjectsPage onNavigate={handleNavigate} />;
}
