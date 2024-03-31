'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import '@/styles/globals.css';
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
const router = useRouter()
return (
  <div className="bg-gradient-to-b from-[#dbf4ff] to-[#fff1f1] min-h-screen flex flex-col justify-between">
    <header className="bg-white border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="font-bold text-2xl text-blue-700">
              <h1 className="cursor-pointer">Pixel Speak</h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-700 text-white py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <Link href="/login" className="cursor-pointer">
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main className="flex-grow flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8">
        <div
          style={{
            backgroundImage: "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome to pixelSpeak: Where Images Engage in Conversations
        </div>
      </h1>
      <button
        onClick={() => router.push('/register')}
        className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
      >
        Upload Image
      </button>
    </main>

    <footer className="bg-white border-t border-gray-200 dark:border-gray-600">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center flex-wrap">
        <p className="text-gray-400 text-sm mr-4">&copy; 2024 Yashwanth Sai Ch</p>
        <Link href="https://github.com/Yasshu55" className="mr-4">
          <Image width="24" height="24" src="https://img.icons8.com/material-rounded/24/github.png" alt="github"/>
        </Link>
        <Link href="https://www.linkedin.com/in/yasshu/" className="mr-4">
          <Image width="24" height="24" src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="linkedin"/>
        </Link>
        <Link href="https://twitter.com/Yasshu55">
          <Image width="24" height="24" src="https://img.icons8.com/ios/50/x.png" alt="x"/>
        </Link>
      </div>
    </footer>
  </div>
);
}

export default HomePage;