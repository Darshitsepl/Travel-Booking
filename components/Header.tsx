'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Header = () => {
  const {data} = useSession();

  return (
    <div>
        <button type="button" onClick={async () => {
          const userId = data?.user ? data?.user.userId as string : "";
          const response =await (await fetch('/api/signout', {
            method: "POST",
            body: JSON.stringify({
              userId
            })
          })).json();
          if(response.status) {
    await signOut({
            redirect: true,
            callbackUrl: "/login"
          })
          }
      
        }}>Log out</button>
    </div>
  )
}

export default Header