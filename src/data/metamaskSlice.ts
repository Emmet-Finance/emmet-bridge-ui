import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chainIdToChainName } from '../utils/ui.ts'
import { EthAccount } from '../types/ui.ts';
import { ethers } from 'ethers';

/**
 * Checks whether Metamask is installed
 * 
 * const { ethereum } = window;
 * @param ethereum: Window & globalThis
 * @returns `true` if available | `false` otherwise
 */
export const isMetamaskAvailabile = createAsyncThunk('is-metamas-available', async (ethereum: any) => {
    if (!ethereum) {
        return false;
    } else {
        return true;
    }
}) ;

/**
 * Gets the current chain ID in hex
 * 
 * const { ethereum } = window;
 * @param ethereum: Window & globalThis
 * @returns The current chain ID in hex
 */
export const getCurrentChainId = createAsyncThunk('get-current-chain-id', async (ethereum: any) => {
    return await ethereum.request({ method: 'eth_chainId' });
});

/**
 * Retrievs EVM accounts from Metamask
 * @param ethereum : Window & globalThis
 * @returns a list of evem accounts
 */
export const getEvmAccounts = createAsyncThunk('get-metamask-accounts', async (ethereum: any): Promise<any> => {
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
    });
    const balance = await ethereum.request({
        method:'eth_getBalance', params: [accounts[0], 'latest']
    })
    return {accounts, balance};
});

export const metamaskSlice = createSlice({
    name: "metamask",
    initialState:{
        account: '', 
        accounts: [], 
        balance: undefined, 
        chainId: 0,
        error: '', 
        hasMetamask: false,
        isConnected: false,
        isTestnet:false,
        name: '',
        pending: false,
    },
    reducers: {
        setIsConnected:(state:any, action) => {
            state.isConnected = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        // METAMASK AVAILABILITY
        .addCase(isMetamaskAvailabile.fulfilled, (state:any, action) => {
            state.hasMetamask = action.payload
            state.error = ''
            state.pending = false
        })
        .addCase(isMetamaskAvailabile.rejected, (state:any) => {
            state.hasMetamask = false
            state.error = 'Query for Metamask rejected'
            state.pending = false
        })
        // CHAIN ID INJECTION
        .addCase(getCurrentChainId.fulfilled,  (state:any, action) => {
            state.chainId = action.payload
            state.error = ''
            state.pending = false
            const {name, isTestnet} = chainIdToChainName(state.chainId.toString())
            state.name = name
            state.isTestnet = isTestnet
            state.isConnected = true
        })
        .addCase(getCurrentChainId.pending,  (state:any) => {
            state.chainId = 0
            state.error = ''
            state.pending = true
        })
        .addCase(getCurrentChainId.rejected,  (state:any) => {
            state.chainId = 0
            state.error = 'Query for Metamask chainId rejected'
            state.pending = false
        })
        // ACCOUNTS
        .addCase(getEvmAccounts.fulfilled, (state:any, action) => {
            state.accounts = action.payload.accounts;
            state.account = action.payload.accounts[0];
            state.balance = ethers.utils.formatEther(action.payload.balance);
            state.error = '';
            state.pending = false;
        })
        .addCase(getEvmAccounts.pending, (state:any) => {
            state.error = '';
            state.pending = true;
        })
        .addCase(getEvmAccounts.rejected, (state:any) => {
            state.error = 'Query for Metamask accounts - rejected';
            state.pending = false;
        })
    }
});

export const {setIsConnected} = metamaskSlice.actions;