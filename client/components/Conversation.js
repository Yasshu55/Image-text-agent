'use client'
import React, { useEffect, useState } from 'react'

function Conversation(props) {
  const contextString = props.contextOfImage.join(' ');
  const [userAllMessages, setUserAllMessages] = useState([{ type: 'user', message: '' }]);
  const [agentAllMessages, setAgentAllMessages] = useState([{ type: 'agent', message: '' }]);
  const[question,setQuestion] = useState("");

  useEffect(() => {
    setUserAllMessages([]);
    setAgentAllMessages([]);
    setQuestion("");
  }, [props.contextOfImage]); // Reset state when contextOfImage changes


  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      console.log("Entered");
      const contextString = props.contextOfImage.join(' ');
          const response = await fetch("http://localhost:8000/api/conversation",{
            method: 'POST',
            headers : {
              'Content-type' : 'application/json'
            }, 
            body:JSON.stringify({
              question : question,
              contextOfImage : contextString
            }),
          })
          console.log("Successfulyy fetched in convo");
          const data =await response.json()
          console.log(data);
          setUserAllMessages(prevstate => [...prevstate,{type:'user',message:question}]);
          setAgentAllMessages(prevstate => [...prevstate,{type:'agent',message:data.answer.answer}])

    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) =>{
    setQuestion(e.target.value)
  }


  return (
    <div>
      <p>{typeof props.message === 'object' ? JSON.stringify(props.message) : props.message}</p>
      <p>{typeof props.contextOfImage === 'object' ? JSON.stringify(props.contextOfImage) : contextString}</p>

        <div className='chatContainer'>
        <div className="messages">
          {/* Render user messages */}
          {userAllMessages
            .filter((message) => message.message !== '')
            .map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.message}
              </div>
            ))}

          {/* Render agent messages */}
          {agentAllMessages
            .filter((message) => message.message !== '')
            .map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.message}
              </div>
            ))}
        </div>
        </div>

        <form onSubmit={submitHandler}>
        <input type="text" value={question} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Conversation