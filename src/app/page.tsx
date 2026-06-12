"use client";

import { useRouter } from "next/navigation";
import { HomePage } from "../components/pages/home-page";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else router.push(`/${page}`);
  };

  return <HomePage onNavigate={handleNavigate} />;
}
