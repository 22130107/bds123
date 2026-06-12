"use client";

import { useRouter } from "next/navigation";
import { HomePage } from "../components/pages/home-page";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else if (page === "listing") router.push("/listing");
    else if (page === "detail") router.push("/detail");
  };

  return <HomePage onNavigate={handleNavigate} />;
}
