import { createSlice } from "@reduxjs/toolkit";
import { chainNameToLogo, tokenNameToLogo } from "../utils/ui.ts";

export const bridgeSlice = createSlice({
    name:"bridge",
    initialState:{
        fromChain:'Select',
        fromChainLogo:'',
        toChain:'Select',
        toChainLogo:'',
        fromTokens:'Select',
        fromTokensLogo:'',
        toTokens:'Select',
        toTokensLogo:''
    },
    reducers:{
        setFromChain:(state:any, action) => {
            state.fromChain = action.payload;
            state.fromChainLogo = chainNameToLogo(action.payload);
        },
        setToChain:(state:any, action) => {
            state.toChain = action.payload;
            state.toChainLogo = chainNameToLogo(action.payload);
        },
        setFromTokens:(state:any, action) => {
            state.fromTokens = action.payload;
            state.fromTokensLogo = tokenNameToLogo(action.payload);
        },
        setToTokens:(state:any, action) => {
            state.toTokens = action.payload;
            state.toTokensLogo = tokenNameToLogo(action.payload);
        },
    }
});

export const {
    setFromChain, 
    setToChain,
    setFromTokens,
    setToTokens
} = bridgeSlice.actions;