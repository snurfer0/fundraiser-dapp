/**
 * Shortens an Ethereum address by removing the middle part.
 * @param address
 * @param prefixLength
 * @param suffixLength
 */
export function shortenEthereumAddress(
  address: string,
  prefixLength = 2,
  suffixLength = 2
): string {
  if (address.length <= prefixLength + suffixLength + 2) {
    // Address is too short to shorten.
    return address;
  }

  const prefix = address.slice(0, prefixLength + 2); // Include "0x" prefix.
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}
