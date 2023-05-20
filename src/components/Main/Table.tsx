import React from 'react';
import './Table.css';
import Dropdown from '../Dropdown/Dropdown';
import { DropdownType, IDropDownItem } from '../../types/ui.ts';
import { AppDispatch, useAppSelector } from '../../data/store.ts'
import { roundTwoDigits } from '../../utils/ui.ts';
import { useDispatch } from 'react-redux';
import { changeMetamaskAccount, setFromChain, setToChain } from '../../data/bridgeSlice.ts';
import { TChangeMMChain } from '../../types/blockchain.ts';
import { CHAINS, SupportedTokens } from '../../data/consts.ts';
const testnetChains = require("../../data/testnetChains.json");

export default function BridgeForm() {

    const dispatch = useDispatch();
    const asyncDispatch = useDispatch<AppDispatch>();

    const metamaskState = useAppSelector((state: any) => state.metamask);
    const bridgeState = useAppSelector((state: any) => state.bridge);
    const {balance} = metamaskState;
    const { fromChain, toChain, fromTokens, tokenBalance } = bridgeState;

    let chains: IDropDownItem[];

    chains = testnetChains as IDropDownItem[];

    const swapToFromChains = () => {

        dispatch(setToChain(fromChain))
        dispatch(setFromChain(toChain))
        const mmAccount: TChangeMMChain = {
            ethereum: (window as any).ethereum,
            newChain: CHAINS[toChain.toLowerCase()]
        }
        asyncDispatch(changeMetamaskAccount(mmAccount))
    }

    return (
        <form className='central-frame'>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label'>From</span>
                <div className='green-frame'>
                    <Dropdown
                        label="Token"
                        name="USDT"
                        imageLink="/crypto/usdt.svg"
                        items={SupportedTokens}
                        type={DropdownType.fromTokens}
                    />
                    <div className='internal-divider'></div>
                    <Dropdown
                        label="Chain of Origin"
                        name="Goerly"
                        imageLink="/crypto/ethereum.svg"
                        items={chains}
                        type={DropdownType.fromChain}
                    />
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame align-center'>
                <img
                    src="./crypto/swap.svg"
                    alt="Swap"
                    width="40px"
                    className='swap-image'
                    onClick={swapToFromChains}
                />
            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label'>To</span>
                <div className='green-frame'>
                    <Dropdown
                        label="Token"
                        name="USDT"
                        imageLink="/crypto/usdt.svg"
                        items={SupportedTokens}
                        type={DropdownType.toTokens}
                    />
                    <div className='internal-divider'></div>
                    <Dropdown
                        label="Destination chain"
                        name="Binance"
                        imageLink="/crypto/bnb.svg"
                        items={chains}
                        type={DropdownType.toChain}
                    />
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label'>Amount</span>
                <div className='amount-green-box justify-sides'>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        className='amount-input'
                        placeholder='Transfer amount...'
                    />
                    <button className='max-button'>MAX</button>
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label'>Balance: </span>
                {balance
                    && fromChain
                    && CHAINS
                    && roundTwoDigits(balance, 2) + " " + CHAINS[fromChain.toLowerCase()].nativeCurrency.symbol}
            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label'>Available: </span>
                {balance
                    && fromTokens
                    && tokenBalance
                    && roundTwoDigits(tokenBalance, 2) + " " + fromTokens}
            </div>
            {/* =================================================== */}
        </form>
    )
}