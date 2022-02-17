import React from 'react'
import '../../styles/OfflineAccount.css'
import { MdLock } from 'react-icons/md'

/**
 * @module OfflineAccount
 * @description Component that is shown in place of the statistics page if account is logged out
 * @returns Component to be displayed
 * @example
 * <OfflineAccount />
 */

const OfflineAccount = () => {
    return (
        <div className="oa-wrapper">
            <MdLock style={{color: '50E3C2'}}/>
            Please Login to view account statistics
        </div>
    )
}

export default OfflineAccount
