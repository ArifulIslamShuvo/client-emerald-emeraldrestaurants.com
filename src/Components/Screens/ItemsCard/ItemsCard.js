import { useContext } from "react"
import AppContext from "../../../Context/AppContext"
import AddTocart from "../AddTocart/AddTocart"
import Counter from "../Counter/Counter"


function ItemsCard({ item, restaurantId }) {
    const { cartItems , restaurants } = useContext(AppContext)
    const restaurant = restaurants?.find(restaurant => restaurant._id === cartItems[0]?.restaurant)?.name

    return (
        <>
            {
                cartItems?.length === 0 && <AddTocart item={item} />
            }
            {
                cartItems?.length > 0 &&
                restaurantId !== cartItems[0].restaurant &&
                <h1 className="note">You currently have an ongoing order from {restaurant} in your cart.
                </h1>
            }
            {
                cartItems?.length > 0 &&
                restaurantId === cartItems[0].restaurant &&
                cartItems?.map(c => c.item)?.includes(item._id) &&
                <Counter id={item._id} />
            }
            {
                cartItems?.length > 0 &&
                restaurantId === cartItems[0].restaurant &&
                !(cartItems?.map(c => c.item)?.includes(item._id)) &&
                <AddTocart item={item} />
            }
        </>
    )
}

export default ItemsCard