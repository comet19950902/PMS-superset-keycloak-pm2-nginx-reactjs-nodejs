import { KEYCLOAK_ID, KEYCLOAK_SECRET, REDIRECT_URI } from '../../config/env'
import queryString from 'query-string'
// import { CODE_VERIFIER } from '../../config/PCKEConfigs';
import URL from 'url'

const KeycloakToken = async (code) => {
  const params = {
    client_id: KEYCLOAK_ID,
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    // code_verifier: CODE_VERIFIER,
    state: JSON.stringify({ provider: 'Keycloak' })
    // proxyBaseUrl: `http://13.126.238.54:8080/auth/realms/PMS_dev/protocol/openid-connect/token`
  }

  const post_data = queryString.stringify(params)
  const parsedUrl = URL.parse('http://13.126.238.54:8080/auth/realms/PMS_dev/protocol/openid-connect/token', true)

  const realHeaders = {}
  realHeaders.Host = parsedUrl.host
  realHeaders['Content-Length'] = post_data.length
  realHeaders['Content-Type'] = 'application/x-www-form-urlencoded'

  const options = {
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname,
    method: 'POST',
    headers: realHeaders
  }

  const payload = Object.assign({
    body: post_data
  }, options)

  const response = await fetch('http://13.126.238.54:8080/auth/realms/PMS_dev/protocol/openid-connect/token', payload)

  const res = await response.json()
  const token_object = JSON.parse(res.body)

  return token_object.access_token
}

export default KeycloakToken
