"use client";

import { useRouter } from "next/navigation";
import { HomePage } from "../components/pages/home-page";

export default function HomeClient({ dbProjects, dbSpaces, dbNews }: { dbProjects: any[], dbSpaces: any[], dbNews: any[] }) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return (
    <>
      <HomePage onNavigate={handleNavigate} dbProjects={dbProjects} dbSpaces={dbSpaces} dbNews={dbNews} />
    </>
  );
}
