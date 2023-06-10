
export enum ChainNames {
    // Testnet chains
    Goerly = "Goerly",
    tBSC = "tBSC",
    Mumbai = "Mumbai",
    Sparknet = "Sparknet",
    // Miannet chains
    Ethereum = "Ethereum",
    Binance = "Binance",
    Polygon = "Polygon",
    Fuse = "Fuse"
}

export enum TokenNames {
    // Supported
    BUSD = "BUSD",
    DAI = "DAI",
    USDT = "USDT",
    // // Unsupported Coins - TODO add support
    // BNB = "BNB", // Native BSC
    // ETH = "ETH", // Native Ethereum & Goerly
    // MATIC = "MATIC", // Native Polygon & Mumbai
    // FUSE = "FUSE", // Native Fuse & Sparknet
    // // Unsupported tokens:
    // USDC = "USDC",
    // BTC = "BTC",
    // WBTC = "WBTC",
}

export type TChangeMMChain = {
    ethereum: any,
    newChain: {
        chainName: string,
        chainId: number,
        nativeCurrency: {
            name: string,
            decimals: number,
            symbol: string
        },
        rpcUrls: string[]
    }
}

export type TokenBalanceParams = {
    account: string,
    contractAddress: string,
    abi: any,
    provider: any,
    decimals: number,
    bridge: string
}

export type EVMChainType = TChangeMMChain & {
    bridge: string,
    nativeTokens: any,
    wrappedTokens: any
}

export type TokenAddresses = { [key in ChainNames]?: string }

export type SupportedTokenType = {
    nativeABI: any,
    nativeChain: ChainNames,
    wrappedABI: any,
    contractAddresses: TokenAddresses,
    decimals: number,
    imageLink: string,
    name: TokenNames
}

export type ApproveParams = {
    chainName: ChainNames,
    value: BigInt,
    token: TokenNames
}

export type SendParams = {
    chainName: ChainNames,
    amount: number,
    chainId: number,
    tokenSymbol: TokenNames,
    destinationAddress: string
}