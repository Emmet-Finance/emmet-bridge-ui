import { useDispatch } from 'react-redux';
import './Table.css';
import Dropdown from '../Dropdown/Dropdown';
import { DropdownType, IDropDownItem } from '../../types/ui.ts';
import { AppDispatch, useAppSelector } from '../../data/store.ts'
import { isValidEvmAddress, roundTwoDigits } from '../../utils/ui.ts';
import { changeMetamaskAccount, setDestinationAccount, setFromChain, setToChain, setTransferAmount } from '../../data/bridgeSlice.ts';
import { SendParams, TChangeMMChain } from '../../types/blockchain.ts';
import { CHAINS, ChainIndices, SupportedTokens } from '../../data/consts.ts';
import { ChangeEvent, useState } from 'react';
import { approveTokenAmount, sendInstallment } from '../../data/metamaskSlice.ts';
const testnetChains = require("../../data/testnetChains.json");

export default function BridgeForm() {

    const dispatch = useDispatch();
    const asyncDispatch = useDispatch<AppDispatch>();

    const metamaskState = useAppSelector((state: any) => state.metamask);
    const bridgeState = useAppSelector((state: any) => state.bridge);
    const { balance, account, approvedAmt } = metamaskState;
    const { fromChain, toChain, fromTokens, tokenBalance, tokenAllowance } = bridgeState;

    const [addressValue, setAddressValue] = useState(bridgeState.destinationAddress);
    const [amountValue, setAmountValue] = useState(bridgeState.transferAmount);

    let chains: IDropDownItem[];

    chains = testnetChains as IDropDownItem[];

    const swapToFromChains = () => {

        dispatch(setToChain(fromChain))
        dispatch(setFromChain(toChain))
        const mmAccount: TChangeMMChain = {
            ethereum: (window as any).ethereum,
            newChain: CHAINS[toChain.toLowerCase()]
        }
        asyncDispatch(changeMetamaskAccount(mmAccount));
    }

    const handleDestAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const pattern = /^[0x]{0,2}[0-9a-fA-F]{0,40}$/;

        if (pattern.test(inputValue)) {
            // Allow the input to have such chars
            setAddressValue(inputValue);
            if (isValidEvmAddress(inputValue)) {
                // Update store
                dispatch(setDestinationAccount(inputValue));
            }
        }
    }

    const handleAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const _amount: number = parseFloat(event.target.value);
        if (tokenBalance && _amount <= tokenBalance) {
            setAmountValue(_amount)
            dispatch(setTransferAmount(_amount))
        }
    }

    const handleMaxClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (tokenBalance) {
            setAmountValue(tokenBalance)
            dispatch(setTransferAmount(tokenBalance))
        }
    }

    const onSelfAddressClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setAddressValue(account);
    }

    const onApproveClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        // Approve
        asyncDispatch(approveTokenAmount({
            chainName: fromChain,
            value: amountValue,
            token: fromTokens
        }))

    }

    const onTransferClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        // Transfer
        asyncDispatch(sendInstallment({
            chainName: fromChain,
            amount: amountValue,
            // @ts-ignore
            chainId: ChainIndices[toChain],
            tokenSymbol: fromTokens,
            destinationAddress: addressValue
        } as SendParams))

    }

    return (
        <div className='central-frame'>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label'>1. Origin</span>
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
            <div className='internal-frame minus-top-margin'>
                <div className='invisible-frame'>
                    <span className='balance-wrapper'>
                        <div>Balance:</div>
                        <span className=''>
                            {tokenBalance
                                && fromTokens
                                && fromTokens + ": " + roundTwoDigits(tokenBalance, 2)}
                        </span>
                    </span>
                    <img
                        src="./crypto/swap.svg"
                        alt="Swap"
                        width="40px"
                        className='swap-image'
                        onClick={swapToFromChains}
                    />
                    <span className='balance-wrapper align-end'>
                        <div>Balance:</div>
                        <span className=''>
                            {balance
                                && fromChain
                                && CHAINS
                                && CHAINS[fromChain.toLowerCase()]
                                && CHAINS[fromChain.toLowerCase()].nativeCurrency.symbol + ": " + roundTwoDigits(balance, 2)}
                        </span>
                    </span>

                </div>
            </div>

            {/* =================================================== */}
            <div className='internal-frame align-center'>

            </div>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label'>2. Destination</span>
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
            <div className='vertical-push'></div>
            {/* =================================================== */}
            <div className='internal-frame'>
                <span className='group-label margin-right'>3. Amount to transfer</span>
                <span className='group-label'>4. Target Address</span>
                <div className='green-frame'>
                    <span className='no-margin'>
                        <input
                            type="number"
                            value={amountValue ? amountValue : ""}
                            name="amount"
                            id="amount"
                            className='amount-input'
                            placeholder='Amount...'
                            onChange={(e) => handleAmountInputChange(e)}
                        />
                        <button
                            className='max-button'
                            onClick={(e) => handleMaxClick(e)}
                        >MAX
                        </button>
                    </span>
                    <div className='internal-divider'></div>
                    <span className='no-margin'>
                        <input
                            type="text"
                            value={addressValue}
                            name="destination"
                            id="destination"
                            className='destination-address'
                            placeholder='Target address...'
                            onChange={(e) => handleDestAddressChange(e)}
                        />
                        <button
                            className='max-button'
                            onClick={(e) => onSelfAddressClickHandler(e)}
                        >SELF
                        </button>
                    </span>
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame minus-top-margin'>
                <div className='invisible-frame'>
                    <span className='balance-wrapper'>
                        {approvedAmt && fromTokens
                            ? (<div>
                                <div>Approved:</div>
                                <span>
                                    {fromTokens + ": " + roundTwoDigits(approvedAmt, 2)}
                                </span>
                            </div>)
                            : tokenAllowance && fromTokens
                                ? (<div>
                                    <div>Allowance:</div>
                                    <span>
                                        {fromTokens + ": " + roundTwoDigits(tokenAllowance, 2)}
                                    </span>
                                </div>)
                                : ''}

                    </span>
                </div>
            </div>
            {/* =================================================== */}
            <div className='internal-frame justify-sides'>
                <div className='invisible-frame'>
                    <button
                        className='action-button'
                        disabled={
                            amountValue === 0
                            || approvedAmt >= amountValue
                            || tokenAllowance >= amountValue
                        }
                        onClick={(e) => onApproveClickHandler(e)}
                    >
                        5. Approve
                    </button>
                    <button
                        className='action-button'
                        disabled={
                            amountValue === 0
                            || ! toChain
                            || (
                                amountValue > approvedAmt
                                && tokenAllowance < amountValue)
                            || addressValue.length < 42
                        }
                        onClick={(e) => onTransferClickHandler(e)}
                    >
                        6. Transfer
                    </button>
                </div>
            </div>
            {/* =================================================== */}
        </div>
    )
}