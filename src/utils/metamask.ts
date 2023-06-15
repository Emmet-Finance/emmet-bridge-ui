export let currentAccount: any = null;
export let chainId: any = null;
let metamask: any;

try {

    metamask = (window as any).ethereum;
    
} catch (error) {
    console.error(error);
}

export {metamask};


/** V
 * Sets the currentAccount to accounts[0]
 * @param accounts EVM accounts from Metamask
 */
export const handleAccountsChanged = (accounts: any[]) => {
    if (accounts.length === 0) {
        // TODO: replace with a pop-up window:
        console.log("Please, connect to Metamask")
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
    }
}

/**
 * Copies some text to clipboard
 * @param data a string to be copied to clipboard
 */
export const copyAddressToClipboard = (account:string) => {
    navigator.clipboard.writeText(account);
}