import Image from 'next/image';

export default function HighlightWrapper({
  active,
  src,
  children,
  className = "",
}: {
  active: boolean
  src: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      {active && (
        <Image
          src={src}
          alt="highlight"
          fill
          className="object-contain pointer-events-none z-0 scale-110 translate-y-2 highlight-swipe"
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}