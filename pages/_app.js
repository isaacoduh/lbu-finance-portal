import React from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  // Add Navbar to all pages
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;