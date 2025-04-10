export function getPredictionStatus(score: number) {
  if (score >= 85) return { status: "Active", statusColor: "green" };
  if (score >= 70) return { status: "Watching", statusColor: "orange" };
  return { status: "Low Potential", statusColor: "red" };
}

export function getTypeFromMime(mimeType?: string): string {
  if (!mimeType) return "Unknown";
  if (mimeType.startsWith("image/")) return "Image";
  if (mimeType.startsWith("video/")) return "Video";
  return "Other";
}
