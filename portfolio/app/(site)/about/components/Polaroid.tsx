import Image from "next/image";

type PolaroidProps = {
  src: string;
  alt: string;
  date: string;
  description: string;
  rotation?: number;
  className?: string;
};

export default function Polaroid({
  src,
  alt,
  date,
  description,
  rotation = 0,
  className = "",
}: PolaroidProps) {
  return (
    <div
      className={`bg-[#FFFEFA] p-4 shadow-md inline-block transition-transform ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center",
      }}
    >
      {/* Image frame (keeps polaroid aspect ratio) */}
      <div className="relative w-full aspect-[0.85] border border-[#F3F3F3]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>

      {/* Text */}
      <div className="mt-1 text-left">
        <p className="text-lg text-heading text-heading-color">{date}</p>
        <p className="text-base text-detail text-detail-color">
          {description}
        </p>
      </div>
    </div>
  );
}