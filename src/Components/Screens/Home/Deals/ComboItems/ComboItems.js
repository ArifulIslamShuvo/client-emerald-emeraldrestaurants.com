import { takaFormatter } from "../../../../../Utilities/Formatter"
import ItemsCard from "../../../ItemsCard/ItemsCard"


function ComboItems({ item }) {

    return (
        <div className="cardContent">
            <h3>{item.restaurant?.name}</h3>
            <h5>{item.name}</h5>
            <h5>{item.description}</h5>
            <h2>{takaFormatter(item.price)}</h2>
            <ItemsCard
                item={item}
                restaurantId={item.restaurant._id}
            />

        </div>
    )
}

export default ComboItems