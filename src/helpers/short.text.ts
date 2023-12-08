/**
 * Shorten a string to a maximum length
 * @param str
 * @param maxLength
 */
export function shortenString(str: string, maxLength: number): string {
  if (str?.length <= maxLength) {
    return str;
  }
  return str?.substring(0, maxLength) + '...';
}
