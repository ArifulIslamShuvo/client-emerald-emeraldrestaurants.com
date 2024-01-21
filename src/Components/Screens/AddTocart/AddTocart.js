import React, { useContext } from 'react'
import AppContext from '../../../Context/AppContext'
import { useSelector } from 'react-redux'

function AddTocart({ item }) {

    const { orderStatus, addToCart } = useContext(AppContext)
    const { customer } = useSelector(state => state.auth)

    return (
        <>
            {customer && (orderStatus === "processing" || orderStatus === "toBeDelivered" || orderStatus === "shipped")
            ?
                <h1 className="note" style={{margin: '0'}}>You currently have an ongoing order</h1> 
            :
                <button
                    className="cart-btn"
                    onClick={() => addToCart(item._id, item.price, item.name, item.restaurant)}
                >
                    Add to Cart
                </button>
            }
        </>
    )
}
 
export default AddTocart