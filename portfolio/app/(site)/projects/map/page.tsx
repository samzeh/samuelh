import React from "react";
import TitleImage from "../components/TitleImage";
import ImageContainer from "../components/ImageContainer";
import ImageTextSideBySide from "../components/ImageTextSideBySide";

export default function MapCaseStudy() {
  return (
    <main className="space-y-10 md:px-4">
      <h1 className="text-4xl mb-3">Be a tourist in your own city</h1>

      <TitleImage
        videoSrc="/projects/map/electrium.mp4"
        videoPoster="/projects/map/electrium.png"
        alt="map case study video"
        zoom={1.2}
        stats={[
          { label: "my role", values: ["designer"] },
          { label: "team", values: ["3 designers"] },
          { label: "timeline", values: ["4 months"] },
          { label: "tools", values: ["figma"] },
        ]}
      />
      <p>⚠️  Note: This is only part of the work I did, but it encompasses the main scope which is translating desktop designs to mobile</p>
      <section className="space-y-3">
        <h2 className="text-3xl">background</h2>
        <p className="text-detail-color">
          Electriumap is a crowdsourced map to help riders find and share charging spots for EVs.
        </p>
        <p className="text-detail-color">
          At the time that I had joined this project, the desktop designs of the app had been completed, but the mobile designs were still being worked on.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-3xl">problem</h2>
        <p className="text-detail-color">
         How do you translate a desktop design into a mobile design while maintaining the same user experience? 
        </p>

      </section>

      <section className="space-y-3">
        <h2 className="text-3xl mt-2">design style</h2>
        <p className="text-detail-color">
          Electrium Mobility wanted to focus on modern UI, and with the recent (at the time) introduction of Apple Liquid Glass, there was an
          interest in incorporating glassmorphism into the overall designs.
        </p>
        <ImageContainer
          images={[
            { src: "/map/glass1.png", alt: "glass1" },
            { src: "/map/glass2.png", alt: "glass2" },
          ]}
        />
        <p className="text-detail-color">
          Additionally, for certain accents, Electriumap featured a green colour palette, which I also incorporated into the designs.
          However, it is important to note that on the desktop version, this colour palette was loosely used, thus for the mobile version, I also used this colour palette in a more loose way, to maintain the same style as the desktop version.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-3xl">desktop version</h2>
        <p className="text-detail-color">All the desktop designs for Electriumap were <span className="font-semibold">completed</span> before I joined the project.</p>
        <p className="text-detail-color">The following desktop images are just for reference.</p>
        <h3 className="text-2xl">home/search</h3>
        <ImageContainer
          images={[
            { src: "/map/desktophome.png", alt: "home" },
            { src: "/map/desktopsearch.png", alt: "search" },
          ]}
        />
        <p className="text-detail-color">
          The images above showcase the desktop version of the home and search pages of Electriumap. As you can see, the design incorporates many glassmorphism elements as well as particular green accent colours. 
        </p>

        <h3 className="text-2xl">view/save/add outlets</h3>
        <ImageContainer
          images={[
            { src: "/map/desktopaddress.png", alt: "address" },
            { src: "/map/desktopsave.png", alt: "saved" },
            { src: "/map/desktopadd.png", alt: "add" },
          ]}
        />
        <p className="text-detail-color">
          Moving on, the first image showcases the design mockups for viewing an outlet details, the second image showcases the design mockups for viewing a saved outlet, and the third image showcases the design mockups for adding an outlet.
        </p>

        <h3 className="text-2xl">profile</h3>
        <ImageContainer
          images={[
            { src: "/map/desktopprofile.png", alt: "profile" },
          ]}
        />
        <p className="text-detail-color">
          Finally, the image above showcases the design mockups for the profile page, which is where users can edit their profile, view their vehicles and view their shared outlets.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-3xl">mobile designs</h2>
        <p className="text-detail-color">
          The following images showcase my work in translating the desktop designs to mobile.
        </p>
        <ImageTextSideBySide
          images={[{ src: "/map/home.png", alt: "home" },
            { src: "/map/search.png", alt: "search" },
          ]}
          aspectRatio="1/2"
          imageLeft={false}
          imageWidth={240}
        >
        <h3 className="text-2xl">home/search</h3>
        <p className="text-detail-color">
          These images showcase the mobile designs for the home and search pages. 
        </p>
        <br />
        <p className="text-detail-color">
          As you can see, the top elements have been compressed into a search bar and a hamburger menu, to save and conserve space. When clicked, the hamburger menu will reveal the different ports that a user can filter the map by.
          The buttons that were removed (light/dark mode toggle, save button, history button) were all moved to different areas of the app. For example, the light/dark mode toggle on mobile is now within the profile section.

        </p>
        </ImageTextSideBySide>

        <ImageTextSideBySide
          images={[{ src: "/map/address.png", alt: "address" },
            { src: "/map/saved.png", alt: "saved" },
          ]}
          aspectRatio="1/2"
          imageLeft={true}
          imageWidth={240}
        >
        <h3 className="text-2xl">view/save outlets</h3>
        <p className="text-detail-color">
          These images showcase the mobile designs for viewing an outlet details and viewing a saved outlet.
        </p>
        <br />
        <p className="text-detail-color">
          A modal sheet popup is used to showcase the details of the outlet, keeping the users within the frame of the map while they are able to view additional information.
          It's important to note that the viewing a saved outlet design could be made into it's own page, especially since accessing the popup is done from the navbar.
        </p>
        </ImageTextSideBySide>

        <h3 className="text-2xl">add outlets</h3>
        <ImageContainer
          images={[
            { src: "/map/step1.png", alt: "step 1" },
            { src: "/map/step2.png", alt: "step 2" },
            { src: "/map/step3.png", alt: "step 3" },
            { src: "/map/step4.png", alt: "step 4" },
          ]}
        />
        <p className="text-detail-color">
          These images depict the steps needed to add an outlet.
        </p>
        <p className="text-detail-color">
          The redesign of the add outlet flow was the most significant out of all the flows, since the desktop version had a lot of elements that would not fit on mobile. 
          Thus, a multi-step form was used to break down the process of adding an outlet, making it easier for users to navigate through the process on mobile.
        </p>
        <p className="text-detail-color">
          I also took some creative liberties with the text input fields. On the desktop version, the text input fields are big with a thick gray stroke. However, this didn't seem to align with the other
          boxes that were present within the app. To maintain a consisten design style, I decided to reduce the thickness of the stroke and make the text input fields smaller.
        </p>

        <ImageTextSideBySide
          images={[{ src: "/map/profile.png", alt: "profile" }
          ]}
          aspectRatio="1/2"
          imageLeft={true}
          imageWidth={240}
        >
        <h3 className="text-2xl">profile</h3>
        <p className="text-detail-color">
          These images showcase the mobile designs for viewing the user profile
        </p>
        <br />
        <p className="text-detail-color">
          Similar to the reason for taking creative liberties for the add outlet flow, I also took creative liberties with the profile page.
        </p>
        <p className="text-detail-color">
          The desktop version featured gray boxes that were opposite to the rest of the design. For the mobile version, I decided to play around with the colours and chose a more appropriate colour scheme that aligned with the rest of the app.
        </p>
        </ImageTextSideBySide>

      </section>

      <section>
        <h2 className="text-3xl">reflection</h2>
        <p className="text-detail-color">
          Electriumap was a great experience for me to learn how to translate desktop designs to mobile designs. 
        </p>
        <br />
        <p className="text-detail-color font-semibold">
          Here's a few notes on what I learned:
        </p>
        <p className="text-detail-color">
          1. It's important to consider the mobile design when designing for desktop to avoid having to make significant changes for the design (mobile first design!).
        </p>
        <p className="text-detail-color">
          2. Consider the user experience when designing for mobile. It's not just about trying to make the design fit on a smaller screen, but also making sure that the design is easy to navigate.
        </p>
      </section>
    </main>
  );
}
