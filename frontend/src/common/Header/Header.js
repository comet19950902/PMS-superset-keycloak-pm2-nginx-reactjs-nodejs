import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './Header.css'
import { LOGOUT_URL } from '../../config/env'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const name = localStorage.getItem('name')

  const handleClick = () => {
    localStorage.clear()
    window.location = `${LOGOUT_URL}`
  }
  return (
    <>
      <header style={{ paddingBottom: '0%', paddingTop: '1%', paddingLeft: '3%',marginRight:'-3.9em' }}>
        <div className="profile" style={{ marginRight: '1%' }}>
          <AccountCircleIcon sx={{ color: 'white', marginRight: '4%' }} />
          <span style={{ fontSize: '14px' }}>{name}</span>
        </div>
        <div className="btnpoweoff" onClick={handleClick}>
          <Link to="#">
            <svg
              id="shut-down-line"
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              
            >
              <path
                id="Path_95"
                data-name="Path 95"
                d="M0,0H23V23H0Z"
                fill="none"
              />
              <path
                id="Path_96"
                data-name="Path 96"
                d="M6.052,3.717l1.09,1.557a7.6,7.6,0,1,0,8.717,0l1.09-1.557a9.5,9.5,0,1,1-10.9,0Zm4.5,7.783V2h1.9v9.5Z"
                fill="#0f8bfe"
              />
            </svg>
          </Link>
        </div>
      </header>
    </>
  )
}

export default Header