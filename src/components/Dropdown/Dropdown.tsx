import './Dropdown.css';
import { useRef, useEffect, useState } from 'react';
import { IDropDownItem, IDropDownProps, IParentCoords } from '../../types/ui.ts'
import DropdownList from './DropdownList.tsx'

const Dropdown = (props: IDropDownProps) => {

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

    useEffect(() => {
        if (dropdownRef.current) {
            const rect: IParentCoords = dropdownRef.current.getBoundingClientRect();
            setDropdownCoordinates(rect);
        }
    }, []);

    const onDropboxClick = (event: any) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <div className='internal-box' ref={dropdownRef}>
            {props.label}
            <div className='dropdown-box' onClick={(e) => onDropboxClick(e)}>
                <img src={props.imageLink} alt={props.name} className='dropdown-image' />
                <div className='dropdown-text'>
                    {props.name}
                </div>
                <div className='dropdown-caret-down'>
                    <i className="fa fa-caret-down"></i>
                </div>
                <DropdownList
                    items={props.items as IDropDownItem[]}
                    visible={isOpen}
                    parentCoords={dropdownCoordinates}
                />
            </div>
        </div>

    )

}

export default Dropdown;