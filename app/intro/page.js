import Intro from '@/components/Intro'
import React from 'react'

export const metadata = {
  title:'Intro',
  content:'text/html',
  openGraph: {
    title:'Intro',
    content:'text/html',
  },
}

export default function page() {
  return (
    <>
      <Intro />
    </>
  )
}
