import { CurrentChain, IDropDownItem } from "../types/ui.ts";
const chains = require('../data/chainIds.json');
const tokens = require('../data/tokens.json')
const chainIds = require('../data/chainIds.json')
const testnetChains = require('../data/testnetChains.json')
const mainnetChains = require('../data/mainnetChains.json')
const combinedChains = mainnetChains.concat(testnetChains)

/**
 * Gets the chain Name & isTestnet from chainId
 * @param chainId - the EVM chainId as hex or string
 * @returns type CurrentChain {name,isTestnet,chainId}
 */
export const chainIdToChainName = (chainId: number | string): CurrentChain => {
    const currentChain: CurrentChain = chainIds[chainId.toString()];
    if (currentChain) {
        return currentChain;
    } else {
        return {
            name: 'Not Found',
            isTestnet: true,
            chainId
        }
    }
}

/**
 * Finds the logo by the chain name
 * @param name chain name
 * @returns the link to the chain logo
 */
export const chainNameToLogo = (name: string): string => {
    let link = ''
    // eslint-disable-next-line array-callback-return
    combinedChains.map((chain: IDropDownItem): void => {
        if (name === chain.name) {
            link = chain.imageLink
        }
    })
    return link
}

/**
 * Finds the chain logo by chainId
 * @param chainId lookup ID
 * @returns the link to the chain logo
 */
export const chainIdToChainLogo = (chainId: any) => {
    return chains[chainId.toString()].icon;
}

/**
 * Rounds a number to n digits after zero 0.00
 * @param num number to be rounded
 * @param digits decimals after period .00
 * @returns a rounded number
 */
export const roundTwoDigits = (num: number, digits:number) => {
    return parseFloat(num.toString()).toFixed(digits);
}

/**
 * Finds the token logo by its name 
 * @param name token name
 * @returns the link to the token logo
 */
export const tokenNameToLogo = (name: string): string => {
    let logo: string = ''
    // eslint-disable-next-line array-callback-return
    tokens.map((token: IDropDownItem) => {
        if (token.name === name) {
            logo = token.imageLink
        }
    });
    return logo;
}