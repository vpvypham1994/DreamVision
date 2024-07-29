import React from 'react';

const ChatBox = ({ author, text }) => {
    return (
        <>
            <div className="chat__item active" id="chat1">
                <div className="chat__box your__chat">
                    <div className="author"><span>You</span></div>
                    <div className="chat">
                        <p>What is a chat bot?</p>
                    </div>
                </div>
                <div className="chat__box bot__chat">
                    <div className="author"><span>Bot</span></div>
                    <div className="chat">
                        <p>At the most basic level, a chatbot is a computer program that simulates and processes human conversation (either written or spoken), allowing humans to interact with digital devices as if they were communicating with a real person. Chatbots can be as simple as rudimentary programs that answer a simple query with a single-line response, or as sophisticated as digital assistants that learn and evolve to deliver increasing levels of personalization as they gather and process information.</p>
                    </div>
                </div>
                <div className="chat__box your__chat">
                    <div className="author"><span>You</span></div>
                    <div className="chat">
                        <p>How do chatbots work?</p>
                    </div>
                </div>
                <div className="chat__box bot__chat">
                    <div className="author"><span>Bot</span></div>
                    <div className="chat">
                        <p>Chatbots boost operational efficiency and bring cost savings to businesses while offering convenience and added services to internal employees and external customers. They allow companies to easily resolve many types of customer queries and issues while reducing the need for human interaction.</p>
                    </div>
                </div>
            </div>
            <div className={`chat__box ${author.toLowerCase()}__chat`}>
                <div className="author">
                    <span>{author} {console.log(author)}</span>
                </div>
                <div className="chat">
                    <p>{text}</p>
                </div>
            </div>
        </>
    );
};

export default ChatBox;
