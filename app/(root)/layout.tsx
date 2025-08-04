import React from 'react'

const MainLayoutProvider = ({children}: {
    children:React.ReactNode
}) => {
 
  return (
    <>{children}</>
  )
}

export default MainLayoutProvider