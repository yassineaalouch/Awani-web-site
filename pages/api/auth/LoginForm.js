import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import NavBarInterface from '@/interfaceComponents/Nav-bar-interface';
import Footer from '@/interfaceComponents/Footer';
import Loginform from '@/components/loginform';

export default function LoginForm({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
      <Loginform/>
      </>
    );
  }else{
  router.push('/')
  }
  
}

