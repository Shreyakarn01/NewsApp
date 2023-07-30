import React from 'react'
import Loading from './Loading.gif'

const Spinner =()=> {
    return (
      <div>
          <div className='container text-center'>
            <img className="my-3" src={Loading} alt="Loading"/>
          </div>
      </div>
    )
  
}

export default Spinner


