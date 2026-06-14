"use client";

import { useRouter } from "next/navigation";
import { HomePage } from "../components/pages/home-page";
import { CopilotPageData } from "../components/copilot-page-data";

export default function HomeClient({ dbProjects, dbSpaces, dbNews }: { dbProjects: any[], dbSpaces: any[], dbNews: any[] }) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return (
    <>
      <CopilotPageData projects={dbProjects} news={dbNews} spaces={dbSpaces} />
      <HomePage onNavigate={handleNavigate} dbProjects={dbProjects} dbSpaces={dbSpaces} dbNews={dbNews} />
    </>
  );
}
