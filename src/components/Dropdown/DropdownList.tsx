import './DropdownList.css'
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
    changeMetamaskAccount
} from '../../data/bridgeSlice.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../data/store.ts'
import { TChangeMMChain } from '../../types/blockchain.ts'
import { hasCookies, readCookieByKey } from '../../utils/ui.ts'
const chains = require('../../data/chains.json')

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

    useEffect(() => {
        setTop(props.parentCoords.bottom)
        setLeft(props.parentCoords.left)
        setWidth(props.parentCoords.width)

    }, [props.parentCoords]);

    const onListItemClick = (item: IDropDownItem) => {
        // Change the global state
        switch (props.type) {
            case DropdownType.fromChain:
                dispatch(setFromChain(item.name))
                const mmAccount: TChangeMMChain = {
                    ethereum:(window as any).ethereum,
                    newChain:chains[item.name.toLowerCase()]
                    }
                asyncDispatch(changeMetamaskAccount(mmAccount))
                break;
            case DropdownType.toChain:
                dispatch(setToChain(item.name))
                break;
            case DropdownType.fromTokens:
                dispatch(setFromTokens(item.name))
                break;
            case DropdownType.toTokens:
                dispatch(setToTokens(item.name))
                break;
            default:
                break;
        }
    }

    window.addEventListener("load", (event) => {
        if(hasCookies()){
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
        }
    });

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