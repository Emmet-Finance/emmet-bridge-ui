import { ethers } from 'ethers';
import { ChainNames, TokenNames } from '../types/blockchain';
import { SupportedTokens } from '../data/consts';
import { SupportedTokenType } from '../types/blockchain';
import { getEvmProvider } from './read';
import BRIDGE_ABI from '../contracts/FTBridge';
// Chain data
export const CHAINS = require('../data/chains.json');


/**
 * Creates an EVM Signer object
 * @returns a JsonRpcSigner object
 */
export const getEVMSigner = async (): Promise<ethers.providers.JsonRpcSigner> => {
    const provider = getEvmProvider();
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
}


/**
 * Creates the token handler object with a browser signer
 * @param token token symbol
 * @param chainName original chain to find the token contract
 * @returns the token contract handler with the browser signer
 */
export const getTokenContract = async (
    token: TokenNames,
    chainName: ChainNames
): Promise<ethers.Contract | undefined> => {

    let tokenStruct: SupportedTokenType[] | SupportedTokenType
        = SupportedTokens.filter((item: SupportedTokenType) => item.name === token);

    if (tokenStruct) {
        // Unwrap the token struct from an array
        tokenStruct = tokenStruct[0];
        // Extract the token address
        let address: string = tokenStruct.contractAddresses[chainName]! as string;
        if (!address) { return undefined }

        // Select the native or wrapped ABI
        const isNative = chainName === tokenStruct.nativeChain;
        const abi = isNative ? tokenStruct.nativeABI : tokenStruct.wrappedABI;

        const signer: ethers.providers.JsonRpcSigner = await getEVMSigner();

        // Create and return a contract handler
        const contract = new ethers.Contract(address, abi, signer);
        return contract;

    } else {
        // Not found in SupportedTokens
        return undefined;
    }

}


/**
 * Creates the bridge handler object with a browser signer
 * @param chainName original chain to find the bridge contract
 * @returns the bridge contract handler with the browser signer
 */
export const getBridgeContract = async (
    chainName: ChainNames
): Promise<ethers.Contract | undefined> => {

    try {
        // Find the bridge address by the chain of origin
        const bridgeContractAddress: string = CHAINS[chainName.toLowerCase()].bridge;
        // Extract the browser signer
        const signer: ethers.providers.JsonRpcSigner = await getEVMSigner();
        // Create and return a contract handler
        return new ethers.Contract(bridgeContractAddress, BRIDGE_ABI, signer);

    } catch (error) {
        console.error(error);
        return undefined;
    }

}


/**
 * Approves token transfers
 * @param chainName original chain to find the token contract
 * @param value amount planned for approval
 * @param token token symbol, ex.: USDT
 * @returns \{ hash: string, status: number, amount: BigInt }
 */
export const approveERC20 = async (
    chainName: ChainNames,
    value: BigInt,
    token: TokenNames
): Promise<{ hash: string, status: number, amount: BigInt }> => {

    try {

        // Get the token contract handler
        const contract = await getTokenContract(token, chainName);
        // Find the original chain bridge contract
        const bridgeContractAddress: string = CHAINS[chainName.toLowerCase()].bridge;
        // Find the token decimals
        const decimals = await contract!.functions.decimals();
        // Compute the amount with decimals
        const amount = ethers.utils.parseUnits(value.toString(), decimals);
        // Allow the bridge contract to spend the `amount` of tokens
        const receipt = await contract!.functions.approve(bridgeContractAddress, amount.toString());
        // Await the result to get the status
        const result = await receipt.wait();

        if (result) {
            // Get the transaction hash
            const hash: string = result.transactionHash;
            // 1 - success, 0 - reverted
            const status: number = result.status as number;
            return { hash, status, amount: value }
        } else {
            throw new Error("Failed to receive the transaction response");
        }

    } catch (error) {
        console.error(error);
        return { hash: '', status: 0, amount: 0n };
    }

}


/**
 * Sends the SendInstallment transaction
 * @param chainName original chain id to find the bridge address
 * @param value the tokens to be sent (without decimals)
 * @param chainId destination chain ID
 * @param tokenSymbol the name of the token, Ex.: USDT
 * @param destinationAddress 
 * @returns the TX hash & its status: 1 | 0
 */
export const TransferERC20 = async (
    chainName: ChainNames,
    value: number,
    chainId: number,
    tokenSymbol: TokenNames,
    destinationAddress: string
): Promise<{ hash: string, status: number }> => {

    try {
        // Find the right token in the supported
        let tokenStruct: SupportedTokenType[] | SupportedTokenType
            = SupportedTokens.filter((item: SupportedTokenType) => item.name === tokenSymbol);

        if (tokenStruct) {

            // Create the bridge contract instance
            const bridge = await getBridgeContract(chainName);
            // Find the token decimals
            const decimals = tokenStruct[0].decimals;
            // Compute the amount with decimals
            const amount = ethers.utils.parseUnits(value.toString(), decimals);

            const receipt = await bridge?.functions.sendInstallment([
                amount,                 // uint256 amount - Transferred amount > 0, < 2^256
                chainId,                // uint16 chainId - Destination chain nonce (to chain)
                tokenSymbol.toString(), // string tokenSymbol - Ex.: USDT, BNB...
                destinationAddress      // String - for compatibility with NON-EVMs
            ]);

            // To get status - need to wait
            const result = await receipt.wait();

            return { hash: result.transactionHash, status: result.status }

        } else {
            throw new Error("Unsupported Token");
        }

    } catch (error) {
        console.error(error);
        return { hash: '', status: 0 };
    }

}