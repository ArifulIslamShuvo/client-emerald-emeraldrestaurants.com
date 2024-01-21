import { useContext, useEffect, useState } from 'react'
import Navbar from '../../Partials/Sections/Navbar/Navbar'
import ContactUs from './ContactUs'
import axios from 'axios'
import { RESTAURANTS_API } from '../../../Utilities/APIs'
import AppContext from '../../../Context/AppContext'

function Contact() {

  const [restaurants, setRestaurants] = useState(null)
  const { setIsLoading } = useContext(AppContext)
  useEffect(() => {
    async function restaurants() {
      setIsLoading(true)
        const { data } = await axios.get(RESTAURANTS_API);
        setRestaurants(data);
        setIsLoading(false)
    }
    restaurants()
}, [setIsLoading])

  return (
    <>
      <Navbar darkBg='bg-dark' />

      <section className="contact_us spy">
        <div className='container'>
          <div className='contact'>
            {
              restaurants?.map(restaurant => (
                <ContactUs 
                  key={restaurant._id}
                  restaurant={restaurant}
                />
              ))
            }
            {/* <ContactUs />
            <ContactUs />
            <ContactUs />
            <ContactUs />
            <ContactUs /> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact