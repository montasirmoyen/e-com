
"use client";

import Navbar from "../components/nav-bar";
import Recommendations from "../components/recommendations";

export default function Home() {
  return (
    <Navbar>
      <div className="min-h-screen bg-gray-100">
        <Recommendations
          title="Tech Recommendations"
          subtitle="Products you may like"
          ids={[9, 10, 11, 12, 13]}
        />

        <Recommendations
          title="Fashion Recommendations"
          subtitle="Clothing you may like"
          ids={[1, 2, 3, 15, 5]}
        />
      </div>
    </Navbar>
  );
}
