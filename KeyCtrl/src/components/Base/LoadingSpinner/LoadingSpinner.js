import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import "./LoadingSpinner.css"

const LoadingSpinner = () => {
    return (
        <div className="loader-base">
            <div className="loader">
                <Loader
                    type="ThreeDots"
                    color="#50E3C2"
                    height={200}
                    width={200}
                    timeout={4000} //4 secs
                />
            </div>
        </div>
    )
}

export default LoadingSpinner
