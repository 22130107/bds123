"use client";

import { useRouter } from "next/navigation";
import { NewsPage } from "../../components/pages/news-page";

export default function NewsRoute() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return <NewsPage onNavigate={handleNavigate} />;
}
