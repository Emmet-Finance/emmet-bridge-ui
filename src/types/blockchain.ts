
export enum TSupportedChainNames {
    Ethereum="Ethereum",
    BSC="BSC",
    Polygon="Polygon",
    Fuse="Fuze"
}

export type TChangeMMChain = {
    ethereum:any,
    newChain:{
        chainName:string,
        chainId:number,
        nativeCurrency:{
            name:string,
            decimals:number,
            symbol:string
        },
        rpcUrls: string[]
    }
}