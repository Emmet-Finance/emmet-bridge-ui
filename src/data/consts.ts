
import USDT_ABI from '../contracts/USDT.ts';
export const CHAINS = require('./chains.json');

export const ChainIdToName = {

    // Mainnet
    "0x1": "Ethereum",
    "0x38": "Binance",
    "0x89": "Polygon",
    "0x7a": "Fuse",

    // Testnet
    "0x5": "Goerly",
    "0x61": "tBSC",
    "0x13881": "Mumbai",
    "0x7b": "Sparknet",
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

export const MainnetNames = [
    "Ethereum",
    "Binance",
    "Polygon",
    "Fuse"
];

export const TestnetNames = [
    "Goerly",
    "tBSC",
    "Mumbai",
    "Sparknet"
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
    USDT: "/crypto/usdt.svg",
    USDC: "/crypto/usdc.svg",
    BUSD: "/crypto/busd.svg",
}

export const SupportedTokens = [
    {
        abi: USDT_ABI,
        chains: {
            tBSC: "0xf2851831674d1630f49a9c000A34d5A8E167577C",
            Mumbai: "0x0A6A1Beb7b0b3545578818f45f4e6219615d25aD",
            Goerly: "0x291E558C60FB567087D9b87bd62b84Af67b9a376",
            Sparknet: "0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5",
        },
        decimals:18,
        imageLink: "/crypto/usdt.svg",
        name: "USDT",
    },
    {
        abi:[''],
        chains: {
            tBSC: "",
            Mumbai: "",
            Goerly: "",
            Sparknet: "",
        },
        decimals:18,
        imageLink: "/crypto/usdc.svg",
        name: "USDC",
    },
    {
        abi:[''],
        chains: {
            tBSC: "",
            Mumbai: "",
            Goerly: "",
            Sparknet: "",
        },
        decimals:18,
        name: "BUSD",
        imageLink: "/crypto/busd.svg",
    }
];