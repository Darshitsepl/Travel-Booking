import Header from '@/components/Header';
import authOptions from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

const HomePage = async () => {
    const session = await getServerSession(authOptions);
  return (
    <div>
    <Header/>
      <h2>{session?.user?.name}</h2>
    
    </div>
  )
}

export default HomePage