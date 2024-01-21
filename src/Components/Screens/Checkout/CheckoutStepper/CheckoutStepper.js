import './CheckoutStepper.css'

function CheckoutStepper({checkoutStep}) {
    return (
        <div className="steper_wrapper">
            <div className='is_active'>
                <span>1</span>
                <h6>Delivery Info</h6>
            </div>
            <div className={(checkoutStep === 2 || checkoutStep === 3) ? 'is_active' : ''}>
                <span>2</span>
                <h6>Review Order</h6>
            </div>
            <div className={checkoutStep === 3 ? 'is_active' : ''}>
                <span>3</span>
                <h6>Confirmation</h6>
            </div>
        </div>
    )
}

export default CheckoutStepper