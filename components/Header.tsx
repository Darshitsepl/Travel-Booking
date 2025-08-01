'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const Header = () => {
  return (
    <div>
        <button type="button" onClick={async () => {
          await signOut({
            redirect: true,
            callbackUrl: "/login"
          })
        }}>Log out</button>
    </div>
  )
}

export default Header