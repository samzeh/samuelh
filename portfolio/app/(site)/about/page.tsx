import Polaroid from "./components/Polaroid";
import SubstackThoughts from "./components/SubstackThoughts";
import Image from "next/image";
import InlineItem from "../../components/InlineItem";
import Hyperlink from "../../components/Hyperlink";

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
    alt: "needlist.org",
    position: "technical project manager",
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
    <div className="flex flex-col gap-8 md:gap-10 mt-10 md:mt-15">
      
      {/* About Section */}
      <div className="flex flex-col-reverse md:flex-row md:items-start md:gap-16">
        <div className="flex flex-col max-w-lg">
          <h2 className="text-3xl md:text-4xl mb-3">about me</h2>
          <span className="text-base md:text-[19px] block">
            My name's Samuel, and I'm a student at
            <span className="inline-block align-middle ml-2">
              <InlineItem icon="/waterloo.png" iconAlt="watai logo">
                waterloo
              </InlineItem>
            </span>
            {/* Add a space after InlineItem */}
            {" "}
            studying <Hyperlink href="https://uwaterloo.ca/future-students/programs/systems-design-engineering" text="Systems Design Engineering" imageSrc="/sydeweb.png" imageAlt="syde"/>.
          </span>
          <br />
          <span className="text-base md:text-[19px] block">I love to <span className="font-semibold text-green-600">create</span>. Whether it be experimenting to perfect the perfect <Hyperlink href="https://stirringtheglobe.wordpress.com/" text="chocolate chip recipe" imageSrc="/foodblog.png" imageAlt="food blog"/>, or jumping on project ideas, trying new things is a big part of who I am.</span>
          <br />
          <p className="text-base md:text-[19px]">As of right now, however, I'm exploring the intersections technology has with <span className="font-semibold text-orange-400">business + art</span>.</p>
        </div>

        <div className="flex justify-center md:flex-1 md:justify-end md:mr-13 mb-6 md:mb-0">
          <Polaroid
            src="/aboutme.png"
            alt="me"
            date="20/08/2024"
            description="canoe trip! 🛶 ☀️"
            rotation={2.15}
            className="w-[230px] md:w-[280px]"
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl">experience</h2>

        <div className="flex flex-col gap-4 w-full">
          {experience.map((exp, index) => (
            <div key={index} className="flex items-center w-full">
              <div className="flex items-center gap-2 md:w-2/5 min-w-0">
                <Image
                  src={exp.image}
                  alt={exp.alt}
                  width={30}
                  height={30}
                  className="rounded flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-lg m-0 leading-none text-heading-color">
                    {exp.alt}
                  </h3>
                  <p className="text-sm text-detail-color m-0 leading-snug md:hidden">
                    {exp.position}
                  </p>
                </div>
              </div>

              <div className="flex-1 hidden md:block">
                <p className="text-base text-left m-0 text-detail-color leading-none">
                  {exp.position}
                </p>
              </div>

              <div className="ml-auto w-[80px] md:w-[100px] text-right flex-shrink-0">
                <p className="text-base text-gray-500 m-0 text-detail-color leading-none">
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
          <h2 className="text-3xl md:text-4xl">thoughts</h2>
          <p className="text-base md:text-lg text-detail-color">
            I think too much. Sometimes to a fault (so I've been told...)
          </p>
        </div>
        <div className="-mt-4">
          <SubstackThoughts />
        </div>
      </div>
    </div>
  );
}