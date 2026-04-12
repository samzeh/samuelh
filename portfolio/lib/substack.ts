/** Public Substack archive JSON — same surface the Python substack-api client uses. */

export const SUBSTACK_PUBLICATION_URL = "https://samandthoughts.substack.com";

export type SubstackArchivePost = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  canonical_url: string;
  cover_image: string | null;
  post_date: string;
  slug: string;
};

function normalizePost(raw: Record<string, unknown>): SubstackArchivePost | null {
  const id = raw.id;
  const slug = raw.slug;
  if (typeof id !== "number" || typeof slug !== "string") return null;

  const canonical =
    typeof raw.canonical_url === "string"
      ? raw.canonical_url
      : `${SUBSTACK_PUBLICATION_URL}/p/${slug}`;

  return {
    id,
    title: typeof raw.title === "string" ? raw.title : "",
    subtitle: typeof raw.subtitle === "string" ? raw.subtitle : null,
    description: typeof raw.description === "string" ? raw.description : null,
    canonical_url: canonical,
    cover_image: typeof raw.cover_image === "string" ? raw.cover_image : null,
    post_date: typeof raw.post_date === "string" ? raw.post_date : "",
    slug,
  };
}

export async function fetchSubstackArchive(
  limit = 10
): Promise<SubstackArchivePost[]> {
  const url = `${SUBSTACK_PUBLICATION_URL}/api/v1/archive?limit=${limit}`;
  const res = await fetch(url, {
    next: { revalidate: 300 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return [];

  const data: unknown = await res.json();
  if (!Array.isArray(data)) return [];

  const posts: SubstackArchivePost[] = [];
  for (const item of data) {
    if (item && typeof item === "object") {
      const normalized = normalizePost(item as Record<string, unknown>);
      if (normalized) posts.push(normalized);
    }
  }
  return posts;
}
