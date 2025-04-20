export function formatDuration(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor(duration / (1000 * 60 * 60));

  const formattedDuration = `${hours}時間${minutes}分${seconds}秒`;
  return formattedDuration;
}
