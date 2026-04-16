import React from "react";
import TitleImage from "../components/TitleImage";
import Quotation from "../components/Quotation";
import ImageContainer from "../components/ImageContainer";
import ImageTextSideBySide from "../components/ImageTextSideBySide";

export default function RippleCaseStudy() {
  return (
    <main className="space-y-10 md:px-4">
      <h1 className="text-4xl mb-3">Reimagining the Future of LLMs</h1>

      <TitleImage
        src="/projects/ripple/ripple.png"
        alt="ripple"
        stats={[
          { label: "my role", values: ["designer"] },
          { label: "team", values: ["4 designers"] },
          { label: "timeline", values: ["7.5 hours"] },
          { label: "tools", values: ["figma"] },
        ]}
      />
      <section className="space-y-3">
        <h2 className="text-3xl">problem statement</h2>
        <p className="text-detail-color">
          How might we use design and technology to make climate awareness 
          and sustainable action easier to understand and practice in everyday life?
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-3xl">approach</h2>
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
        <ImageContainer
          images={[
            { src: "/projects/ripple/ideation.jpg", alt: "ideation" },
          ]}
        />
        <p className="text-detail-color">
          However, we wanted to step beyond these commonly explored areas 
          and identify a less obvious problem space where meaningful impact 
          is often overlooked.        
        </p>
        <h3 className="text-2xl">rise of llms</h3>
        <p className="text-detail-color">
          Since November 2022, large language models (LLMs) have become mainstream, 
          dominating our everyday lives.
        </p>
        <p className="text-detail-color">
          With the rise of this technology, there have been growing concerns 
          regarding its environmental impact, most notably the energy 
          consumption required to train and run these systems at scale.
        </p>
        <p className="text-detail-color">
          Furthermore, a key driver of this issue is the growing use of 
          AI as a replacement for simple Google searches, increasing 
          overall energy consumption for everyday queries.        
        </p>
        <ImageContainer
          images={[
            { src: "/projects/ripple/e2.png", alt: "e2" },
            { src: "/projects/ripple/e1.png", alt: "e1" },
            { src: "/projects/ripple/e3.png", alt: "e3" },
          ]}
        />

        <p className="text-detail-color">
          As AI becomes intertwined with everyday life, it’s projected 
          that AI water usage could hit 6.6 billion m³ by 2027. As well, 
          for every 10 ChatGPT responses, 500mL of water is consumed. 
        </p>

        <h2 className="text-3xl">solution</h2>
        <p className="text-detail-color">
          My team and I wanted to brainstorm ideas to solve 
          this problem. We came up with Ripple.
        </p>
        <p className="text-detail-color">
          Picture this:
        </p>
        <p className="text-detail-color">
          Let’s say you want to search more info into the Eiffel 
          Tower using your favourite LLM like ChatGPT.
        </p>
        <p className="text-detail-color">
          Well, instead of creating a new prompt to send, 
          Ripple searches through previously asked prompts relevant 
          to the Eiffel tower, and resurfaces its answers, eliminating 
          the need for additional AI usage. 
        </p>
        <p className="text-detail-color">
          Ripple reduces the environmental impact of AI by 
          reusing existing answers instead of generating new ones, 
          saving energy and water used by data centres.
        </p>
        <p className="text-detail-color">
          If Ripple cannot find a previously asked prompt that matches the 
          user’s request, Ripple serves as an LLM, 
          however only relying on efficient and low-cost models.
        </p>

        <ImageContainer
          images={[
            { src: "/projects/ripple/system.jpg", alt: "system" },
          ]}
        />
        <p className="text-detail-color">
          We know that telling people to stop using ChatGPT is 
          unrealistic and unfeasible. So instead of <span className="italic">forcing </span> people to stop, 
          why don’t we redefine what it means to use an LLM? Ripple aims to 
          make AI a more sustainable tool to make sustainable action seamless 
          in one’s day to day life.
        </p>
        <p className="text-detail-color">
          In a world where AI is becoming increasingly unavoidable, 
          the right response is not to avoid AI, but rather adapt and 
          address the pressing environmental issues it causes. 
        </p>

        <ImageTextSideBySide
          images={[{ src: "/projects/ripple/home.png", alt: "home" }, 
            { src: "/projects/ripple/home2.png", alt: "home2" }]}
          imageLeft={true}
          aspectRatio="1/2"
          imageWidth={240}
        >
          <h3 className="text-2xl mt-2">home page</h3>
          <p className="text-detail-color">On the home page, users are greeted by a familiar 
            “ChatGPT-like” user interface. This was done so 
            intentionally so that users immediately know what to 
            do as it mimics the flow of an actual LLM.
          </p>
          <br />
          <p className="text-detail-color">
            Once a user types in their “prompt”, ripple surfaces 
            existing answers from previously asked prompts, allowing 
            users to select the one that matches their best request.
          </p>
        </ImageTextSideBySide>

        <ImageTextSideBySide
          images={[{ src: "/projects/ripple/result.png", alt: "answer" }]}
          imageLeft={false}
          aspectRatio="1/2"
          imageWidth={240}
        >
          <h3 className="text-2xl mt-2">answer page</h3>
          <p className="text-detail-color">Once a user selects the answer they want to view, they 
            are able open up Ripple’s resurfaced prompt and answer. 
            There, they can view directly how much water they saved as
             well as ask any follow up questions.
          </p>
          <br />
          <p className="text-detail-color">
            Ripple also has an upvoting and downvoting feature, which
             serves as its algorithm to learn what answers are the most relevant
          </p>
        </ImageTextSideBySide>


        <ImageTextSideBySide
          images={[{ src: "/projects/ripple/discover.png", alt: "discover" }]}
          aspectRatio="1/2"
          imageLeft={true}
          imageWidth={240}
        >
          <h3 className="text-2xl mt-2">discover page</h3>
          <p className="text-detail-color">Ripple also features a discover page (inspired by Ditto Lists) 
            where users can browse previously asked prompts, encouraging people
             to learn from existing knowledge instead of generating new responses.
          </p>
          <br />
          <p className="text-detail-color">
            If a user wants to learn more English, for example, 
            they are able to select the education category to filter
             past prompts that are related to education. There, they can 
             browse past knowledge that LLMs have already provided.
          </p>
        </ImageTextSideBySide>

        <ImageTextSideBySide
          images={[{ src: "/projects/ripple/profile.png", alt: "profile" },
            { src: "/projects/ripple/history.png", alt: "history" },
          ]}
          aspectRatio="1/2"
          imageLeft={false}
          imageWidth={240}
        >
          <h3 className="text-2xl mt-2">profile page</h3>
          <p className="text-detail-color">Finally, on the profile page, you are able to view 
            how many litres of water you’ve saved in the past month. 
            Ripple also provides a more in depth look into your history 
            through a river stream graphic that represents the past history 
            of your water usage.
          </p>
          <br />
          <p className="text-detail-color">
            On the home page you’ll also find past prompts and 
            their answers that you’ve viewed, enabling easy access.
          </p>
        </ImageTextSideBySide>

        <section className="space-y-3">
          <h2 className="text-3xl">prototype</h2>
            <iframe
              src="https://embed.figma.com/proto/01XnqrdkdhHhUCY7Ii3AvT/BLOOM-Designathon-2026?node-id=36-1061&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=36%3A1061&embed-host=share"
              className="w-full aspect-video border border-black/10 rounded"
              allowFullScreen
            />      
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl mt-3">key learnings</h2>
          <p className="text-detail-color">
            If you’ve read all the way here, I think it’s probably important 
            to note that Ripple probably isn’t feasible at this time. To implement
             Ripple in the real world, you’d need to collect and store all this data 
             generated from millions of prompts that are being asked every day.
          </p>
          <p className="text-detail-color">
            However, Ripple was made to ideate and think upon a hopeful future 
            in which LLMs might be a more sustainable piece of technology.
          </p>
        </section>

      </section>
      <section className="space-y-3">
        <h2 className="text-3xl">reflections</h2>
        <p className="text-detail-color">
          🥉 We placed third at Bloom Designathon!
        </p>

        <p className="text-detail-color font-semibold">
          Ripple taught me so many valuable lessons, most importantly:
        </p>

        <p className="text-detail-color">
          1. Before designing, it’s worth spending a few hours (even if you only 
          have 7.5 hours in total) to think 
          of the problem statement and a unique solution
        </p>
        <p className="text-detail-color">
          2. It’s okay to sometimes dream big and come up with a crazy solution. Creativity &gt;&gt;&gt;
        </p>
        <p className="text-detail-color">
          3. Figma is SLOW when you have a bajillion graphics all in one page (or maybe it’s just my laptop)
        </p>
      </section>
    </main>
  );
}
