"use client";

import { useRouter } from "next/navigation";
import { NewsDetailPage } from "../../../components/pages/news-detail-page";

export default function NewsDetailClient({ currentNews, latestNews }: { currentNews: any, latestNews: any[] }) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return (
    <>
      <NewsDetailPage onNavigate={handleNavigate} article={currentNews} latestNews={latestNews} />
    </>
  );
}
