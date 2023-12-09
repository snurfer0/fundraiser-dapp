/**
 * Copy string to clipboard
 * @param content
 */
export const copyStringToClipboard = async (
  str?: string | number | null,
): Promise<boolean> => {
  try {
    str = String(str);
    if (!str.length) throw new Error('Invalid string');
    await navigator.clipboard.writeText(str);
    return true;
  } catch (error) {
    return false;
  }
};
