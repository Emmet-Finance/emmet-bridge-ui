import { ethers } from 'ethers'

/**
 * Creates a Web3Provider
 * @returns a Web3Provider
 */
export const getEvmProvider = (): ethers.providers.Web3Provider => {
    return new ethers.providers.Web3Provider((window as any).ethereum);
}

/**
 * Gets the coin balance of the EVM account
 * @param window window & & globalThis
 * @param account an EVM account
 * @returns balance of the account in native coins
 */
export const getNativeCoinBalance = async (account: string) => {
    return await getEvmProvider().getBalance(account);
}

/**
 * Formats a BigNumber balance to human readable
 * @param balance 
 * @returns a human readable balance as string
 */
export const formatEther = (balance:ethers.BigNumberish): string => {
    return ethers.utils.formatEther(balance);
}