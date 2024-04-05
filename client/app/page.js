'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import '@/styles/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import LandingPage from '@/components/LandingPage';

const HomePage = () => {
const router = useRouter()
return (
  <div>
    <header>
      <NavBar />
    </header>

    <main >
        <LandingPage />
    </main>

    {/* <footer className="bg-white border-t border-gray-200 dark:border-gray-600">
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
    </footer> */}
  </div>
);
}

export default HomePage;