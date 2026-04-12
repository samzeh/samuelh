import Polaroid from "./components/Polaroid";
import SubstackThoughts from "./components/SubstackThoughts";
import Image from "next/image";

interface ExperienceObject {
  image: string;
  alt: string;
  position: string;
  date: string;
}

// Fix: proper typing
const experience: ExperienceObject[] = [
  {
    image: "/needlist.png",
    alt: "needlist",
    position: "Technical Project Manager",
    date: "2026",
  },
  {
    image: "/watai.png",
    alt: "wat.ai",
    position: "software engineer",
    date: "2026",
  },
  {
    image: "/electrium.png",
    alt: "electrium mobility",
    position: "product designer",
    date: "2026",
  },
];

export default function About() {
  return (
    <div className="flex flex-col gap-10 mt-15">
      
      {/* About Section */}
      <div className="flex items-start gap-16">
        <div className="flex flex-col max-w-lg">
          <h2 className="text-4xl mb-3">about me</h2>
          <p className="text-[19px]">My name's Samuel, and I'm a student @ uwaterloo studying Systems Design Engineering.</p>
          <br />
          <p className="text-[19px]">I love to create. Whether it be experimenting to perfect the perfect chocolate chip recipe, or jumping on project ideas, trying new things is a big part of who I am.</p>
          <br />
          <p className="text-[19px]">As of right now, however, I'm exploring the intersections technology has with business + art.</p>
        </div>

        <div className="flex-1 flex justify-end mr-13">
        <Polaroid
          src="/aboutme.png"
          alt="me"
          width={280}
          date="20/08/2024"
          description="canoe trip!   🛶  ☀️"
          rotation={2.15}
        />
      </div>
      </div>

      {/* Experience Section */}
      <div className="flex flex-col gap-4">
          <h2 className="text-4xl">experience</h2>

          <div className="flex flex-col gap-4 w-full">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="flex items-center w-full"
              >
                <div className="w-2/5 flex items-center gap-2">
                  <Image
                    src={exp.image}
                    alt={exp.alt}
                    width={30}
                    height={30}
                    className="rounded flex-shrink-0"
                  />
                  <h3 className="text-sm m-0 leading-none truncate">
                    {exp.alt}
                  </h3>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-left m-0 leading-none">
                    {exp.position}
                  </p>
                </div>

                <div className="w-[100px] text-right">
                  <p className="text-sm text-gray-500 m-0 leading-none">
                    {exp.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Blog — posts from Substack (public archive API) */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-0">
          <h2 className="text-4xl">thoughts</h2>
          <p className="text-lg">
            I think too much. Sometimes to a fault (so I’ve been told...)
          </p>
        </div>

        <SubstackThoughts />
      </div>
    </div>
  );
}