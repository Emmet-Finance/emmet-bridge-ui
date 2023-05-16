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

const Header = () => {

    // Setup
    const dispatch = useDispatch<AppDispatch>();
    const state = useAppSelector((state:any) => state.metamask);
    // const provider = getEvmProvider(window);
    const ethereum = (window as any ).ethereum;
    const {
        account, 
        // accounts, 
        // balance, 
        chainId, 
        hasMetamask, 
        isConnected,
        isTestnet,
        name,
        pending,
        error
    } = state;

    useEffect(() => {
        dispatch(isMetamaskAvailabile(ethereum))
    }, [dispatch, ethereum]);

    // console.log("hasMetamask:", hasMetamask);
    // console.log("isConnected:", isConnected)
    // console.log("chainId:", chainId.toString());
    // console.log("Account:", account);
    // console.log("Pending", pending);
    // if(error) console.error("Error:", error);

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
                    ? (<button className='wallet-button' onClick={copyAddressToClipboard}>
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