// Override thumbnail/preview images for specific products by name substring
const OVERRIDES: Record<string, string> = {
  'me vs me': '/images/me-vs-me-hoodie.png',
};

export function getProductImageOverride(productName: string): string | null {
  const lower = productName.toLowerCase();
  for (const [key, url] of Object.entries(OVERRIDES)) {
    if (lower.includes(key)) return url;
  }
  return null;
}
