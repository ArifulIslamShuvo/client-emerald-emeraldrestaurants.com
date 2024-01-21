import modalLogo from '../../../Assets/logo/Emerald Group.svg';
import close from '../../../../Assets/images/My Orders/modal-close.svg'

import './Modal.css'

function Modal({ showModal, handleShowModal }) {
    return (
        <section className='modal-section'>
            <div className="modal-fixed">
                <div className="modal_backdrop" onClick={handleShowModal}></div>
                <div className={`modal-dialog modal_dialog_centered`}>
                    <div className="modal-content">
                        <div onClick={handleShowModal} className='close-modal'><img src={close} alt="" /></div>
                        <div className="modal-body">
                            <div className="image-wrapper">
                                <img src={modalLogo} alt="" />
                            </div>
                            <h1>choose your location</h1>
                            <div className="location-conainer">
                                <div className="location-selector">
                                    <div class="select-box">
                                        <select>
                                            <option selected="">Select Location</option>
                                            <option value="1">Gulshan</option>
                                            <option value="2">Dhanmondi</option>
                                            <option value="3">Banani</option>
                                            <option value="4">Uttara</option>
                                        </select>
                                    </div>
                                </div>
                                <button>submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Modal