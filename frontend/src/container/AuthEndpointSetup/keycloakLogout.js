import { KEYCLOAK_ID, KEYCLOAK_SECRET, REDIRECT_URI, LOCATION_URL } from '../../config/env'
import queryString from 'query-string'
// import { CODE_CHALLENGE_METHOD, CODE_CHALLENGE } from '../../config/PCKEConfigs'
import KeyclokaAuthUrl from '../AuthEndpointSetup/Keycloak'

const KeycloakLogout = () => {
  return queryString.stringifyUrl({
    url: 'http://13.126.238.54:8080/auth/realms/PMS_dev/protocol/openid-connect/logout',
    query: {
      client_id: KEYCLOAK_ID,
      redirect_uri: `${LOCATION_URL}/`,
      //   response_type: 'code',
      scope: [
        'openid',
        'profile'
      ].join(' ')
      // state: JSON.stringify({ provider: 'Keycloak' }),
      // code_challenge: CODE_CHALLENGE,
      // code_challenge_method: CODE_CHALLENGE_METHOD
    }
  })

  // (

  // queryString.stringifyUrl({
  //     url: `${process.env.REACT_APP_KEYCLOAK_URL}?client_id=nodejs-microservice&redirect_uri=http%3A%2F%2F13.126.238.54%3A8088%2Foidc_callback&scope=openid+email&access_type=offline&response_type=code&state=eyJjc3JmX3Rva2VuIjogInppQ09GSmhCdmVzbUNYRFJWLVpMdTNKckdndWV3d2tMIiwgImRlc3RpbmF0aW9uIjogImV5SmhiR2NpT2lKSVV6VXhNaUo5LkltaDBkSEE2THk4eE15NHhNall1TWpNNExqVTBPamd3T0RndmJHOW5hVzR2SWcuMEl1Y09YYTBXaW95dHg4cnpXbTJiaEN6OG5GOFNNQUFvRTc1NFh5aXprUTlUOWl2YlNWUmkzdnFJYTRBUUtFNVhiVVY4N1U1WjNHbkhpOWxjeHhLWHcifQ%3D%3D`,
  //     query: {
  //         client_id: KEYCLOAK_ID,
  //       redirect_uri: 'http://13.126.238.54:8088/iodc_callback',
  //         response_type: 'code',
  //         scope: [
  //             'openid',
  //             'email',
  //         ].join(" "),
  //         state: JSON.stringify({ provider: 'Keycloak' }),
  //         code_challenge: CODE_CHALLENGE,
  //         code_challenge_method: CODE_CHALLENGE_METHOD
  //     }
  // })
  //  )
  // window.location.href=KeyclokaAuthUrl
}

export default KeycloakLogout()
