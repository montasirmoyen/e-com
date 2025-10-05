"use client";

import { useSearchParams } from "next/navigation";
import SearchResults from "./search-results";

export default function SearchPageClient() {
  const params = useSearchParams();
  const q = params?.get("q") ?? "";

  return <SearchResults query={q} />;
}
