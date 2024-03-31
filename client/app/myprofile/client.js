'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/globals.css';

function MyProfile() {
    const router = useRouter()
    const[userName,setUserName] = useState("");
    const[image,setimage] = useState("");
    const[show,setShow] = useState(false)
    const [conversation, setConversation] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() =>{
        const token = localStorage.getItem('auth-token');
        if(!token){
          router.push('/login')
        }
        
        getProfileInfo();
        getPrevConvoInfo();
    },[router])

    const getProfileInfo = async () =>{
        try {
            console.log("Entered");
            const res = await fetch(`https://pixelspeak.onrender.com/api/profile`,{
                method : "POST",
                headers: {
                'Authorization': `Bearer  ${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
                },                
            })
        if(!res.ok) throw new Error('Could not retrieve profile info')

            const data = await res.json();
            console.log(data);
            setUserName(data.userName)    
    
        } catch (error) {
            console.log("Error at getProfileInfo : ", error);
        }
    }

    const getPrevConvoInfo = async () =>{
        try {
            console.log("Entered getPrevConvoInfo");
            const res = await fetch(`https://pixelspeak.onrender.com/api/getPreviousConversations`,{
                'method' : 'POST',
                headers:{
                    'Authorization': `Bearer  ${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            })
            if(!res.ok){
                throw  new Error('Server response was not ok');
            }
            const convos = await res.json();
            console.log("covos :  ", convos);
            setConversation(convos);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (index) => {
        setSelectedConversation(conversation[index]);
    }

    const handleShowOrNot = () =>{
        setShow(!show);
    }
    
    return (
        <div className="bg-gray-800 min-h-screen py-8 px-4">
            <h1 className="text-3xl font-bold text-white mb-4">My Profile</h1>
            <p className="text-lg font-medium text-white mb-4">User Name : {userName}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 " onClick={() => handleShowOrNot()}>
                {conversation.map((convo, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-md shadow-md cursor-pointer" onClick={() => handleClick(index)}>
                        <p className="text-white">{convo.contextOfImage}</p>
                    </div>
                ))}
            </div>

            {selectedConversation && show && (
                <div className="mt-8 bg-gray-700 p-4 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-white mb-4">Selected Conversation</h2>
                    <p className="text-lg font-medium text-white mb-4">Context of Image: {selectedConversation.contextOfImage}</p>
                    <ul>
                        {selectedConversation.conversation.map((messageObj, index) => (
                            <li key={index} className="mb-4">
                                <p className="text-white">Question: {messageObj.question}</p>
                                <p className="text-white">Answer: {messageObj.answer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MyProfile;