
function ViewAddress({ selectedAddress, handleClose }) {

    return (
        <div className="address_modal">
            <div className="address_view grid_container">
                <div className="grid_item">
                    <label className="label_view">TYPE</label>
                    <p className="input_view">{selectedAddress?.type}</p>
                </div>
                <div className="grid_item">
                    <label className="label_view">NAME</label>
                    <p className="input_view">{selectedAddress?.name}</p>
                </div>


                <div className="grid_item">
                    <label className="label_view">AREA</label>
                    <p className="input_view">
                        {selectedAddress?.area?.name}
                    </p>
                </div>

                <div className="grid_item">
                    <label className="label_view">PRECEDENCE</label>
                    <p className="input_view">{selectedAddress?.precedence}</p>
                </div>
                <div className="grid_item full_width">
                    <label className="label_view">FULL ADDRESS</label>
                    <p className="input_view">{selectedAddress?.fullAddress}</p>
                </div>
                <div className="grid_item">
                    <label className="label_view">ZIP CODE</label>
                    <p className="input_view">{selectedAddress?.zipCode}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewAddress