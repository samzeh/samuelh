import Image from "next/image";
import { fetchSubstackArchive, SUBSTACK_PUBLICATION_URL } from "@/lib/substack";
import SubstackCircleLink from "./SubstackCircleLink";

export default async function SubstackThoughts() {
  const posts = await fetchSubstackArchive(12);

  if (posts.length === 0) {
    return (
      <p className="text-lg text-detail-color text-detail">
        Couldn&apos;t load posts right now. Read on{" "}
        <a
          href={`${SUBSTACK_PUBLICATION_URL}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80"
        >
          Substack
        </a>
        .
      </p>
    );
  }

  return (
    <div className="flex gap-5 overflow-x-auto no-scrollbar pr-6">
      {posts.map((post) => {
        const blurb = post.subtitle?.trim() || post.subtitle?.trim() || "";

        return (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 group outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#514433]/30 focus-visible:ring-offset-2 w-[313px] flex-shrink-0"          >
            {post.cover_image ? (
              <div className="relative w-full max-w-[313px] aspect-[313/219] overflow-hidden rounded-sm bg-[#f5f2ed]">
                <Image
                  src={post.cover_image}
                  alt={post.title ? `${post.title} cover` : "Post cover"}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-80"
                  sizes="(max-width: 768px) 100vw, 313px"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-0 max-w-lg">
              <p className="text-lg text-heading-color text-heading m-0 group-hover:underline underline-offset-4 decoration-from-font truncate">
                {post.title}
              </p>
              {blurb ? (
                <p className="text-base text-detail-color text-detail m-0 -mt-1 truncate">
                  {blurb}
                </p>
              ) : null}
            </div>
          </a>
        );
      })}

      <SubstackCircleLink href={`${SUBSTACK_PUBLICATION_URL}/`} />
    </div>
  );
}
