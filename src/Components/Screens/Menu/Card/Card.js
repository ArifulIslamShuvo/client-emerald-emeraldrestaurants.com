import { IMAGE_URL } from "../../../../Utilities/APIs";
import { takaFormatter } from "../../../../Utilities/Formatter";
import "./Card.css";
import ItemsCard from "../../ItemsCard/ItemsCard";

function Cart({ item }) {
 
    return (
    // <div className="card_content">
    //     <div className="card-img">
    //         <img src={IMAGE_URL + item.image} alt="" />
    //     </div>
    //     <div className="item-content">
    //         <div>
    //             <h3 className='product-title'>{item?.name}</h3>
    //             <ul>
    //                 <li>{item.tase}</li>
    //                 <li>For {item.portion} {parseInt(item.portion) === 1 ? 'Person' : 'People'}</li>
    //             </ul>
    //             <p>{item?.description}</p>
    //         </div>
    //         <div className='price-info'>
    //             <h4 className="price">{takaFormatter(item?.price)}</h4>
    //             <ItemsCard
    //                 item={item}
    //                 restaurantId={item.restaurant}
    //             />

    //         </div>
    //     </div>
    // </div>

    <div className="card dishesCard">
      <div className="overlayDealsBox">
        <img
          src={IMAGE_URL + item.image} 
          className="card-img-top"
          alt="..."
        />
      </div>
      <div className="card-body">
        <h3 className="card_title">{item.name}</h3>
        <h2 className="card_price">Tk. {item.price}</h2>
        <h6 className="card_res_name">{item?.description}</h6>
        <br/>

        <ItemsCard
                    item={item}
                    restaurantId={item.restaurant}
                />
      </div>
    </div>
  );
}

export default Cart;
