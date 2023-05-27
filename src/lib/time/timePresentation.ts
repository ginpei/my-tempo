export function timeToString(time: number) {
  return Number.isNaN(time) ? "N/A" : new Date(time).toISOString();
}
