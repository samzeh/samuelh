import Image from "next/image";

type PolaroidProps = {
  src: string;
  alt: string;
  width: number; 
  date: string;
  description: string;
  rotation?: number;
};

export default function Polaroid({
  src,
  alt,
  width,
  date,
  description,
  rotation = 0,
}: PolaroidProps) {
  const imageHeight = width / 0.85;

  return (
    <div className="bg-[#FFFEFA] p-4 shadow-md inline-block"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      >
      
      {/* Image frame */}
      <div
        className="relative border"
        style={{
          width,
          height: imageHeight,
          borderColor: "#F3F3F3",
          borderWidth: "1px",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Text aligned to image width */}
      <div style={{ width }} className="mt-1 text-left">
        <p className="text-lg text-heading text-heading-color">{date}</p>
        <p className="text-base text-detail text-detail-color">{description}</p>
      </div>
    </div>
  );
}