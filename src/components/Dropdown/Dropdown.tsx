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
    const [name, setName] = useState('')
    const [imageLink, setImageLink] = useState('')

    const handleResize = () => {
        if (dropdownRef.current) {
            // Get the parent rectangular coordinates
            const rect: IParentCoords = dropdownRef.current.getBoundingClientRect();
            // Set the local state
            setDropdownCoordinates(rect);
        }
    }

    const handleUpdateComponent = () => {
        switch (props.type) {
            case DropdownType.fromChain:
                setName(state.fromChain)
                setImageLink(state.fromChainLogo)
                break;
            case DropdownType.toChain:
                setName(state.toChain)
                setImageLink(state.toChainLogo)
                break;
            case DropdownType.fromTokens:
                setName(state.fromTokens)
                setImageLink(state.fromTokensLogo)
                break;
            case DropdownType.toTokens:
                setName(state.toTokens)
                setImageLink(state.toTokensLogo)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        // Check whether chains or tokens changed
        handleUpdateComponent()
        console.log(state)

        // Check coordinates before first resize
        handleResize()

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Stop listening to avoid eternal loop
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [dropdownRef, state]);

    const onDropboxClick = (event: any) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <div
            className='internal-box'
            ref={dropdownRef}
        >
            <span className='internal-label'>
                {props.label}
            </span>
            
            <div
                className='dropdown-box'
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
                    items={props.items as IDropDownItem[]}
                    visible={isOpen}
                    parentCoords={dropdownCoordinates}
                    type={props.type}
                />
            </div>
        </div>
    )
}

export default Dropdown;