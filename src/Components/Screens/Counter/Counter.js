import React, { useContext } from 'react'
import MinusIcon from '../../Assets/icons/minus-btn.svg'
import PlusIcon from '../../Assets/icons/plus-btn.svg'
import minus from '../../../Assets/images/icons/subtract.svg'
import AppContext from '../../../Context/AppContext'


function Counter({ id }) {

    const { cartItems, handleDecrease, handleIncrease } = useContext(AppContext)

    return (
        <div className="incrDecBtn in_de_btn">
            <button
                onClick={() => handleDecrease(id)}
            >
                {
                    cartItems?.find(i => i.item === id)?.quantity > 1
                        ?
                        <img src={minus} alt="icon" />
                        :
                        <img src={MinusIcon} alt="icon" />
                }
            </button>
            <span>
                {
                    cartItems?.find(i => i.item === id)?.quantity
                }
            </span>
            <button
                onClick={() => handleIncrease(id)}
            >
                <img src={PlusIcon} alt="icon" />
            </button>

        </div>
    )
}

export default Counter