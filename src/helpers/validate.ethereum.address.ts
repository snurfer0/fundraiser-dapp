import { getAddress } from 'ethers';

/**
 * Check if the given address is a valid Ethereum address
 * @param address
 */
export function isEthereumAddress(address: string): boolean {
  try {
    getAddress(address);
    return true;
  } catch (error) {
    return false;
  }
}
