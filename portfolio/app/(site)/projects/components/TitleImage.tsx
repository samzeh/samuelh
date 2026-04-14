import Image from "next/image";

type StatItem = {
  label: string;
  values: string[];
};

interface TitleImageProps {
  src?: string;
  alt?: string;
  vimeoId?: string;
  zoom?: number;
  stats: StatItem[];
}

export default function TitleImage({ src, alt, vimeoId, zoom = 1, stats }: TitleImageProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Top media with responsive rounding */}
      <div
        className="relative overflow-hidden rounded-t-sm md:rounded-t-md border border-[#E7EEF3]"
        style={{ aspectRatio: "16/9" }}
      >
        {vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: `${zoom * 100}%`,
              height: `${zoom * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            className="object-cover object-center"
          />
        ) : null}
      </div>

      {/* Stats bar with responsive rounding */}
      <div className="flex flex-col md:flex-row justify-start gap-x-6 sm:gap-x-10 md:gap-x-12 lg:gap-x-30 gap-y-3 md:gap-y-0 bg-white border-b border-l border-r rounded-b-md md:rounded-b-lg border-[#E7EEF3] px-4 sm:px-6 py-4 overflow-x-auto">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <h1 className="text-lg text-heading-color -mb-1">{stat.label}</h1>
            <div className="flex flex-col">
              {stat.values.map((val, i) => (
                <p key={i} className={`text-md text-detail-color ${i !== 0 ? "-mt-1" : ""}`}>
                  {val}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}