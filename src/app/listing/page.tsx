"use client";

import { useRouter } from "next/navigation";
import { ListingPage } from "../../components/pages/listing-page";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "home") router.push("/");
    else if (page === "listing") router.push("/listing");
    else if (page === "detail") router.push("/detail");
  };

  return <ListingPage onNavigate={handleNavigate} />;
}
