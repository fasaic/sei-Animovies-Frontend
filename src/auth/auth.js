import { Buffer } from 'buffer'

// Save token to local storage
export const setToken = (token) => {
  window.localStorage.setItem('rcf-ani-token', token)
}

// Call token from storage
export const getToken = () => {
  return window.localStorage.getItem('rcf-ani-token')
}

// Verify token
export const getPayLoad = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

// Validate user for length of payload exp
export const userIsAuthenticated = () => {
  const payload = getPayLoad()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  console.log('Expiry date', payload.exp)
  return currentTime < payload.exp
}