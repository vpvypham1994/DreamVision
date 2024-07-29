'use client'
import React, { useState } from 'react';
import ChatItem from './ChatItem';
import ChatInput from './ChatInput';
import ChatSidebar from './ChatSidebar';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (author, text) => {
        const newMessage = { author, text };
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return (
        <div className="techwave_fn_aichatbot_page fn__chatbot">

            <div className="chat__page">
                <div className="font__trigger">
                    <span />
                </div>
                <div className="fn__title_holder">
                    <div className="container">
                        {/* Active chat title */}
                        <h1 className="title">Chat Bot Definition</h1>
                        {/* !Active chat title */}
                    </div>
                </div>
                <div className="container">
                    <div className="chat__list">
                        {messages.map((message, index) => (
                            <ChatItem key={index} message={message} />
                        ))}
                    </div>
                </div>
                <ChatInput addMessage={addMessage} />
                <ChatSidebar messages={messages} /> {/* Pass messages prop */}
            </div>
        </div>
    );
};

export default ChatPage;
