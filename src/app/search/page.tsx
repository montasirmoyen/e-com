import React from "react";
import Navbar from "../../components/nav-bar";

const SearchPageClient = React.lazy(() => import("../../components/search-page-client"));

export default function SearchPage() {
  return (
    <Navbar>
      <div className="min-h-screen bg-gray-100">
        <React.Suspense fallback={<div className="p-4">Loading results...</div>}>
          <SearchPageClient />
        </React.Suspense>
      </div>
    </Navbar>
  );
}
