import Signup from '@/components/Signup'
import React from 'react'

export const metadata = {
    title:'Sign Out',
    content:'text/html',
    openGraph: {
      title:'Sign Out',
      content:'text/html',
    },
  }

export default function page() {
    return (
        <>
            <Signup />
        </>
    )
}
