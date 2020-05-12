import * as React from 'react'

interface Props {
  user: any
  onLogout: () => void
}

export const Authenticated = (props: Props) => {
  const { user, onLogout } = props

  return (
    <>
      Hello {user.nickname}
      <button onClick={onLogout}>Logout</button>
    </>
  )
}
