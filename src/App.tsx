import * as React from 'react'
import { useAuthMachine } from './lib/auth'
import { Authenticated } from './components/Authenticated'
import { Loading } from './components/Loading'
import { Unauthenticated } from './components/Unauthenticated'

function App() {
  const [current, send] = useAuthMachine()

  switch (true) {
    case current.matches('initializing') ||
      current.matches('initialized.loading') ||
      current.matches('initialized.handlingCallback') ||
      current.matches('initialized.fetchingUser'):
      return <Loading />
    case current.matches('initialized.unauthenticated') ||
      current.matches('initialized.loggingIn'):
      return (
        <Unauthenticated
          onLogin={() => send('LOGIN')}
          isLoggingIn={current.matches('initialized.loggingIn')}
        />
      )
    case current.matches('initialized.authenticated'):
      return (
        <Authenticated
          user={current.context.user}
          onLogout={() => send('LOGOUT')}
        />
      )
    default:
      return null
  }
}

export default App
