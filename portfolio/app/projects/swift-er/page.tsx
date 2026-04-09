import React from "react";

export default function SwiftERCaseStudy() {
  return (
    <main className="space-y-10 px-2 py-4 md:px-4">
      <h1 className="text-4xl">Making Emergency Rooms SwiftER: Case Study</h1>

      <section className="space-y-3">
        <h2 className="text-2xl">Challenge</h2>
        <p className="text-detail-color">
          Patients and families struggled to understand waiting progress, while staff faced
          fragmented communication across triage and care teams.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">Service Design Approach</h2>
        <h3 className="text-xl">Queue Transparency</h3>
        <p className="text-detail-color">
          We introduced a status model that translates clinical workflow into plain-language
          milestones for patients.
        </p>
        <h3 className="text-xl">Staff Coordination</h3>
        <p className="text-detail-color">
          Internal handoff points were redesigned around shared context cards instead of
          isolated updates.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">Key Learnings</h2>
        <p className="text-detail-color">
          Trust increased when the interface reflected uncertainty honestly and provided
          meaningful next-step expectations.
        </p>
      </section>
    </main>
  );
}
