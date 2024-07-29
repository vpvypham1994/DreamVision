import React from 'react'
import Signin from '@/components/Signin'

export const metadata = {
  title:'Sign In',
  content:'text/html',
  openGraph: {
    title:'Sign In',
    content:'text/html',
  },
}

export default function page() {
  return (
    <>
      <Signin />
    </>
  )
}
