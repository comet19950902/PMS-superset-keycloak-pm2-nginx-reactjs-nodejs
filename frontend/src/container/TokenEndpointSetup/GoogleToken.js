import { GOOGLE_ID, GOOGLE_SECRET, REDIRECT_URI } from '../../config/env'
import queryString from 'query-string'
import { CODE_VERIFIER } from '../../config/PCKEConfigs'
import URL from 'url'

const GoogleToken = async (code) => {
  const params = {
    client_id: GOOGLE_ID,
    client_secret: GOOGLE_SECRET,
    code,
    grant_type: ['authorization_code'],
    redirect_uri: REDIRECT_URI,
    // code_verifier: CODE_VERIFIER,
    state: JSON.stringify({ provider: 'Google' })
  }

  const post_data = queryString.stringify(params)
  const parsedUrl = URL.parse('https://oauth2.googleapis.com/token', true)

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

  const response = await fetch('https://oauth2.googleapis.com/token', payload)

  const token_object = await response.json()

  return token_object.access_token
}

export default GoogleToken
