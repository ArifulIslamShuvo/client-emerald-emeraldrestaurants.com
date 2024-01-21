import {  useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { EMERALD_AREAS_API } from '../../../../Utilities/APIs';
import AppContext from '../../../../Context/AppContext';
import modalLogo from '../../../Assets/restaurant-logos/Emerald Group.svg';

import './SelectLocationForm.css'

function SelectLocationForm({ handleClose}) {

    const [emaraldAreas, setEmaraldAreas] = useState(null);

    const { selectedArea, setSelectedArea, setIsLoading} = useContext(AppContext)
    
    const [emaraldArea, setEmaraldArea] = useState('')
    

    useEffect(() => {
        async function getEmaraldAreas() {
            setIsLoading(true)
            const { data } = await axios.get(EMERALD_AREAS_API);
            setEmaraldAreas(data);
            setIsLoading(false)
        }
        getEmaraldAreas()
    }, [setIsLoading])


    return (
        <div className='sl_form'>
            <div className="image-wrapper">
                <img src={modalLogo} alt="" />
            </div>
            <h1>choose your location</h1>
            <div className="location-conainer">
                <div className="location-selector">
                    <div className="select-box">
                        <select
                            value={emaraldArea}
                            onChange={(e) => setEmaraldArea(e.target.value)}
                        >
                            <option value=''>{selectedArea === 'Select Area' ? 'Select Location' : selectedArea}</option>
                            {
                                emaraldAreas?.map(emaraldArea =>
                                    <option key={emaraldArea._id}>{emaraldArea.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <button 
                 onClick={() => {
                    handleClose()
                    setSelectedArea(emaraldArea)

                  }}>submit</button>
            </div>
        </div>
    )
}

export default SelectLocationForm