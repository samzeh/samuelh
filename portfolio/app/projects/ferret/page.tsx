import React from "react";
import TitleImage from "../components/TitleImage";
import Quotation from "../components/Quotation";
import ImageContainer from "../components/ImageContainer";
import ImageTextSideBySide from "../components/ImageTextSideBySide";

export default function RippleCaseStudy() {
  return (
    <main className="space-y-10 md:px-4">
      <h1 className="text-4xl mb-3">Be a tourist in your own city</h1>

      <TitleImage
        src="/ferret.png"
        alt="ferret"
        stats={[
          { label: "my role", values: ["designer + pitcher"] },
          { label: "team", values: ["solo"] },
          { label: "timeline", values: ["1 week"] },
          { label: "tools", values: ["figma"] },
        ]}
      />
      <p>
        ⚠️  Note: This project was one of my first Figma designs, thus the visuals are not as polished. It's included in my portfolio because of the experience I gained from it.
      </p>
      <section className="space-y-3">
        <h2 className="text-3xl">background</h2>
        <p className="text-detail-color">
          What if Yelp and Instagram had a baby? Well, Ferret would be the result!
        </p>
        <p className="text-detail-color">
          This project was created for a Junior Achievement Company Program Pitch,
          supported by Deloitte.
        </p>
        <p className="text-detail-color">
          The task was to craft and present a product pitch in front of advisors from companies
          like Deloitte and Shopify, for the JA Company Program. Ferret eventually made it to the final round of pitching, where it placed 2nd! 
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-3xl">problem</h2>
        <p className="text-detail-color">
         It's a huge struggle to find unique thigns to do when you're not a tourist— you can
         only seem to find big attractions that you've already been to a million times.
        </p>
        <p className="text-detail-color">
          As someone who was born and raised in Toronto, I know this problem all too well.
          Every weekend I find myself scrolling through the same lists of things to do in Toronto,—
          CN Tower, the ROM, AGO, etc.— and I end up doing the same things over and over again.
        </p>
        <ImageContainer
          images={[
            { src: "/ferret/article.png", alt: "article" },
          ]}
        />
        <p className="text-detail-color">
          This is a common issue faced by many residents of major cities, leading to a sense of monotony and lack of discovery in their own neighborhoods.
          However, there is a huge opportunity to reimagine how we explore our cities and find hidden gems that are often overlooked.
        </p>
        <p className="text-detail-color">
          A large part of these hidden gems are small local businesses that struggle to market themselves in the vast tourism market.
          Ferret's here to fix that.
        </p>
      </section>

      <section className="space-y-3">
        <ImageTextSideBySide
        images={[{ src: "/ferret/e1.png", alt: "e1" },
          ]}
          aspectRatio="1/1"
          imageLeft={false}
        >
          <h3 className="text-2xl mt-2">market research</h3>
          <p className="text-detail-color">
            When conducting market research, a whopping 69.2% of users solely use a map app for tourism purposes. Furthermore, the second largest group, 16.9% of Gen Z, selected that they do not use any tourism apps. Thus, it is clear that tourism-related apps aren't doing what they set out to do for the majority of users.
          </p>
          <br />
          <p className="text-detail-color">
            When asked about social media habits, only 1 out of our 65 participants said that they did not use social media apps. Ferret aims to take advantage of this by turning a tourism app into a social media platform.
          </p>
        </ImageTextSideBySide>
      </section>

      <section className="space-y-3">
        <h2 className="text-3xl">solution</h2>
        <p className="text-detail-color">
          Ferret seeks to address both sides of the problem: it helps residents 
          discover unique local businesses and experiences, while also 
          providing a platform for small businesses to market themselves to a wider audience.
        </p>
          <ImageTextSideBySide
            images={[{ src: "/ferret/home2.png", alt: "home" },
              { src: "/ferret/review2.png", alt: "review" },
            ]}
            aspectRatio="1/2"
            imageLeft={true}
            imageWidth={240}
          >
            <h3 className="text-2xl mt-2">key features</h3>
            <p className="text-detail-color">
              The main platform features a social media style layout, where users can share their experiences, discover hidden local gems, and engage with trusted reviews from their personal network.        
            </p>
            <br />
            <p className="text-detail-color">
              Additionally, users are able to view reviews from their friends only, eliminating the risk of fake reviews.
            </p>
          </ImageTextSideBySide>

          <ImageTextSideBySide
          images={[{ src: "/ferret/plan.png", alt: "home" },
              { src: "/ferret/ai.png", alt: "review" },
            ]}
            aspectRatio="1/2"
            imageLeft={false}
            imageWidth={240}
          >
            <h3 className="text-2xl mt-2">extra features</h3>
            <p className="text-detail-color">
              Ferret enhances the user experience by seamlessly integrating saved locations into an in-app calendar, allowing users to effortlessly plan their day around their favourite spots. This calendar is fully shareable, making group planning intuitive and collaborative—friends can coordinate schedules, align plans, and build experiences together in just a few taps.             
            </p>
            <br />
            <p className="text-detail-color">
              No idea? No problem. To further elevate the experience, Ferret AI can help you personalize your day. By using the app, Ferret AI learns your preferences through past activity and social connections, delivering tailored recommendations that align with your interests. From hidden local gems to trending spots, users can effortlessly plan the perfect outing without the stress of searching.
            </p>
          </ImageTextSideBySide>
      </section>
      <section className="space-y-3">
        <h2 className="text-3xl">competitor analysis</h2>
        <p className="text-detail-color">
          Ferret is completely unique. It combines all the best aspects of social media and tourism apps, creating the perfect combination.
        </p>
        <p className="text-detail-color">
          Furthermore, because our app is styled as a sort of social media, you are bound to discover the more unique things to do in Toronto, as on applications like Yelp, you tend to only find the more cliche things to do.
        </p>
        <p className="text-detail-color">
          Furthermore, because our app is styled as a sort of social media, you are bound to discover the more unique things to do in Toronto, as on applications like Yelp, you tend to only find the more cliche things to do.
        </p>
        <p>
          ⚠️ Note: As of recent, it turns out that in 2022, an app called Corner was released, which is very similar to Ferret! Very cool so go check it out :)
        </p>
        <ImageContainer
          images={[
            { src: "/ferret/comp.png", alt: "competitor analysis" },
          ]}
        />
      </section>
      <section className="space-y-3">
        <h2 className="text-3xl">revenue</h2>
        <p className="text-detail-color">
          Ferret will charge a one time fee for businesses to be on our app, roughly 20 dollars, after a short free trial. Businesses can also pay an additional fee to send push notifications to those who have favorited locations.
        </p>
        <p>
          For users, Ferret will be mainly free, with a few subscription plans including premium discounts and early access to events. This free app will set Ferret apart from many tourism apps, since many paid features usually make or break the app.
        </p>
      </section>
      <section>
        <h2 className="text-3xl">promo mockups</h2>
        <ImageContainer
          images={[
            { src: "/ferret/promo.png", alt: "promo" },
          ]}
        />
      </section>
      <section className="space-y-3">
        <h2 className="text-3xl">prototype</h2>
        <iframe
          src="https://embed.figma.com/proto/V757mhTAKMzDvE88PTQyS8/Ferret?node-id=2-488&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A535&embed-host=share"
          className="w-full aspect-video border border-black/10 rounded"
          allowFullScreen
        />      
      </section>
      <section>
        <h2 className="text-3xl">reflection</h2>
        <p className="text-detail-color">
          Overall, Ferret was a great learning experience and stepping stone for me as a product designer.
          Before Ferret, I had never done any user research or prototyping (or even used Figma). In fact,
          the prototypes in this case study were originally made in Canva before I later experimented with Figma.
        </p>
        <p className="text-detail-color">
          Here's a few notes on what I learned:
        </p>
        <p className="text-detail-color">
          1. It's important to do user research and validate your assummptions.
        </p>
        <p className="text-detail-color">
          2. Sometimes the best solution comes from taking a look at competitors and borrowing the best features from each of them, instead of trying to reinvent the wheel.
        </p>
        <p className="text-detail-color">
          3. Figma's not so bad once you got the hang of it. It's just a bunch of frames on frames on frames.
        </p>
      </section>
    </main>
  );
}
