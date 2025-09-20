'use client'
import { useAuth } from '@/context/Auth'
import React from 'react'

const ChangePassword = () => {
  const {user} = useAuth();

  /**
   * If user type has google then provide the set password option
   */
  return (
    <div>MyBooking</div>
  )
}

export default ChangePassword