import { useDispatch } from 'react-redux';
import { 
    isMetamaskAvailabile, 
    getCurrentChainId, 
    getEvmAccounts,
} from '../../data/metamaskSlice.ts';
import { 
    AppDispatch, 
    useAppSelector,
} from '../../data/store.ts'
import './Header.css';
import React, { useEffect } from 'react';
// import { getEvmProvider } from '../../utils/read.ts';
import { copyAddressToClipboard} from '../../utils/metamask.ts';
import { setFromChain } from '../../data/bridgeSlice.ts';
import { chainIdToChainName } from '../../utils/ui.ts';
import { hasCookies } from '../../utils/cookies.ts';

const Header = () => {

    // Setup
    const dispatch = useDispatch<AppDispatch>();
    const state = useAppSelector((state:any) => state.metamask);
    const ethereum = (window as any ).ethereum;
    const {
        account, 
        chainId, 
        hasMetamask, 
        isConnected,
        isTestnet,
        name,
    } = state;

    useEffect(() => {
        dispatch(isMetamaskAvailabile(ethereum))
    }, [dispatch, ethereum]);

    const connectWallet = async () => {
        try {
            if (hasMetamask) {
                dispatch(getEvmAccounts(ethereum));
                dispatch(getCurrentChainId(ethereum));
                dispatch(getEvmAccounts(ethereum));
            }

        } catch (error) {
            console.error(error)
        }
    }

    window.addEventListener("load", (event) => {
        connectWallet()
    });

    return (
        <header className='justify-content-between'>
            <img className='emmet-logo' src="Frame-18.png" alt="Emmet Logo" />
            {isConnected && isTestnet
                ? (<span className='testnet-label'>
                    Testnet
                </span>)
                : ''}

            <span className='chain-name'>
                {isConnected && chainId
                    ? (<span >Connected to {name}</span>)
                    : "Not connected"
                }
            </span>
            {hasMetamask
                ? (isConnected
                    ? (<button className='wallet-button' onClick={() => copyAddressToClipboard(account)}>
                        <p>
                            {account.slice(0, 4)}...
                            {account.slice(38, 42)}
                        </p>
                        <img src="/crypto/copy-white.png" alt="Copy" className='copy-address' />
                    </button>)
                    : (<button className='wallet-button' onClick={connectWallet}>
                        <span className='button-text'>
                            Connect
                        </span>
                        <img src="/crypto/eth-wallet-dark.png" alt="" width="30px" className='button-image' />
                    </button>))
                : (<a href="https://metamask.io/download/">
                    <button className='wallet-button'>
                        Install Metamask!
                    </button>
                </a>)}
        </header>
    )
}

export default Header;