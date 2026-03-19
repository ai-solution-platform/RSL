/**
 * Format a number as Thai Baht currency string
 */
export function formatPrice(amount: number): string {
  return `฿${amount.toLocaleString('th-TH')}`;
}

/**
 * Format area in square meters with Thai/English unit
 */
export function formatSize(sqm: number, lang: 'th' | 'en' = 'th'): string {
  return `${sqm.toLocaleString()} ${lang === 'th' ? 'ตร.ม.' : 'sqm'}`;
}

/**
 * Merge class names, filtering out falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Return a relative time string from an ISO date
 */
export function getTimeAgo(date: string, lang: 'th' | 'en' = 'th'): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffMin < 1) {
    return lang === 'th' ? 'เมื่อกี้' : 'Just now';
  }
  if (diffMin < 60) {
    return lang === 'th'
      ? `${diffMin} นาทีที่แล้ว`
      : `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  }
  if (diffHr < 24) {
    return lang === 'th'
      ? `${diffHr} ชั่วโมงที่แล้ว`
      : `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  }
  if (diffDay < 7) {
    return lang === 'th'
      ? `${diffDay} วันที่แล้ว`
      : `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  }
  if (diffWeek < 5) {
    return lang === 'th'
      ? `${diffWeek} สัปดาห์ที่แล้ว`
      : `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  }
  return lang === 'th'
    ? `${diffMonth} เดือนที่แล้ว`
    : `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
}

/**
 * Truncate a string to a maximum length with ellipsis
 */
export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len).trimEnd() + '...';
}
