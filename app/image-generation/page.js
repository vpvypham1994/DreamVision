import ImageGeneration from '@/components/ImageGeneration'
import Layout from '@/layouts/layout'
import React from 'react'

export const metadata = {
  title:'Image Generation',
  content:'text/html',
  openGraph: {
    title:'Image Generation',
    content:'text/html',
  },
}

export default function page() {
  
  return (
    <Layout leftMenu>
      <ImageGeneration />
    </Layout>
  )
}
