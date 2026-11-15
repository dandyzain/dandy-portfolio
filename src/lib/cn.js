// Tiny className joiner (avoids an extra dependency).
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
