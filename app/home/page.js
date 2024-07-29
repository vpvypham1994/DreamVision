import Index from '@/components/Index'
import Layout from '@/layouts/layout'
import React from 'react'

export const metadata = {
  title:'Home',
  content:'text/html',
  openGraph: {
    title:'Home',
    content:'text/html',
  },
}

export default function page() {
  
  return (
    <Layout leftMenu>
      <Index />
    </Layout>
  )
}
