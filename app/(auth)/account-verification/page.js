"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'

function AccountVerification() {
    const params = useSearchParams();

    console.log(params)

  return (
    <div>
      <h1>Account Verification</h1>
    </div>
  )
}

export default AccountVerification
