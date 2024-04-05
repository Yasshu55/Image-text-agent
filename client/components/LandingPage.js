import React from 'react'
import { useRouter } from 'next/navigation'
import { ReactTyped } from "react-typed";

export default function LandingPage() {
    const router = useRouter()
  return (
    <div className='text-white'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00df9a] font-bold p-2 md:text-7xl sm:text-6xl text-2xl md:py-6'>PixelSpeak : <ReactTyped strings={[" Where Images Engage in Conversations"]} typeSpeed={40} /> </p>
            
            <div>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={() => router.push('/register')}>
                    Upload Image
                </button>
            </div>
        </div>
        
    {/* <br /> */}
    {/* <ReactTyped
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['Get Context', 'Chat with Bot', 'Save the convos :)']}
            typeSpeed={120}
            backSpeed={140}
            loop
          /> */}


    </div>
  )
}
