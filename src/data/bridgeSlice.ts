import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TChangeMMChain, TokenBalanceParams } from '../types/blockchain.ts';
import { addCookie } from '../utils/cookies.ts';
import { ChainLogos, TokenLogos } from './consts.ts';
import { ethers } from 'ethers';

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

export const getTokenBalance = createAsyncThunk('get-token-balance', async (params:TokenBalanceParams) => {
    const {account, contractAddress, abi, provider, decimals} = params;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const balance = await contract.balanceOf(account);
    console.log("balance", balance);
    
    return ethers.utils.formatUnits(balance, decimals);
})

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
        tokenBalance:0,
        cookieExpires:{days:0,hours:1,minutes:0,seconds:0}
    },
    reducers:{
        setFromChain:(state:any, action) => {
            state.fromChain = action.payload;
            //@ts-ignore
            state.fromChainLogo = ChainLogos[action.payload];
            addCookie({key:"fromChain", value:state.fromChain, ...state.cookieExpires});
        },
        setToChain:(state:any, action) => {
            state.toChain = action.payload;
            //@ts-ignore
            state.toChainLogo = ChainLogos[action.payload];
            addCookie({key:"toChain", value:state.toChain, ...state.cookieExpires});
        },
        setFromTokens:(state:any, action) => {
            state.fromTokens = action.payload;
            // @ts-ignore
            state.fromTokensLogo = TokenLogos[action.payload];
            addCookie({key:"fromTokens", value:state.fromTokens, ...state.cookieExpires});
        },
        setToTokens:(state:any, action) => {
            state.toTokens = action.payload;
            // @ts-ignore
            state.toTokensLogo = TokenLogos[action.payload];
            addCookie({key:"toTokens", value:state.toTokens, ...state.cookieExpires});
        },
    },
    extraReducers: (builder) => {
        builder
        // Switch Metamask Network
        .addCase(changeMetamaskAccount.fulfilled, (state:any, action) => {
            state.fromChain = action.payload.chainName;
            // @ts-ignore
            state.fromChainLogo = ChainLogos[action.payload.chainName];
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
        // Token Balance
        .addCase(getTokenBalance.fulfilled, (state:any, action) => {
            state.tokenBalance = action.payload;
            state.error = '';
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