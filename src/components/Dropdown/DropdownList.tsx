import './DropdownList.css'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {
    DropdownType,
    IDropDownItem,
    IParentCoords
} from '../../types/ui.ts'
import {
    setFromChain,
    setToChain,
    setFromTokens,
    setToTokens,
    changeMetamaskAccount,
    getTokenBalance,
} from '../../data/bridgeSlice.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../data/store.ts'
import { TChangeMMChain } from '../../types/blockchain.ts'
import { CHAINS, SupportedTokens } from '../../data/consts.ts'

const DropdownList = (props: {
    items: IDropDownItem[],
    visible: boolean,
    parentCoords: IParentCoords
    type: DropdownType
}) => {

    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);

    const dispatch = useDispatch();
    const asyncDispatch = useDispatch<AppDispatch>();
    const bridgeState = useAppSelector((state: any) => state.bridge);
    const metamaskState = useAppSelector((state: any) => state.metamask);

    useEffect(() => {
        setTop(props.parentCoords.bottom)
        setLeft(props.parentCoords.left)
        setWidth(props.parentCoords.width - 20)

    }, [props.parentCoords]);

    const _getTokenBalance = (tokenName: string) => {

        const token = SupportedTokens.filter((t: any) => t.name === tokenName)[0];

        const fromChain: string = bridgeState.fromChain
            ? bridgeState.fromChain
            : '';
        
        const rpcs = CHAINS[fromChain.toLowerCase()].rpcUrls
            ? CHAINS[fromChain.toLowerCase()].rpcUrls
            : '';
        
            const abi = fromChain && fromChain === token.nativeChain
            ? token.nativeABI
            : token.wrappedABI;

        asyncDispatch(getTokenBalance({
            account: metamaskState.account,
            // @ts-ignore
            contractAddress: token.contractAddresses[fromChain],
            abi,
            provider: new ethers.providers.JsonRpcProvider(rpcs[0]),
            decimals: token.decimals,
            bridge: CHAINS[fromChain.toLowerCase()].bridge
        }))
    }

    const onListItemClick = (item: IDropDownItem) => {
        // Change the global state
        switch (props.type) {
            case DropdownType.fromChain:
                dispatch(setFromChain(item.name))
                const mmAccount: TChangeMMChain = {
                    ethereum: (window as any).ethereum,
                    newChain: CHAINS[item.name.toLowerCase()]
                }
                asyncDispatch(changeMetamaskAccount(mmAccount))
                break;
            case DropdownType.toChain:
                dispatch(setToChain(item.name))
                break;
            case DropdownType.fromTokens:
                // Currently only support the same token
                dispatch(setFromTokens(item.name))
                dispatch(setToTokens(item.name))
                _getTokenBalance(item.name)
                break;
            case DropdownType.toTokens:
                // Currently only support the same token
                dispatch(setToTokens(item.name))
                dispatch(setFromTokens(item.name))
                _getTokenBalance(item.name)
                break;
            default:
                break;
        }
    }

    return (
        <div>
            {
                props.visible
                    ? (<ul
                        className='dropdown-wrapper'
                        style={{
                            top,
                            left,
                            width
                        }}
                    >
                        {props.items &&
                            props.items.map((item: IDropDownItem, index: number) => {

                                return (
                                    <li
                                        key={index}
                                        className='dropdown-element'
                                        onClick={() => onListItemClick(item)}
                                    >
                                        <img
                                            src={item.imageLink}
                                            alt={item.name}
                                            className='dropdown-image'
                                        />
                                        <span>{item.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>)
                    : ''
            }
        </div>
    )
}

export default DropdownList;