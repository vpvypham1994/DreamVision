import React from 'react';
import ChatBox from './ChatBox';

const ChatItem = ({ message }) => {
    return (
        <>
            <div id="chat0" className="chat__item" />
            <div className="chat__item" id="chat2" /> 
            <div className="chat__item" id="chat3" /> 
            <div className="chat__item" id="chat4" />
            <ChatBox author={message.author} text={message.text} />
            <div className="chat__item">
            </div>
        </>
    );
};

export default ChatItem;
