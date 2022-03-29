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
                    color="var(--selection-color)"
                    height={150}
                    width={150}
                />
            </div>
        </div>
    )
}

export default LoadingSpinner
