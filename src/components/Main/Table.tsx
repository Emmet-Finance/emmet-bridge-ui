import React from 'react';
import './Table.css';
import Dropdown from '../Dropdown/Dropdown';
import { IDropDownItem } from '../../types/ui.ts';
// const mainnetChains = require("../../data/mainnetChains.json");
import { useDispatch } from 'react-redux';
import {
    AppDispatch,
    useAppSelector,
} from '../../data/store.ts'
import { roundTwoDigits } from '../../utils/ui.ts';
const blockchains = require("../../data/chains.json");
const tokens = require("../../data/tokens.json");
const testnetChains = require("../../data/testnetChains.json");

export default function BridgeForm() {

    // Setup
    const dispatch = useDispatch<AppDispatch>();
    const state = useAppSelector((state: any) => state.metamask);
    // const provider = getEvmProvider(window);
    const ethereum = (window as any).ethereum;
    const {
        account,
        balance,
        chainId,
        hasMetamask,
        isConnected,
        isTestnet,
        name,
        pending,
        error
    } = state;

    console.log("Table state:", state)

    let chains: IDropDownItem[];

    chains = testnetChains as IDropDownItem[];

    return (
        <form className='central-frame'>
            {/* =================================================== */}
            <div className='internal-frame'>
                From
                <div className='green-frame'>
                    <Dropdown
                        label="Token"
                        name="USDT"
                        imageLink="/crypto/usdt.svg"
                        items={tokens}
                    />
                    <div className='internal-divider'></div>
                    <Dropdown
                        label="Chain of Origin"
                        name="Goerly"
                        imageLink="/crypto/ethereum.svg"
                        items={chains}
                    />
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame align-center'>
                <img src="./crypto/swap.svg" alt="Swap" width="40px" />
            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                To
                <div className='green-frame'>
                    <Dropdown
                        label="Token"
                        name="USDT"
                        imageLink="/crypto/usdt.svg"
                        items={tokens}
                    />
                    <div className='internal-divider'></div>
                    <Dropdown
                        label="Destination chain"
                        name="Binance"
                        imageLink="/crypto/bnb.svg"
                        items={chains}
                    />
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                Amount
                <div className='green-frame justify-sides'>
                    <div>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className='amount-input'
                            placeholder='Transfer amount...'
                        />
                    </div>
                    <button className='max-button'>MAX</button>
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                Balance: {balance
                    && name
                    && blockchains
                    && roundTwoDigits(balance) + " " + blockchains[name.toLowerCase()].nativeCurrency.symbol}
            </div>
            {/* =================================================== */}
        </form>
    )
}