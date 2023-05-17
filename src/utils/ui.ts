import { CurrentChain, IDropDownItem } from "../types/ui.ts";
const chains = require('../data/chainIds.json');
const tokens = require('../data/tokens.json')
const testnetChains = require('../data/testnetChains.json')
const mainnetChains = require('../data/mainnetChains.json')
const combinedChains = mainnetChains.concat(testnetChains)

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

export const chainNameToLogo = (name:string):string => {
    let link = ''
    combinedChains.map((chain:IDropDownItem):void => {
        if(name === chain.name){
            link = chain.imageLink
        }
    })
    return link
}

export const chainIdToChainLogo = (chainId:any) => {
    return chains[chainId.toString()].icon;
}

export const roundTwoDigits = (num:number) => {
    return parseFloat(num.toString()).toFixed(2);
}

export const tokenNameToLogo = (name:string):string => {
    let logo:string = ''
    tokens.map((token:IDropDownItem) => {
        if(token.name === name){
            logo = token.imageLink
        }
    });
    return logo;
}