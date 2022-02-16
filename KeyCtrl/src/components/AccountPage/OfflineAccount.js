import React from 'react'
import './OfflineAccount.css'
import { MdLock } from 'react-icons/md'

const OfflineAccount = () => {
    return (
        <div className="oa-wrapper">
            <MdLock style={{color: '50E3C2'}}/>
            Please Login to view account statistics
        </div>
    )
}

export default OfflineAccount
