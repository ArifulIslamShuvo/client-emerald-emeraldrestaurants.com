import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../../../../Context/AppContext";
import { takaFormatter } from "../../../../Utilities/Formatter";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  DELIVERY_FEES_API,
  DISCOUNTS_API,
  IMAGE_URL,
  ITEMS_API,
  RESTAURANTS_API,
  VATS_API,
} from "../../../../Utilities/APIs";
import MinusIcon from "../../../Assets/icons/minus-btn.svg";
import PlusIcon from "../../../Assets/icons/plus-btn.svg";
import DeleteIcon from "../../../../../src/Assets/images/icons/delete-icon.svg";
import minus from "../../../../Assets/images/icons/subtract.svg";

import "./Cart.css";

function Cart({ showCart, cartToggle }) {
  // const { customer } = useSelector(state => state.auth)
  const {
    cartItems,
    handleDecrease,
    handleIncrease,
    handleRemove,
    setIsLoading,
  } = useContext(AppContext);

  const cartItemsTotalPrice = cartItems.map((item) => item.total);

  const total = cartItemsTotalPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  const [products, setProducts] = useState(null);
  console.log("🚀 ~ Cart ~ products:", products);

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    async function restaurants() {
      setIsLoading(true);
      const { data } = await axios.get(RESTAURANTS_API);
      setRestaurants(data);
      setIsLoading(false);
    }
    restaurants();
  }, [setIsLoading]);

  const restaurantName =
    restaurants &&
    restaurants?.find((r) => r._id === cartItems[0]?.restaurant)?.name;

  useEffect(() => {
    async function getAndSetProducts() {
      setIsLoading(true);
      const productRes = await fetch(ITEMS_API);
      const productData = await productRes.json();
      setProducts(productData);
      setIsLoading(false);
    }

    getAndSetProducts();
  }, [setIsLoading]);

  useEffect(() => {
    async function getAndSetOrderAmounts() {
      const deliveryFeeRes = await fetch(DELIVERY_FEES_API);
      const deliveryFeeData = await deliveryFeeRes.json();
      const deliveryFeeAmount = total === 0 ? 0 : deliveryFeeData[0].amount;
      setDeliveryFee(deliveryFeeAmount);

      const subTotalAmount = total + deliveryFeeAmount;
      setSubtotal(subTotalAmount);

      const vatRes = await fetch(VATS_API);
      const vatData = await vatRes.json();
      const vatAmount = (subTotalAmount * vatData[0].amount) / 100;
      setVat(vatAmount);

      const discountRes = await fetch(DISCOUNTS_API);
      const discountData = await discountRes.json();
      const discountAmount =
        ((subTotalAmount + vatAmount) * discountData[0].amount) / 100;
      setDiscount(discountAmount);

      const grandTotalAmount = subTotalAmount + vatAmount - discountAmount;
      setGrandTotal(grandTotalAmount);
    }

    getAndSetOrderAmounts();
  }, [cartItems, products, total]);

  return (
    // <>
    //     <aside className={`cart ${showCart ? 'show' : ''}`}>
    //         <div className="cart_header">
    //             <h1>my cart</h1>
    //             <button
    //                 className='closeCart'
    //                 onClick={cartToggle}
    //             >
    //                 <RiCloseCircleFill />
    //             </button>
    //         </div>
    //         <h2 className='cartRestaurantName'>{restaurantName}</h2>

    //         <div className="cartItem item_head">
    //             <div>
    //                 <p>Item</p>
    //             </div>
    //             <div>
    //                 <p>Quantity</p>
    //             </div>
    //             <div>
    //                 <p>Unit Price</p>
    //             </div>
    //             <div>
    //                 <p>Total Price</p>
    //             </div>
    //             {/* <div className="cartRightSide"></div> */}
    //         </div>
    //         {cartItems?.map(item =>
    //         <div className='cardItems' key={item.item}>

    //                 <div className="cartItem">
    //                     <div>
    //                         <h6>{item?.name}</h6>
    //                     </div>
    //                     <div>
    //                         <div className="incrDecBtn">
    //                             <button onClick={() => handleDecrease(item?.item)}>
    //                                 {
    //                                     item?.quantity > 1 ?
    //                                         <img src={minus} alt="icon" />
    //                                         :
    //                                         <img src={MinusIcon} alt="icon" />
    //                                 }
    //                             </button>
    //                             <span>{item?.quantity}</span>
    //                             <button onClick={() => handleIncrease(item?.item)} >
    //                                 <img src={PlusIcon} alt="icon" />
    //                             </button>
    //                         </div>
    //                     </div>
    //                     <div>
    //                         <h6>{takaFormatter(item?.price?.toFixed(2))}</h6>
    //                     </div>
    //                     <div>
    //                         <h6>{takaFormatter(item?.total?.toFixed(2))}</h6>
    //                     </div>
    //                     {/* <div className="cartRightSide">
    //                     <button
    //                         onClick={() => handleRemove(item.item)}
    //                     >
    //                         <img src={DeleteIcon} alt="icon" />
    //                     </button>
    //                 </div> */}
    //                 </div>
    //                 <div>
    //                     <button className="cart_delete" onClick={() => handleRemove(item.item)}>
    //                         <img src={DeleteIcon} alt="" />
    //                         <span>Remove</span>
    //                     </button>
    //                 </div>
    //             </div>
    //         )}

    //         <div className="calculation">
    //             <div>
    //                 <h6>Total</h6>
    //             </div>
    //             <div>
    //                 <h6>{takaFormatter(total.toFixed(2))}</h6>
    //             </div>
    //         </div>
    //         <div className="calculation">
    //             <div>
    //                 <h6>Delivery Fee</h6>
    //             </div>
    //             <div>
    //                 <h6>{takaFormatter(deliveryFee.toFixed(2))}</h6>
    //             </div>
    //         </div>
    //         <div className="calculation">
    //             <div>
    //                 <h6>Sub Total</h6>
    //             </div>
    //             <div>
    //                 {/* <h6>Tk. {subtotal}</h6> */}
    //                 <h6>{takaFormatter(subtotal.toFixed(2))}</h6>
    //             </div>
    //         </div>
    //         <div className="calculation">
    //             <div>
    //                 <h6>VAT</h6>
    //             </div>
    //             <div>
    //                 <h6>{takaFormatter(vat.toFixed(2))}</h6>
    //             </div>
    //         </div>
    //         <div className="calculation">
    //             <div>
    //                 <h6>Discount</h6>
    //             </div>
    //             <div>
    //                 <h6>{takaFormatter(discount.toFixed(2))}</h6>
    //             </div>
    //         </div>
    //         <div className="calculation grand-total">
    //             <div>
    //                 <h6>Grand Total</h6>
    //             </div>
    //             <div>
    //                 <h6>{takaFormatter(grandTotal.toFixed(2))}</h6>
    //             </div>
    //         </div>

    //         <Link to="/checkout/address-selected"><button className="brand-btn rounded-pill">Checkout</button></Link>
    //         <p className="info-text">One of our representatives will personally call you to confirm your order upon checkout</p>
    //     </aside>
    //     <div
    //         className={`trasnparentBg ${showCart ? 'show' : ''}`}
    //         onClick={cartToggle}
    //     ></div>
    // </>

    <>
      <aside className={`cart ${showCart ? "show" : ""}`}>
        <div className="cart_header">
          <h1>my cart</h1>
          <button className="closeCart" onClick={cartToggle}>
            <RiCloseCircleFill />
          </button>
        </div>
        <h2 className="cartRestaurantName">{restaurantName}</h2>
        <hr />
        {
          // <div className="cartItem item_head">
          //       <div>
          //         <p>Item</p>
          //       </div>
          //       <div>
          //         <p>Quantity</p>
          //       </div>
          //       <div>
          //         <p>Unit Price</p>
          //       </div>
          //       <div>
          //         <p>Total Price</p>
          //       </div>
          //       {/* <div className="cartRightSide"></div> */}
          //     </div>
        }

        {cartItems?.map((item) => (
          <div className="cardItems" key={item.item}>
            <div className="cartItem">
              {/* item image */}
              <div className="p-image">
                <img
                  src={
                    IMAGE_URL +
                    products?.find((p) => p._id === item?.item)?.image
                  }
                  alt=""
                />
              </div>
              {/* item details */}
              <div>
                <div>
                  <h6 className="name">{item?.name}</h6>
                </div>
                <div className="price">
                  <h6>{takaFormatter(item?.price?.toFixed(2))}</h6>
                  {/* <h6>{takaFormatter(item?.total?.toFixed(2))}</h6> */}
                </div>
                <div className="incrDecBtn">
                  <button onClick={() => handleDecrease(item?.item)}>
                    {item?.quantity > 1 ? (
                      <img src={minus} alt="icon" />
                    ) : (
                      <img src={MinusIcon} alt="icon" />
                    )}
                  </button>
                  <span>{item?.quantity}</span>
                  <button onClick={() => handleIncrease(item?.item)}>
                    <img src={PlusIcon} alt="icon" />
                  </button>
                </div>
              </div>
              {/* remove button  */}
              <div>
                <button
                  className="cart_delete"
                  onClick={() => handleRemove(item.item)}
                >
                  {/* <img src={DeleteIcon} alt="" />
                  <span>Remove</span> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M13.5909 12.002L18.0441 7.54883C18.2554 7.33786 18.3743 7.05157 18.3745 6.75295C18.3748 6.45432 18.2564 6.16783 18.0455 5.95648C17.8345 5.74514 17.5482 5.62626 17.2496 5.62599C16.951 5.62573 16.6645 5.74411 16.4531 5.95508L12 10.4082L7.54687 5.95508C7.33553 5.74373 7.04888 5.625 6.75 5.625C6.45111 5.625 6.16447 5.74373 5.95312 5.95508C5.74178 6.16642 5.62305 6.45307 5.62305 6.75195C5.62305 7.05084 5.74178 7.33748 5.95312 7.54883L10.4062 12.002L5.95312 16.4551C5.74178 16.6664 5.62305 16.9531 5.62305 17.252C5.62305 17.5508 5.74178 17.8375 5.95312 18.0488C6.16447 18.2602 6.45111 18.3789 6.75 18.3789C7.04888 18.3789 7.33553 18.2602 7.54687 18.0488L12 13.5957L16.4531 18.0488C16.6645 18.2602 16.9511 18.3789 17.25 18.3789C17.5489 18.3789 17.8355 18.2602 18.0469 18.0488C18.2582 17.8375 18.3769 17.5508 18.3769 17.252C18.3769 16.9531 18.2582 16.6664 18.0469 16.4551L13.5909 12.002Z"
                      fill="#858585"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}

        {
          //    <div className="calculation">
          //    <div>
          //      <h6>Total</h6>
          //    </div>
          //    <div>
          //      <h6>{takaFormatter(total.toFixed(2))}</h6>
          //    </div>
          //  </div>
          //  <div className="calculation">
          //    <div>
          //      <h6>Delivery Fee</h6>
          //    </div>
          //    <div>
          //      <h6>{takaFormatter(deliveryFee.toFixed(2))}</h6>
          //    </div>
          //  </div>
          //  <div className="calculation">
          //    <div>
          //      <h6>Sub Total</h6>
          //    </div>
          //    <div>
          //      {/* <h6>Tk. {subtotal}</h6> */}
          //      <h6>{takaFormatter(subtotal.toFixed(2))}</h6>
          //    </div>
          //  </div>
          //  <div className="calculation">
          //    <div>
          //      <h6>VAT</h6>
          //    </div>
          //    <div>
          //      <h6>{takaFormatter(vat.toFixed(2))}</h6>
          //    </div>
          //  </div>
          //  <div className="calculation">
          //    <div>
          //      <h6>Discount</h6>
          //    </div>
          //    <div>
          //      <h6>{takaFormatter(discount.toFixed(2))}</h6>
          //    </div>
          //  </div>
          //  <div className="calculation grand-total">
          //    <div>
          //      <h6>Grand Total</h6>
          //    </div>
          //    <div>
          //      <h6>{takaFormatter(grandTotal.toFixed(2))}</h6>
          //    </div>
          //  </div>
        }

        <div className="cart-buttom">
          <div className="calculation grand-total">
            <div>
              <h6>Grand Total</h6>
            </div>
            <div>
              <h6>{takaFormatter(grandTotal.toFixed(2))}</h6>
            </div>
          </div>
          <Link to="/checkout/address-selected">
            <button className="brand-btn rounded-pill">Checkout</button>
          </Link>
          <p className="info-text">
            One of our representatives will personally call you to confirm your
            order upon checkout
          </p>
        </div>
      </aside>
      <div
        className={`trasnparentBg ${showCart ? "show" : ""}`}
        onClick={cartToggle}
      ></div>
    </>
  );
}

export default Cart;
