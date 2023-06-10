import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { metamask } from '../utils/metamask.ts'
import { addCookie } from '../utils/cookies.ts';
import { ChainIdToName, TestnetNames, ChainLogos } from './consts.ts';
import { includesNonString } from '../utils/ui.ts';
import { TransferERC20, approveERC20 } from '../utils/write.ts';
import { ApproveParams, SendParams} from '../types/blockchain.ts';

/**
 * Checks whether Metamask is installed
 * @returns `true` if available | `false` otherwise
 */
export const isMetamaskAvailabile = createAsyncThunk('is-metamas-available', async () => {
    if (!metamask) {
        return false;
    } else {
        return true;
    }
});

/**
 * Gets the current chain ID in hex
 * @returns The current chain ID in hex
 */
export const getCurrentChainId = createAsyncThunk('get-current-chain-id', async () => {
    return await metamask.request({ method: 'eth_chainId' });
});

/**
 * Retrievs EVM accounts from Metamask
 * @returns a list of evem accounts
 */
export const getEvmAccounts = createAsyncThunk('get-metamask-accounts', async (): Promise<any> => {
    const accounts = await metamask.request({
        method: 'eth_requestAccounts',
    });
    const balance = await metamask.request({
        method: 'eth_getBalance', params: [accounts[0], 'latest']
    });

    return { accounts, balance };
});

export const approveTokenAmount = createAsyncThunk('approve-token-amount', async (
    params: ApproveParams
): Promise<any> => {
    const { hash, status, amount } = await approveERC20(
        params.chainName,
        params.value,
        params.token
    );

    return { hash, status, amount };
});

export const sendInstallment = createAsyncThunk('send-installment', async (params: SendParams) => {

    const { hash, status } = await TransferERC20(
        params.chainName,
        params.amount,
        params.chainId,
        params.tokenSymbol,
        params.destinationAddress
    );

    return { hash, status };
});


export const metamaskSlice = createSlice({
    name: "metamask",
    initialState: {
        account: '',
        accounts: [],
        approvedAmt: 0,
        approvedHash: '',
        approveSuccess: false,
        balance: undefined,
        chainId: 0,
        error: '',
        hasMetamask: false,
        isConnected: false,
        isTestnet: false,
        pending: false,
        transferHash: '',
        transferSuccess: false,
    },
    reducers: {
        setIsConnected: (state: any, action) => {
            state.isConnected = action.payload;
        },
        clearState: (state: any) => {
            state.approvedAmt = 0;
            state.approvedHash = '';
            state.transferHash = '';
            state.transferSuccess = false;
            state.error = '';
            state.pending = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // METAMASK AVAILABILITY
            .addCase(isMetamaskAvailabile.fulfilled, (state: any, action) => {
                state.hasMetamask = action.payload
                state.error = ''
                state.pending = false
            })
            .addCase(isMetamaskAvailabile.pending, (state: any) => {
                state.hasMetamask = false
                state.error = ''
                state.pending = true
            })
            .addCase(isMetamaskAvailabile.rejected, (state: any) => {
                state.hasMetamask = false
                state.error = 'Query for Metamask rejected'
                state.pending = false
            })
            // CHAIN ID INJECTION
            .addCase(getCurrentChainId.fulfilled, (state: any, action) => {
                state.chainId = action.payload
                //@ts-ignore
                const chainName: string = ChainIdToName[state.chainId.toString()]
                state.fromChain = chainName;
                //@ts-ignore
                state.fromChainLogo = ChainLogos[chainName];
                state.isTestnet = includesNonString(TestnetNames, chainName);
                state.isConnected = true
                state.error = ''
                state.pending = false
                addCookie({ key: "fromChain", value: chainName, ...state.cookieExpires });
            })
            .addCase(getCurrentChainId.pending, (state: any) => {
                state.chainId = 0
                state.error = ''
                state.pending = true
            })
            .addCase(getCurrentChainId.rejected, (state: any) => {
                state.chainId = 0
                state.error = 'Query for Metamask chainId rejected'
                state.pending = false
            })
            // ACCOUNTS
            .addCase(getEvmAccounts.fulfilled, (state: any, action) => {
                state.accounts = action.payload.accounts;
                state.account = action.payload.accounts[0];
                state.balance = ethers.utils.formatEther(action.payload.balance);
                state.error = '';
                state.pending = false;
            })
            .addCase(getEvmAccounts.pending, (state: any) => {
                state.error = '';
                state.pending = true;
            })
            .addCase(getEvmAccounts.rejected, (state: any) => {
                state.error = 'Query for Metamask accounts - rejected';
                state.pending = false;
            })
            // Approve
            .addCase(approveTokenAmount.fulfilled, (state: any, action) => {
                const { hash, status, amount } = action.payload;
                if (status === 1) {
                    state.approvedAmt = amount;
                    state.approvedHash = hash;
                    state.approveSuccess = true;
                    state.error = '';
                    state.pending = false;
                } else {
                    state.approvedAmt = 0;
                    state.approvedHash = ''
                    state.approveSuccess = false;
                    state.error = '';
                    state.pending = false;
                }
            })
            .addCase(approveTokenAmount.pending, (state: any) => {
                state.approvedAmt = 0;
                state.approvedHash = '';
                state.approveSuccess = false;
                state.error = '';
                state.pending = true;
            })
            .addCase(approveTokenAmount.rejected, (state: any) => {
                state.approvedAmt = 0;
                state.approvedHash = '';
                state.approveSuccess = false;
                state.error = 'Approve transaction - rejected';
                state.pending = false;
            })
            // Transfer
            .addCase(sendInstallment.fulfilled, (state: any, action) => {
                const { hash, status } = action.payload;
                if (status === 1) {
                    state.transferHash = hash;
                    state.transferSuccess = true
                    state.error = '';
                    state.pending = false;
                } else {
                    state.transferHash = '';
                    state.transferSuccess = false
                    state.error = '';
                    state.pending = false;
                }
            })
            .addCase(sendInstallment.pending, (state: any) => {
                state.transferHash = '';
                state.error = '';
                state.pending = true;
            })
            .addCase(sendInstallment.rejected, (state: any) => {
                state.transferHash = '';
                state.error = 'Send Installment - rejected';
                state.pending = false;
            })
    }
});

export const {
    setIsConnected,
    clearState
} = metamaskSlice.actions;