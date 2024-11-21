"use client";

import Component from "./Component";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold py-8">Visualization of Trends</h1>
      <div className="max-w-4xl mx-auto">
        <Component />
      </div>
    </div>
  );
}
