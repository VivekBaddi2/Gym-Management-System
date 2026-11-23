'use client'
import React, { Suspense } from 'react'
import '../globals.css'
import { usePathname, useSearchParams } from 'next/navigation'
import SignupForm from '../components/SignupForm'

function AuthForm() {
  const p = useSearchParams()
  const isSignup = p.get('type') == 'signup' ? true : false
  console.log(p)

  return isSignup ? (
    <SignupForm />
  ) : (
    <div>
      <h1>Login Page</h1>
    </div>
  )
}

function Loading() {
  return <p>Loading...</p>
}

function Authentication() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthForm />
    </Suspense>
  )
}
export default Authentication
