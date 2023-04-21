import { KEYCLOAK_ID, KEYCLOAK_SECRET, KEYCLOAK_URL, LOCATION_URL, REDIRECT_URI } from '../../config/env'
import queryString from 'query-string'
// import { CODE_CHALLENGE_METHOD, CODE_CHALLENGE } from '../../config/PCKEConfigs'

const Keycloak = () => {
  return queryString.stringifyUrl({
    url: `${KEYCLOAK_URL}`,
    query: {
      client_id: KEYCLOAK_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: [
        'openid',
        'profile'
      ].join(' ')
      // state: JSON.stringify({ provider: 'Keycloak' }),
      // code_challenge: CODE_CHALLENGE,
      // code_challenge_method: CODE_CHALLENGE_METHOD
    }
  })
}

export default Keycloak()
