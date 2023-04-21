const KeycloakUser = async (token) => {
  let userProvider
  const res = await fetch('${process.env.REACT_APP_BASE_URL}?proxyBaseUrl=http://13.126.238.54:8080/auth/realms/PMS_dev/protocol/openid-connect/userinfo', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const res_obj = await res.json()
  const me = JSON.parse(res_obj.body)
  console.log(me)
  if (me.sub) {
    userProvider = {
      name: me.name,
      email: me.email,
      totp: me.totp

    }
  }
  return userProvider
}

export default KeycloakUser
