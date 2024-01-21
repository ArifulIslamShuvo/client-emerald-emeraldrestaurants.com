import DeleteIcon from '../../../../Assets/icons/delete.svg'

import './OrderItem.css'
import { takaFormatter } from '../../../../../Utilities/Formatter'
import Counter from '../../../Counter/Counter'
import { useContext } from 'react'
import AppContext from '../../../../../Context/AppContext'

function OrderItem({ imgSrc, imgAlt, itemName, quantity, itemPrice, total, itemID }) {

    const { handleRemove } = useContext(AppContext)

    return (
        <div className="order_item grid_container">
            <div className='thumb'>
                <img src={imgSrc} alt={imgAlt} />
            </div>
            <div>
                <h6 className='bold'>{itemName}</h6>
            </div>
            <div>
                {/* <Quantity 
                    quantity={quantity}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                /> */}
                <Counter
                    id={itemID}
                />
            </div>
            <div>
                <h5>{takaFormatter(itemPrice)}</h5>
            </div>
            <div>
                <h5>{takaFormatter(total)}</h5>
            </div>
            <div>
                <button type='button' className='delete' onClick={()=>handleRemove(itemID)}>  <img src={DeleteIcon} alt="icon" /></button>
            </div>
        </div>
    )
}

export default OrderItem