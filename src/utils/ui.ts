import { CurrentChain } from "../types/ui";
const chains = require('../data/chainIds.json');

/**
 * Gets the chain Name & isTestnet from chainId
 * @param chainId - the EVM chainId as hex or string
 * @returns type CurrentChain {name,isTestnet,chainId}
 */
export const chainIdToChainName = (chainId:number|string): CurrentChain => {
    // const chains = require('../data/chainIds.json');
    const currentChain = chains[chainId.toString()];
    return {
        name: currentChain.name, 
        isTestnet: currentChain['testnet'],
        chainId
    };
}

export const chainIdToChainLogo = (chainId:any) => {
    return chains[chainId.toString()].icon;
}

export const roundTwoDigits = (num:number) => {
    return parseFloat(num.toString()).toFixed(2);
}