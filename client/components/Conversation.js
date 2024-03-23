'use client';
import React, { useEffect, useState } from 'react';

function Conversation(props) {
  const contextString = props.contextOfImage.join(' ');
  const [conversation, setConversation] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setConversation([]);
    setQuestion("");
  }, [props.contextOfImage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/conversation", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          question: question,
          contextOfImage: contextString
        }),
      });

      const data = await response.json();
      setConversation(prevConversation => [...prevConversation, { question, answer: data.answer.answer }]);
      setQuestion("");
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="chat-title">Conversation</h2>
      </div>
      <div className="messages-container">
        <div className="messages">
        <div className="message agent-message">
        <p>{typeof props.message === 'object' ? JSON.stringify(props.message) : props.message}</p>
        </div>
        <div className="message agent-message">
        <p>{typeof props.contextOfImage === 'object' ? JSON.stringify(contextString) : contextString}</p>
        </div>
          {conversation.map((messageObj, index) => (
            <div key={index} className="message-group">
              <div className="message user-message">
                {/* <span className="user-avatar">You - </span> */}
                <p className="message-text">{messageObj.question}</p>
              </div>
              <div className="message agent-message">
                {/* <span className="agent-avatar"></span> */}
                <p className="message-text">{messageObj.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submitHandler} className="chat-input">
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="chat-input-field"
        />
        <button type="submit" className="chat-send-button">
         Send
        </button>
      </form>
    </div>
  );
}

export default Conversation;