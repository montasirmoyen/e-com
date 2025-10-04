
"use client";

import Navbar from "../components/nav-bar";
import { useState } from "react";
import SearchResults from "../components/search-results";
import Recommendations from "../components/recommendations";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <Navbar onSearch={(q) => setQuery(q)}>
      <div className="min-h-screen bg-gray-100">
        {query ? (
          <SearchResults query={query} />
        ) : (
          <>
            <Recommendations
              title="Tech Recommendations"
              subtitle="Tech products you may like"
              ids={[9, 10, 11, 12, 13]}
            />

            <Recommendations
              title="Fashion Recommendations"
              subtitle="Fashion clothing you may like"
              ids={[1, 2, 3, 15, 5]}
            />
          </>
        )}
      </div>
    </Navbar>
  );
}
