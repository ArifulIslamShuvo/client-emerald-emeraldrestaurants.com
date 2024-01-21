import error from '../../../Components/Assets/images/404.png'
import Navbar from '../../Partials/Sections/Navbar/Navbar'

import './NotFound.css'


function NotFound() {
  return (
    <>
      <Navbar darkBg='bg-dark' />
      <section className="not-found-section">
        <div className="container">
          <div class="not-found-content">
            <div class="not-found-inner">
              <img src={error} alt="404" />
              <h4>Error 404: Page not found</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound