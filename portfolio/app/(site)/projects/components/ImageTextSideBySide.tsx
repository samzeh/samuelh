import Image from "next/image";
import React from "react";

export type SideImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

interface ImageTextSideBySideProps {
  images?: SideImage[];
  imageLeft?: boolean;
  children: React.ReactNode;
  gap?: number;
  rounded?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  aspectRatio?: string; // "16/9", "1:1", "1:2", etc.
}

export default function ImageTextSideBySide({
  images = [],
  imageLeft = true,
  children,
  gap = 32,
  rounded = true,
  imageWidth = 400,
  imageHeight = 300,
  aspectRatio,
}: ImageTextSideBySideProps) {
  const imageCardWidth = imageWidth;

  return (
    <div
      className="flex flex-col md:flex-row items-start w-full my-8"
      style={{ gap }}
    >
      {/* Images */}
      <div
        className={`w-full md:w-auto md:min-w-max md:shrink-0 flex flex-wrap gap-4 ${
          imageLeft ? "md:justify-start" : "md:justify-end"
        } ${
          imageLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        {images.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative w-full md:w-(--itsb-card-width) md:flex-none"

            style={{
              maxWidth: `${imageCardWidth}px`,
              // CSS var lets us keep full-width on mobile while fixing desktop card width.
              ["--itsb-card-width" as string]: `${imageCardWidth}px`,
              aspectRatio: aspectRatio
                ? aspectRatio.replace(":", " / ")
                : `${img.width || imageWidth} / ${
                    img.height || imageHeight
                  }`,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={`object-contain ${
                rounded ? "rounded" : ""
              } ${img.className || ""}`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Text */}
      <div
        className={`w-full md:flex-1 min-w-0 flex flex-col items-start justify-start ${
          imageLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        {children}
      </div>
    </div>
  );
}