import './Dropdown.css';
import { useRef, useEffect, useState } from 'react';
import { DropdownType, IDropDownItem, IDropDownProps, IParentCoords } from '../../types/ui.ts'
import DropdownList from './DropdownList.tsx'
import { useAppSelector } from '../../data/store.ts';

const Dropdown = (props: IDropDownProps) => {

    const state = useAppSelector((state: any) => state.bridge);
    const dropdownRef = useRef<HTMLDivElement & DOMRect | any>(null);
    const [dropdownCoordinates, setDropdownCoordinates] = useState({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0
    } as IParentCoords);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [listItems, setListItems] = useState([]);

    const handleResize = () => {
        if (dropdownRef.current) {
            // Get the parent rectangular coordinates
            const rect: IParentCoords = dropdownRef.current.getBoundingClientRect();
            // Set the local state
            setDropdownCoordinates(rect);
        }
    }

    /**
     * Removes a banned item from the list
     * @param filterItem the item to exclude
     * @param items the item list
     * @returns filtered item list
     */
    const filterOther = (filterItem: string, items: IDropDownItem[]) => {
        return items.filter(item => item.name !== filterItem)
    }

    useEffect(() => {

        const handleUpdateComponent = () => {
            switch (props.type) {
                case DropdownType.fromChain:
                    setName(state.fromChain)
                    setImageLink(state.fromChainLogo)
                    if(props.items){
                        //@ts-ignore
                        setListItems(filterOther(state.toChain, props.items))
                    }
                    
                    break;
                case DropdownType.toChain:
                    setName(state.toChain)
                    setImageLink(state.toChainLogo)
                    if(props.items){
                        //@ts-ignore
                        setListItems(filterOther(state.fromChain, props.items))
                    }
                    break;
                case DropdownType.fromTokens:
                    setName(state.fromTokens)
                    setImageLink(state.fromTokensLogo)
                    //@ts-ignore
                    setListItems(props.items)
                    break;
                case DropdownType.toTokens:
                    setName(state.toTokens)
                    setImageLink(state.toTokensLogo)
                    //@ts-ignore
                    setListItems(props.items)
                    break;
                default:
                    break;
            }
        }
        // Check whether chains or tokens changed
        handleUpdateComponent()

        // Check coordinates before first resize
        handleResize()

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Stop listening to avoid eternal loop
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [dropdownRef, state, props.type, props.items]);

    const onDropboxClick = (event: any) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <div
            className='internal-box'
        >
            <span className='internal-label'>
                {props.label}
            </span>

            <div
                className='dropdown-box'
                ref={dropdownRef}
                onClick={(e) => onDropboxClick(e)}
            >
                {imageLink && imageLink.length > 0
                    ? (<img
                        src={imageLink}
                        alt={name}
                        className='dropdown-image'
                    />)
                    : (<span className='image-placeholder'></span>)}
                <div className='dropdown-text'>
                    {name}
                </div>
                <div className='dropdown-caret-down'>
                    <i className="fa fa-caret-down"></i>
                </div>
                <DropdownList
                    items={listItems as IDropDownItem[]}
                    visible={isOpen}
                    parentCoords={dropdownCoordinates}
                    type={props.type}
                />
            </div>
        </div>
    )
}

export default Dropdown;