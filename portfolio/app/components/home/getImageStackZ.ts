export type ImageHoverKey = 'lelamp' | 'socratica' | 'painting' | 'name' | null

export function getImageStackZ(
  imageHover: ImageHoverKey,
  name: 'lelamp' | 'socratica' | 'painting'
): number {
  const defaultOrder = {
    socratica: 30,
    lelamp: 20,
    painting: 10,
  }
  if (!imageHover) return defaultOrder[name]

  const map = {
    lelamp: { lelamp: 30, socratica: 20, painting: 10 },
    socratica: { socratica: 30, lelamp: 20, painting: 10 },
    painting: { painting: 30, socratica: 20, lelamp: 10 },
    name: { socratica: 30, lelamp: 20, painting: 10 },
  }

  return map[imageHover][name]
}
