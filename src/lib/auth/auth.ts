import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js'

export const initializeAuth0 = () =>
  createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN!,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
  })

export const isAuthenticated = async (auth0Client: Auth0Client) => {
  const isAuth = await auth0Client.isAuthenticated()
  if (!isAuth) throw new Error('not authenticated')

  return isAuth
}

export const login = (auth0Client: Auth0Client) =>
  auth0Client.loginWithRedirect({ redirect_uri: 'http://localhost:3000' })

export const logout = (auth0Client: Auth0Client) => auth0Client.logout()

export const getUser = (auth0Client: Auth0Client) => auth0Client.getUser()

export const shouldHandleCallback = () =>
  window.location.search.includes('code=') &&
  window.location.search.includes('state=')

export const handleCallback = async (auth0Client: Auth0Client) => {
  await auth0Client.handleRedirectCallback()
  window.history.replaceState({}, document.title, window.location.pathname)
}
