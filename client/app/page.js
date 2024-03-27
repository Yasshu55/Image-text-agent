'use client'
import React from 'react';
import { useRouter } from 'next/navigation'

const HomePage = () => {
const router = useRouter()

  return <div>
  <button onClick={() => router.push('/login')}>Login</button>
  <button onClick={() => router.push('/register')}>Sign Up</button>
  </div>;
};

export default HomePage;