import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Navbar/Header.tsx'
import Main from '../Main/Main.tsx'
import Footer from '../Footer/Footer.tsx'
import {
  setDestinationAccount,
  setFromChain,
  setFromTokens,
  setToChain,
  setToTokens,
  setTransferAmount
} from '../../data/bridgeSlice.ts';
import { metamask } from '../../utils/metamask.ts';
import { hasCookies, readCookieByKey } from '../../utils/cookies.ts';
import { useAppSelector } from '../../data/store.ts';


export default function App() {

  const dispatch = useDispatch();
  const metamaskState = useAppSelector((state: any) => state.metamask);

  const onWindowReload = () => {
    if (hasCookies()) {
      // FROM CHAIN
      const fromChain = readCookieByKey('fromChain');
      dispatch(setFromChain(fromChain))
      // TO CHAIN
      const toChain = readCookieByKey('toChain');
      dispatch(setToChain(toChain))
      // FROM TOKENS
      const fromTokens = readCookieByKey('fromTokens');
      dispatch(setFromTokens(fromTokens))
      // TO TOKENS
      const toTokens = readCookieByKey('toTokens');
      dispatch(setToTokens(toTokens))
      // TO ADDRESS
      const toAddress = readCookieByKey("toAddress");
      dispatch(setDestinationAccount(toAddress));
      // AMOUNT
      const amount = readCookieByKey("transferAmount");
      dispatch(setTransferAmount(amount));
    }
  }

  useEffect(() => {

    return () => {
      window.removeEventListener("load", () => {
        onWindowReload()
      })
    }

  }, [])

  window.addEventListener("load", () => {
    onWindowReload()
  });

  if(metamask){
    metamask.on('chainChanged', () => {
      onWindowReload()
      window.location.reload();
    });
  }

  if (metamaskState && metamaskState.error) {
    console.error(metamaskState.error)
  }

  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
