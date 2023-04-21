import React from 'react'
import { Link } from 'react-router-dom'
import './SuccessMessage.css'
import Success_Icon from '../../assets/images/success-icon.svg'
const SuccessMessage = ({ message }) => {
  return (
    <div className="success-msg">
      <span><img src={Success_Icon} alt="" /></span>
      <h4 className="text-white">Successfully Added</h4>
      {/* <p>Data will be synced within 20 minutes</p> */}
      <Link to="/PMS/ManageAssets" className="btn btn-gray" style={{ width: '30%', marginLeft: '35%' }}>View Assets</Link>
    </div>
  )
}
export default SuccessMessage
