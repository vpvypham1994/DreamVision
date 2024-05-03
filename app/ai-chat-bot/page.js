import React from 'react'
import Layout from '@/layouts/layout'
import AIChatbot from '@/components/AIChatbot'
// import ChatPage from '@/components/ChatBot/ChatPage'

export const metadata = {
    title:'AI Chat Bot',
    content:'text/html',
    openGraph: {
      title:'AI Chat Bot',
      content:'text/html',
    },
  }

export default function page() {
    return (
        <Layout leftMenu>
            <AIChatbot />
            {/* <ChatPage/> */}
        </Layout>
    )
}
