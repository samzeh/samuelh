import Image from "next/image";
import { fetchSubstackArchive, SUBSTACK_PUBLICATION_URL } from "@/lib/substack";

function formatPostDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

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
    <div className="flex flex-col gap-10">
      {posts.map((post) => {
        const blurb = post.subtitle?.trim() || post.description?.trim() || "";
        const dateLabel = formatPostDate(post.post_date);

        return (
          <a
            key={post.id}
            href={post.canonical_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 group outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#514433]/30 focus-visible:ring-offset-2"
          >
            {post.cover_image ? (
              <div className="relative w-full max-w-[313px] aspect-[313/219] overflow-hidden rounded-sm bg-[#f5f2ed]">
                <Image
                  src={post.cover_image}
                  alt={post.title ? `${post.title} cover` : "Post cover"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 313px"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-0 max-w-lg">
              {dateLabel ? (
                <p className="text-sm text-detail-color text-detail m-0">
                  {dateLabel}
                </p>
              ) : null}
              <p className="text-xl text-heading-color text-heading m-0 group-hover:underline underline-offset-4 decoration-from-font">
                {post.title}
              </p>
              {blurb ? (
                <p className="text-lg text-detail-color text-detail m-0 line-clamp-3">
                  {blurb}
                </p>
              ) : null}
            </div>
          </a>
        );
      })}
    </div>
  );
}
