'use client'
import React, { useState } from 'react';

const ChatInput = ({ addMessage }) => {
    const [inputText, setInputText] = useState('');
  
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };
  
    const handleSubmit = () => {
      if (inputText.trim() !== '') {
        addMessage('You', inputText);
        setInputText('');
        console.log(addMessage);
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevents a new line from being added in the textarea
        handleSubmit();
        return false; // Prevents form submission
      }
    };
  
    return (
      <div className="chat__comment">
        <div className="container">
          <div className="fn__chat_comment">
            <form onSubmit={handleSubmit}> {/* Add form element */}
              <textarea
                rows={1}
                placeholder="Send a message..."
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button type="submit"> {/* Change to submit button */}
                <img src="svg/enter.svg" alt="" className="fn__svg" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatInput;
