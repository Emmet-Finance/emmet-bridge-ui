import './DropdownList.css'
import React from 'react'
import { IDropDownItem, IParentCoords } from '../../types/ui.ts'

const DropdownList = (props: { items: IDropDownItem[], visible: boolean, parentCoords:IParentCoords }) => {

    const onListItemClick = (item: IDropDownItem) => {
        // Change the global state
        
        
    }

    return (
        <div>
            {
                props.visible
                    ? (<ul 
                    className='dropdown-wrapper'
                    style={{
                        top:props.parentCoords.bottom,
                        left:props.parentCoords.left,
                        width:props.parentCoords.width
                    }}
                    >
                        { props.items &&
                            props.items.map((item: IDropDownItem, index: number) => {
                                
                                return (
                                    <li key={index} className='dropdown-element' onClick={() => onListItemClick(item)}>
                                        <img src={item.imageLink} alt={item.name} className='dropdown-image' />
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