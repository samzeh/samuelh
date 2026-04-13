import React from "react";

export default function MapCaseStudy() {
  return (
    <main className="space-y-10 px-2 py-4 md:px-4">
      <h1 className="text-4xl mb-3">Designing the Map of the Future</h1>

      <section className="space-y-3 ">
        <h2 className="text-2xl">Context</h2>
        <p className="text-detail-color">
          Existing map interactions overloaded users with controls and reduced spatial
          confidence during route planning.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">Design Principles</h2>
        <h3 className="text-xl">Progressive Disclosure</h3>
        <p className="text-detail-color">
          High-complexity controls only appear when users show intent, reducing noise in
          first-time interactions.
        </p>
        <h3 className="text-xl">Spatial Legibility</h3>
        <p className="text-detail-color">
          Labels and overlays were rebalanced to prioritize landmarks and route clarity at
          every zoom level.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">Outcomes</h2>
        <p className="text-detail-color">
          In testing, users completed destination setup faster and reported fewer moments
          of uncertainty when panning and rerouting.
        </p>
      </section>
    </main>
  );
}
