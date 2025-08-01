import { SessionProvider } from 'next-auth/react'
import React from 'react'

const MainLayoutProvider = ({children}: {
    children:React.ReactNode
}) => {
  return (
    <div>{children}</div>
  )
}

export default MainLayoutProvider