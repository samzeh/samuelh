export default function Quotation({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex my-8">

      <div className="w-1 bg-[#F5900B] rounded-full mr-3" />
      
      <blockquote className="italic text-detail-color tracking-normal">
        {children}
      </blockquote>
    </div>
  );
}