import Image from "next/image";

export type ImageContainerImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ImageContainer({
  images,
  layout = "row",
  gap = 16,
  rounded = true,
}: {
  images: ImageContainerImage[];
  layout?: "row" | "column" | "grid";
  gap?: number;
  rounded?: boolean;
}) {
  if (!images.length) return null;

  let containerClass = "";
  if (layout === "row") containerClass = "flex flex-col sm:flex-row flex-wrap";
  if (layout === "column") containerClass = "flex flex-col";
  if (layout === "grid") containerClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr";

  return (
    <div
      className={containerClass + " my-8"}
      style={{ gap, width: "100%", maxWidth: "100%" }}
    >
      {images.map((img, i) => (
        <div
          key={img.src + i}
          style={{ width: layout === "row" ? "100%" : "auto", maxWidth: "100%" }}
          className={layout === "row" ? "flex-1 min-w-0" : "w-full"}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width || 600}
            height={img.height || 400}
            className={
              (rounded ? "rounded " : "") + (img.className || "")
            }
            style={{ objectFit: "cover", width: "100%", height: "auto", maxWidth: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}
