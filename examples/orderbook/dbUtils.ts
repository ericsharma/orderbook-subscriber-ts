export function smaller(a: number, b: number) {
  return a < b ? a : b
}
export function bigger(a: number, b: number) {
  return a > b ? a : b
}

export function formatAssetsForDB(a: number, b: number): { olderAssetId: string; newerAssetId: string } {
  const olderAssetId = smaller(a, b).toString()
  const newerAssetId = bigger(a, b).toString()
  return {
    olderAssetId,
    newerAssetId,
  }
}
