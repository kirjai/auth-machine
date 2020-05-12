import { useMachine } from '@xstate/react'
import { authMachine } from './auth.machine'
import * as auth from './auth'
import { prop, pipe, nAry, partial } from 'ramda'

const getAuth0Client = prop('auth0Client')
const withAuth0Client = partial(nAry(2, pipe), [getAuth0Client])

export const useAuthMachine = () =>
  useMachine(authMachine, {
    services: {
      initialize: auth.initializeAuth0,
      handleCallback: withAuth0Client(auth.handleCallback),
      isAuthenticated: withAuth0Client(auth.isAuthenticated),
      fetchUser: withAuth0Client(auth.getUser),
    },
    guards: {
      shouldHandleCallback: auth.shouldHandleCallback,
    },
    actions: {
      onLoggingIn: withAuth0Client(auth.login),
      onLogout: withAuth0Client(auth.logout),
    },
  })
