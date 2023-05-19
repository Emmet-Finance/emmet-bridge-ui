import { CurrentChain, IDropDownItem, TCookie } from "../types/ui.ts";
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

export const chainNameToLogo = (name: string): string => {
    let link = ''
    combinedChains.map((chain: IDropDownItem): void => {
        if (name === chain.name) {
            link = chain.imageLink
        }
    })
    return link
}

export const chainIdToChainLogo = (chainId: any) => {
    return chains[chainId.toString()].icon;
}

export const roundTwoDigits = (num: number) => {
    return parseFloat(num.toString()).toFixed(2);
}

export const tokenNameToLogo = (name: string): string => {
    let logo: string = ''
    tokens.map((token: IDropDownItem) => {
        if (token.name === name) {
            logo = token.imageLink
        }
    });
    return logo;
}

/**
 *  C O O K I E S
 */

export const hasCookies = ():boolean => {
    return document.cookie.length > 0;
}

/**
 * Checks whether a key exists in a cookie
 * @param key the checked key
 * @returns true | false
 */
export const cookieHasKey = (key: string): boolean => {
    if ( document
        .cookie
        .split(';')
        .some(item => item.trim()
            .startsWith(`${key}=`))) {
        return true;
    } else { return false; }
}

/**
 * Reads a cookie by key
 * @param key the lookup key
 * @returns the value or ''
 */
export const readCookieByKey = (key: string): string => {
    if (hasCookies() && cookieHasKey(key)) {
        return document
            .cookie
            .split(';')
            .find(item => {
                return item.trim()
                    .startsWith(`${key}=`)
            })?.split('=')[1] as string;
    } else { return ''; }
}

/**
 * Adds or updates a cookie
 * @param newCookie \{key,value,days?,hours?,minutes?,seconds?}
 */
export const addCookie = (newCookie: TCookie) => {
    let expire = new Date();
    if (newCookie.days) { expire.setDate(expire.getDate() + newCookie.days) }
    if (newCookie.hours) { expire.setHours(expire.getHours() + newCookie.hours) }
    if (newCookie.minutes) { expire.setMinutes(expire.getMinutes() + newCookie.minutes) }
    if (newCookie.seconds) { expire.setSeconds(expire.getSeconds() + newCookie.seconds) }
    document.cookie = `${newCookie.key}=${newCookie.value};domain=${window.location.hostname};path=/;expires=${expire};`
}

/**
 * Delets a cookie by key
 * @param key the lookup key
 */
export const deleteCookie = (key: string) => {
    if (hasCookies() && cookieHasKey(key)){
        const toDelete: TCookie = {
            key,
            value: '',
            seconds: 1
        }
        addCookie(toDelete)

    }
}