export default function Quotation({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Left accent line with rounded corners */}
      <div className="w-1 bg-[#F5900B] rounded-full mr-3" />
      
      {/* Quote text */}
      <blockquote className="italic text-detail-color tracking-normal">
        {children}
      </blockquote>
    </div>
  );
}