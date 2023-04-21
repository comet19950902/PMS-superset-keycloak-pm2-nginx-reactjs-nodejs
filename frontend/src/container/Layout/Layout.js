import React, { useState } from 'react'
import {
  REDIRECT_URI,
  LOCATION_URL
} from '../../config/env'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import KeyclokaAuthUrl from '../AuthEndpointSetup/Keycloak'
import { useLocation, useNavigate } from 'react-router-dom'
const qs = require('qs')
const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  if (location.pathname === '/') {
    localStorage.clear()
    window.location = KeyclokaAuthUrl
  } else if (location.pathname === '/PMS/dashboard' || location.pathname === '/PMS/Admin_dashboard') {
    window.location.href = KeyclokaAuthUrl
  }
  const key = {
    grant_type: 'authorization_code',
    code: location.search.split('=')[2],
    redirect_uri: REDIRECT_URI
  }
  const KeycloakToken = async () => {
    const data1 = qs.stringify(key)
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/keycloak_superset_login`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'enable-cors': true,
        'bearer-only': true
      },
      data: data1
    }
    await axios(config).then(function (response) {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      localStorage.setItem('id_token', response.data.id_token)
      const decoded = jwt_decode(response.data.access_token)
      const subId = decoded.sub
      localStorage.setItem('sub_Id', decoded.sub)
      localStorage.setItem('name', decoded.preferred_username)
      const userRole = decoded.resource_access['nodejs-microservice'] == null
        ? decoded.realm_access.roles.toLocaleString().toLowerCase().split(',').filter(rol => rol.startsWith('app-')).map(s => s.slice(4)).toLocaleString().toLowerCase()
        : decoded.resource_access['nodejs-microservice'].roles.toLocaleString().toLowerCase()
      localStorage.setItem('role', userRole)
      const username = decoded.preferred_username
      const email = decoded.email
      keycloakLogin(userRole, subId, username, email)
      if (
        userRole.includes('admin') === true &&
        userRole.includes('user') === false
      ) {
        if (location.pathname === '/callback') {
          window.location = `${LOCATION_URL}/PMS/Admin_dashboard`
        }
      } else if (
        userRole.includes('user') === true &&
        userRole.includes('admin') === false
      ) {
        if (location.pathname === '/callback') {
          window.location = `${LOCATION_URL}/PMS/dashboard`
        }
      } else if (
        userRole.includes('accountant') === true &&
        userRole.includes('user') === false
      ) {
        if (location.pathname === '/callback') {
          window.location = `${LOCATION_URL}/PMS/Admin_dashboard`
        }
      } else if (
        userRole.includes('admin') === true &&
        userRole.includes('user') === true
      ) {
        if (location.pathname === '/callback') {
          window.location = `${LOCATION_URL}/PMS/Admin_dashboard`
        }
      }
    })
  }
  const keycloakLogin = async (userRole, subId, username, email) => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/add_keycloak_user`,
      data: {
        user_role: userRole,
        user_id: subId,
        username,
        email
      }
    }
    await axios(config).then(function (response) {
      console.log(response)
    })
  }
  if (
    location.pathname === '/callback' &&
    localStorage.getItem('role') == null
  ) {
    KeycloakToken()
  }
}
export default Layout
