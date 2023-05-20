import { useDispatch } from 'react-redux';
import {
    getCurrentChainId,
    getEvmAccounts,
} from '../../data/metamaskSlice.ts';
import {
    AppDispatch,
    useAppSelector,
} from '../../data/store.ts'
import './Header.css';
import { copyAddressToClipboard, metamask } from '../../utils/metamask.ts';

const Header = () => {

    // Setup
    const dispatch = useDispatch<AppDispatch>();
    const state = useAppSelector((state: any) => state.metamask);
    const {
        account,
        isTestnet,
    } = state;

    const connectWallet = async () => {
        try {
            if (metamask) {
                dispatch(getEvmAccounts());
                dispatch(getCurrentChainId());
            }

        } catch (error) {
            console.error(error)
        }
    }

    window.addEventListener("load", (event) => {
        connectWallet();
    });

    metamask.on('chainChanged', () => {
        connectWallet();
        window.location.reload();
    });

    return (
        <header className='justify-content-between'>
            <img className='emmet-logo' src="Frame-18.png" alt="Emmet Logo" />
            {metamask && isTestnet
                ? (<span className='testnet-label'>
                    Testnet
                </span>)
                : ''}
            {metamask
                ? (metamask
                    ? (<button className='wallet-button' onClick={() => copyAddressToClipboard(account)}>
                        <p>
                            {account.slice(0, 5)}...
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