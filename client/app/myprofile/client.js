'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function MyProfile() {
    const router = useRouter()
    const[userName,setUserName] = useState("");
    const[image,setimage] = useState("");
    useEffect(() =>{
        const token = localStorage.getItem('auth-token');
        if(!token){
          router.push('/login')
        }
        
        getProfileInfo();
    },[])

    const getProfileInfo = async () =>{
        try {
            console.log("Entered");
            const res = await fetch(`http://localhost:8000/api/profile`,{
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
    
    return (
    <div className="my-profile">
        <h1>My Profile</h1>
        <p>User Name : {userName}</p>
    </div>
  )
}

export default MyProfile