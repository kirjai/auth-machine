import * as React from 'react'

interface Props {
  isLoggingIn: boolean
  onLogin: () => void
}

export const Unauthenticated = (props: Props) => {
  const { onLogin, isLoggingIn } = props

  return (
    <button onClick={onLogin} disabled={isLoggingIn}>
      Login
    </button>
  )
}
