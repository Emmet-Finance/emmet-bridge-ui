
// Native token contracts' abi
import USDT_ABI from '../contracts/USDT.ts';
import DAI_ABI from '../contracts/DAI.ts';
import BUSD_ABI from '../contracts/BUSD.ts';
// Wrapped tokens contract abi
import WrappedERC20 from '../contracts/WrappedERC20.ts'
import { ChainNames, TokenNames } from '../types/blockchain.ts';
import { SupportedTokenType } from '../types/blockchain.ts';
// Chain data
export const CHAINS = require('./chains.json');

export const ChainIndices = {
    Goerly : 1,
    tBSC: 2,
    Mumbai: 3,
    Sparknet: 4
}

export const ChainIdToName = {

    // Mainnet
    "0x1": ChainNames.Ethereum,
    "0x38": ChainNames.Binance,
    "0x89": ChainNames.Polygon,
    "0x7a": ChainNames.Fuse,

    // Testnet
    "0x5": ChainNames.Goerly,
    "0x61": ChainNames.tBSC,
    "0x13881": ChainNames.Mumbai,
    "0x7b": ChainNames.Sparknet,
}

export enum ChainNameToId {

    // Testnet
    Goerly = "0x5",
    tBSC = "0x61",
    Mumbai = "0x13881",
    Sparknet = "0x7b",

    // Mainnet
    Ethereum = "0x1",
    Binance = "0x38",
    Polygon = "0x89",
    Fuse = "0x7a",

}

// To define whether chain is Mainnet
export const MainnetNames = [
    ChainNames.Ethereum,
    ChainNames.Binance,
    ChainNames.Polygon,
    ChainNames.Fuse
];

// To define whether chain is Testnet
export const TestnetNames = [
    ChainNames.Goerly,
    ChainNames.tBSC,
    ChainNames.Mumbai,
    ChainNames.Sparknet
];

export const ChainLogos = {
    Ethereum: "/crypto/ethereum.svg",
    Goerly: "/crypto/ethereum.svg",
    Binance: "/crypto/bnb.svg",
    tBSC: "/crypto/bnb.svg",
    Polygon: "/crypto/matic.svg",
    Mumbai: "/crypto/matic.svg",
    Fuse: "/crypto/fuse.svg",
    Sparknet: "/crypto/fuse.svg",
}

export const TokenLogos = {
    BNB: "/crypto/bnb.svg",
    BTC: "/crypto/btcb.svg",
    BUSD: "/crypto/busd.svg",
    DAI: "/crypto/dai.svg",
    FUSE: "/crypto/fuse.svg",
    USDC: "/crypto/usdc.svg",
    USDT: "/crypto/usdt.svg",
    WBTC: "/crypto/wbtc.svg",
}

export const SupportedTokens: SupportedTokenType[] = [
    {
        nativeABI: USDT_ABI,
        nativeChain: ChainNames.Goerly,
        wrappedABI: WrappedERC20,
        contractAddresses: {
            Goerly: CHAINS.goerly.nativeTokens.USDT.address,
            tBSC: CHAINS.tbsc.wrappedTokens.USDT.address,
            Mumbai: CHAINS.mumbai.wrappedTokens.USDT.address,
            Sparknet: CHAINS.sparknet.wrappedTokens.USDT.address,
        },
        decimals:CHAINS.goerly.nativeTokens.USDT.decimals,
        imageLink: TokenLogos.USDT,
        name: TokenNames.USDT,
    },
    {
        nativeABI:DAI_ABI,
        nativeChain: ChainNames.Goerly,
        wrappedABI: WrappedERC20,
        contractAddresses: {
            Goerly: CHAINS.goerly.nativeTokens.DAI.address ,
            tBSC: CHAINS.tbsc.wrappedTokens.DAI.address ,
            Mumbai: CHAINS.mumbai.wrappedTokens.DAI.address ,
            Sparknet: CHAINS.sparknet.wrappedTokens.DAI.address ,
        },
        decimals:CHAINS.goerly.nativeTokens.DAI.decimals,
        imageLink: TokenLogos.DAI,
        name: TokenNames.DAI,
    },
    {
        nativeABI:BUSD_ABI,
        nativeChain: ChainNames.Goerly,
        wrappedABI: WrappedERC20,
        contractAddresses: {
            Goerly: CHAINS.goerly.nativeTokens.BUSD.address ,
            tBSC: CHAINS.tbsc.wrappedTokens.BUSD.address ,
            Mumbai: CHAINS.mumbai.wrappedTokens.BUSD.address ,
            Sparknet: CHAINS.sparknet.wrappedTokens.BUSD.address ,
        },
        decimals:CHAINS.goerly.nativeTokens.BUSD.decimals,
        name: TokenNames.BUSD,
        imageLink: TokenLogos.BUSD,
    }
];