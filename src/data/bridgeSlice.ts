import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCookie, chainNameToLogo, tokenNameToLogo } from "../utils/ui.ts";
import { TChangeMMChain } from '../types/blockchain.ts';

/**
 * Switches Metamask to another chain
 * @param params \{ethereum,newChain{chainId,chainName,nativeCurrency, rpcUrls}}
 * @returns params.newChain
 */
export const changeMetamaskAccount = createAsyncThunk('change-metamask-account', async (params:TChangeMMChain):Promise<any> => {
    if(params.ethereum.networkVersion !== params.newChain.chainId){
        try {
            // Try switching to another chain
            await params.ethereum.request({
                method:'wallet_switchEthereumChain',
                params:[{chainId:params.newChain.chainId}]
            })
        } catch (err:any) {
            // If chain not added
            if(err.code === 4902){
                // Add new chain to metamask:
                await params.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params:[params.newChain]
                })
            }
            
        }
        return params.newChain
    }
});

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
        toTokensLogo:'',
        cookieExpires:{days:0,hours:1,minutes:0,seconds:0}
    },
    reducers:{
        setFromChain:(state:any, action) => {
            state.fromChain = action.payload;
            state.fromChainLogo = chainNameToLogo(action.payload);
            addCookie({key:"fromChain", value:state.fromChain, ...state.cookieExpires});
        },
        setToChain:(state:any, action) => {
            state.toChain = action.payload;
            state.toChainLogo = chainNameToLogo(action.payload);
            addCookie({key:"toChain", value:state.toChain, ...state.cookieExpires});
        },
        setFromTokens:(state:any, action) => {
            state.fromTokens = action.payload;
            state.fromTokensLogo = tokenNameToLogo(action.payload);
            addCookie({key:"fromTokens", value:state.fromTokens, ...state.cookieExpires});
        },
        setToTokens:(state:any, action) => {
            state.toTokens = action.payload;
            state.toTokensLogo = tokenNameToLogo(action.payload);
            addCookie({key:"toTokens", value:state.toTokens, ...state.cookieExpires});
        },
    },
    extraReducers: (builder) => {
        builder
        // Switch Metamask Network
        .addCase(changeMetamaskAccount.fulfilled, (state:any, action) => {
            state.fromChain = action.payload.chainName;
            state.fromChainLogo = chainNameToLogo(action.payload.chainName);
            state.error = '';
            state.pending = false;
        })
        .addCase(changeMetamaskAccount.pending, (state:any) => {
            state.error = '';
            state.pending = true;
        })
        .addCase(changeMetamaskAccount.rejected, (state:any) => {
            state.error = 'Change Metamask Network - rejected';
            state.pending = false;
        })
    }
});

export const {
    setFromChain, 
    setToChain,
    setFromTokens,
    setToTokens
} = bridgeSlice.actions;