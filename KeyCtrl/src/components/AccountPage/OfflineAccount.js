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

const OfflineAccount = ({openSignIn}) => {
    return (
        <div className="oa-wrapper">
            <MdLock style={{color: 'var(--selection-color)'}}/>
            <div>Please <span onClick={openSignIn} className='offline-acc-login'>Login</span> to view account statistics</div>
        </div>
    )
}

export default OfflineAccount
