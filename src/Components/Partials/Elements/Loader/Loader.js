import { Bars } from 'react-loader-spinner'
import './Loader.css'

function Loader() {
  return (
    <div className='loader'>
        <Bars
            height="80"
            width="80"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}

export default Loader