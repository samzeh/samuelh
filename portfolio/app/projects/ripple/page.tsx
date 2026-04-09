import React from "react";

export default function RippleCaseStudy() {
  return (
    <main className="space-y-10 px-2 py-4 md:px-4">
      <h1 className="text-4xl">Reimagining the Future of LLMs: Case Study</h1>

      <section className="space-y-3">
        <h2 className="text-2xl">The Problem</h2>
        <p className="text-detail-color">
          Many teams wanted to use LLMs, but latency and uncertain output quality made
          adoption difficult in real production workflows.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">The Solution</h2>
        <h3 className="text-xl">Prompt Architecture</h3>
        <p className="text-detail-color">
          We designed a layered prompt system with clear role separation and contextual
          grounding to improve response consistency.
        </p>
        <h3 className="text-xl">Evaluation Loop</h3>
        <p className="text-detail-color">
          We added lightweight rubric-based checks to score generated outputs before
          returning them to the user-facing experience.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">Reflection</h2>
        <p className="text-detail-color">
          A clear system boundary between generation, evaluation, and fallback paths
          mattered more than model size alone.
        </p>
      </section>
    </main>
  );
}
