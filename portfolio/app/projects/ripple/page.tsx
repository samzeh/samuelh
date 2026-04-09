import React from "react";
import TitleImage from "../components/TitleImage";
import Quotation from "../components/Quotation";

export default function RippleCaseStudy() {
  return (
    <main className="space-y-10 px-2 md:px-4">
      <h1 className="text-4xl">Reimagining the Future of LLMs</h1>

      <TitleImage
        src="/ripple.png"
        alt="ripple"
        stats={[
          { label: "my role", values: ["designer"] },
          { label: "team", values: ["4 designers"] },
          { label: "timeline", values: ["< 7 hours"] },
          { label: "tools", values: ["figma", "figma plugin", "other tool"] },
        ]}
      />
      <section className="space-y-3">
        <h2 className="text-2xl">problem statement</h2>
        <p className="text-detail-color">
          How might we use design and technology to make climate awareness 
          and sustainable action easier to understand and practice in everyday life?
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">approach</h2>
        <p className="text-detail-color">
         When approaching the problem, we wanted to 
         focus on the last part of the problem statement:
        </p>
        <Quotation>
          <span className="font-medium underline">sustainable</span> action easier to <span className="font-medium underline">understand</span> and <span className="font-medium underline">practice</span> in <span className="font-medium underline">everyday life</span>
        </Quotation>
        <p className="text-detail-color">
          We wanted to focus on finding an unsustainable action in one’s everyday life so that our solution could maximize impact at a behavioural level rather than requiring large lifestyle changes.
        </p>
        <p className="text-detail-color">
          Initially, we thought of various everyday tasks including: food waste, transportation, etc.
        </p>
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
