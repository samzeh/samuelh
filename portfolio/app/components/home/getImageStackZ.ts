export type ImageHoverKey = 'hardhat' | 'socratica' | 'painting' | 'name' | null

export function getImageStackZ(
  imageHover: ImageHoverKey,
  name: 'hardhat' | 'socratica' | 'painting'
): number {
  const defaultOrder = {
    socratica: 30,
    hardhat: 20,
    painting: 10,
  }
  if (!imageHover) return defaultOrder[name]

  const map = {
    hardhat: { hardhat: 30, socratica: 20, painting: 10 },
    socratica: { socratica: 30, hardhat: 20, painting: 10 },
    painting: { painting: 30, socratica: 20, hardhat: 10 },
    name: { socratica: 30, hardhat: 20, painting: 10 },
  }

  return map[imageHover][name]
}
