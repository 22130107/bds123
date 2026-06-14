"use client";

import { useRouter } from "next/navigation";
import { NewsPage } from "../../components/pages/news-page";
import { CopilotPageData } from "../../components/copilot-page-data";

export default function NewsClient({ dbNews }: { dbNews: any[] }) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return (
    <>
      <CopilotPageData news={dbNews} />
      <NewsPage onNavigate={handleNavigate} dbNews={dbNews} />
    </>
  );
}
