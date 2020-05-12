import { createMachine, assign } from 'xstate'
import { Auth0Client } from '@auth0/auth0-spa-js'

export interface AuthContext {
  auth0Client?: Auth0Client
  user?: any
}

type AuthEvent = { type: 'LOGIN' } | { type: 'LOGOUT' }

export const authMachine = createMachine<AuthContext, AuthEvent>({
  id: 'auth',
  initial: 'initializing',
  context: {},
  states: {
    initializing: {
      invoke: {
        src: 'initialize',
        onDone: {
          target: 'initialized',
          actions: assign({ auth0Client: (_, event) => event.data }),
        },
        onError: 'error',
      },
    },
    initialized: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            '': [
              {
                target: 'handlingCallback',
                cond: 'shouldHandleCallback',
              },
              {
                target: 'loading',
              },
            ],
          },
        },
        handlingCallback: {
          invoke: {
            src: 'handleCallback',
            onDone: 'fetchingUser',
            onError: 'unauthenticated',
          },
        },
        loading: {
          invoke: {
            src: 'isAuthenticated',
            onDone: 'fetchingUser',
            onError: 'unauthenticated',
          },
        },
        fetchingUser: {
          invoke: {
            src: 'fetchUser',
            onDone: {
              target: 'authenticated',
              actions: assign({ user: (_, event) => event.data }),
            },
            onError: 'unauthenticated',
          },
        },
        authenticated: {
          on: {
            LOGOUT: {
              target: 'unauthenticated',
              actions: ['onLogout'],
            },
          },
        },
        unauthenticated: {
          on: {
            LOGIN: 'loggingIn',
          },
        },
        loggingIn: {
          onEntry: ['onLoggingIn'],
        },
      },
    },
    error: {
      type: 'final',
    },
  },
})
