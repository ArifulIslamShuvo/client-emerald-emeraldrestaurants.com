function PersonalInfo({customer}) {
    return (
        <>
            <h4>Personal Info</h4>
            <div className="default_info personal_info_view">
                <div className="grid_container">
                    <div className="">
                        <div className="info_content">
                            {/* <p className='caption bold'>Name</p> */}
                            <p className="body_text">{customer?.name}</p>
                        </div>
                    </div>
                    <div className=" ">
                        <div className="info_content">
                            {/* <p className='caption bold'>Contact Number</p> */}
                            <p className="body_text">{`+88${customer?.mobile}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalInfo