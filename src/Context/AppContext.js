import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { ORDERS_API, RESTAURANTS_API } from "../Utilities/APIs";

const AppContext = createContext({})


function AppContextProvider({ children }) {

    const { customer } = useSelector(state => state.auth)

    const [selectedArea, setSelectedArea] = useState('');
    const [cartItems, setCartItems] = useState([])
    const [showCart, setShowCart] = useState(false)
    const [myOrders, setMyOrders] = useState(null)
    const [orderStatus, setOrderStatus] = useState('completed')
    const [restaurants, setRestaurants] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [toggleFetch, setToggleFetch] = useState(false);





    // cart stuff
    function addToCart(id, price, name, restaurant) {
        const restaurantId = restaurant?._id
        setCartItems([...cartItems, {
            name: name,
            item: id,
            quantity: 1,
            price: price,
            total: price,
            restaurant: restaurantId ? restaurantId : restaurant
        }])
    }

    function handleIncrease(id) {
        const items = cartItems.map(i => {
            if (i.item === id) {
                return {
                    name: i.name,
                    item: i.item,
                    restaurant: i.restaurant,
                    quantity: i.quantity + 1,
                    price: i.price,
                    total: i.price * (i.quantity + 1)
                }
            } else {
                return i
            }
        })
        setCartItems(items)

    }

    function handleDecrease(id) {

        const items = cartItems.map(i => {
            if (i.item === id && i.quantity > 1) {
                return {
                    name: i.name,
                    item: i.item,
                    restaurant: i.restaurant,
                    quantity: i.quantity - 1,
                    price: i.price,
                    total: i.price * (i.quantity - 1)

                }
            } else {
                return i
            }
        })

        setCartItems(items)

    }

    function handleRemove(id) {
        setCartItems(cartItems?.filter(item => item.item !== id))
    }

    useEffect(() => {
        const localStorageCart = JSON.parse(localStorage.getItem("cart"));
        if (localStorageCart) {
            setCartItems(localStorageCart)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // selected area stuff
    useEffect(() => {
        const localSelectedArea = localStorage.getItem('selectedArea');
        setSelectedArea(localSelectedArea ? localSelectedArea : 'Select Area');
    }, [])

    useEffect(() => {
        localStorage.setItem('selectedArea', selectedArea);
    }, [selectedArea]);


    //get my last order status
    useEffect(() => {
        if (customer) {
            const config = {
                headers: {
                    Authorization: `Bearer ${customer.token}`
                }
            }

            async function getAndSetMyOrders() {
                setIsLoading(true)
                const { data } = await axios.get(ORDERS_API + 'getMyOrders', config);
                setMyOrders(data?.map(order => order)?.slice(-1)[0])
                if (data.length === 0) {
                    setOrderStatus('completed')
                } else {
                    setOrderStatus(data?.map(order => order?.orderStatus)?.slice(-1)[0]);
                    // setOrderStatus(data?.map(order => order?.orderStatus)[0]);
                }
                setIsLoading(false)
            }
            getAndSetMyOrders()
        }

    }, [customer, toggleFetch])


    useEffect(() => {
        async function restaurants() {
            setIsLoading(true)
            const { data } = await axios.get(RESTAURANTS_API);
            setRestaurants(data);
            setIsLoading(false)
        }
        restaurants()
    }, [])


    function triggerFetchRequest() {
        setToggleFetch(prev => !prev)
    }

    return (
        <AppContext.Provider
            value={{
                selectedArea,
                setSelectedArea,
                cartItems,
                setCartItems,
                showCart,
                setShowCart,
                addToCart,
                handleIncrease,
                handleDecrease,
                handleRemove,
                myOrders,
                orderStatus,
                triggerFetchRequest,
                restaurants,
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {
    AppContextProvider
}

export default AppContext;