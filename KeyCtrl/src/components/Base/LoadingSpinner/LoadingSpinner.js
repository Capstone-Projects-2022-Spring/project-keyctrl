import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import "../../../styles/LoadingSpinner.css"

const LoadingSpinner = () => {
    return (
        <div className="loader-base">
            <div className="loader">
                <Loader
                    type="TailSpin"
                    color="#50E3C2"
                    height={150}
                    width={150}
                    timeout={4000} //4 secs
                />
            </div>
        </div>
    )
}

export default LoadingSpinner
