'use client';
import React, { useEffect, useState } from 'react';

function Conversation(props) {
  const contextString = props.contextOfImage.join(' ');
  const [userAllMessages, setUserAllMessages] = useState([{ type: 'user', message: '' }]);
  const [agentAllMessages, setAgentAllMessages] = useState([{ type: 'agent', message: '' }]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setUserAllMessages([]);
    setAgentAllMessages([]);
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
      setUserAllMessages(prevState => [...prevState, { type: 'user', message: question }]);
      setAgentAllMessages(prevState => [...prevState, { type: 'agent', message: data.answer.answer }]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div>
      <p>{typeof props.message === 'object' ? JSON.stringify(props.message) : props.message}</p>
      <p>{typeof props.contextOfImage === 'object' ? JSON.stringify(props.contextOfImage) : contextString}</p>

      <div className="messages">
        {userAllMessages
          .filter((message) => message.message !== '')
          .map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.message}
            </div>
          ))}

        {agentAllMessages
          .filter((message) => message.message !== '')
          .map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.message}
            </div>
          ))}
      </div>

      <form onSubmit={submitHandler} className="chat-input">
        <input type="text" value={question} onChange={handleInputChange} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Conversation;