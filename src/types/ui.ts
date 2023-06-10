import { ChainNames, TokenNames } from "./blockchain";

export type NumString = number | string;

export type CurrentChain = {
    name: string,
    isTestnet: boolean,
    chainId?: NumString
}

export interface IDropDownItem {
    // Only for chains
    chainId?: NumString
    // Chain or Token logo link
    imageLink: string,
    // Chain or Token name
    name: string
}

export interface IDropDownProps extends IDropDownItem {
    label: string
    items?: IDropDownItem[]
    type:DropdownType
}

export interface IParentCoords {
    bottom: number,
    height: number,
    left: number,
    right: number,
    top: number,
    width: number,
    x: number,
    y: number
}

export type EthAccount = {
    ethereum:any,
    account:any
}

export enum DropdownType {
    fromChain="from-chain",
    toChain="to-chain",
    fromTokens="from-tokens",
    toTokens="to-tokens"
}

export type TCookie = {
    key:string,
    value:string,
    days?:number,
    hours?:number,
    minutes?:number,
    seconds?:number
}