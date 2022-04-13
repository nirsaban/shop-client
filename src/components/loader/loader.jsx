
import React from 'react'

import './loader.css'
const Loader = () => {
    return(
        <div className="loader-wrapper">
            <div className="loader">
            <div className="roller"></div>
             <div className="roller"></div>
        </div>
        <div className="loader loader-2">
          <div className="roller"></div>
           <div className="roller"></div>
        </div>
        <div className="loader loader-3">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
    </div>
    )

}



export default Loader