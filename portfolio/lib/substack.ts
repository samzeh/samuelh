export const SUBSTACK_PUBLICATION_URL = "https://samandthoughts.substack.com";

export type SubstackPost = {
  id: number;
  title: string;
  subtitle: string | null;
  url: string;
  cover_image: string | null;
};

function normalizePost(raw: Record<string, unknown>): SubstackPost | null {
  if (typeof raw.id !== "number" || typeof raw.slug !== "string") {
    return null;
  }

  const url =
    typeof raw.canonical_url === "string"
      ? raw.canonical_url
      : `${SUBSTACK_PUBLICATION_URL}/p/${raw.slug}`;

  return {
    id: raw.id,
    title: typeof raw.title === "string" ? raw.title : "",
    subtitle: typeof raw.subtitle === "string" ? raw.subtitle : null,
    url,
    cover_image: typeof raw.cover_image === "string" ? raw.cover_image : null,
  };
}

export async function fetchSubstackArchive(
  limit = 5
): Promise<SubstackPost[]> {
  const res = await fetch(
    `${SUBSTACK_PUBLICATION_URL}/api/v1/archive?limit=${limit}`,
    {
      next: { revalidate: 60 * 60 * 24 * 7 }, // 1 week
    }
  );

  if (!res.ok) return [];

  const data: unknown = await res.json();
  if (!Array.isArray(data)) return [];

  return data
    .map((item) =>
      item && typeof item === "object"
        ? normalizePost(item as Record<string, unknown>)
        : null
    )
    .filter((post): post is SubstackPost => post !== null);
}