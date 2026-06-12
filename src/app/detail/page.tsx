"use client";

import { useRouter } from "next/navigation";
import { DetailPage } from "../../components/pages/detail-page";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return <DetailPage onNavigate={handleNavigate} />;
}
