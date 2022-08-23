import { Buffer } from 'buffer'


// Save token to local storage
export const setToken = (token) => {
  window.localStorage.setItem('rcf-ani-token', token)
  console.log('set token')
}

// Call token from storage
export const getToken = () => {
  return window.localStorage.getItem('rcf-ani-token')
  console.log('get token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  // console.log('Expiry date', payload.exp)
  return currentTime < payload.exp
}
