import Image from "next/image";

type InlineItemProps = {
  label?: string;
  icon: string;
  iconAlt: string;
  children: React.ReactNode;
};

export default function InlineItem({ label, icon, iconAlt, children }: InlineItemProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {label && <span>{label}</span>}

      <Image
        src={icon}
        alt={iconAlt}
        width={20}
        height={20}
        className="rounded"
      />

      <span>{children}</span>
    </span>
  );
}