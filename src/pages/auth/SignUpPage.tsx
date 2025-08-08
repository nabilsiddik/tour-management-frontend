'use client'
import Logo from '@/assets/icons/Logo';
import LogoIcon from '@/assets/icons/LogoIcon';
import SignUpForm from '@/components/forms/SignUpForm';
import React from 'react';
import { Link } from 'react-router-dom';


const GoogleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Main Component
const SignUpPage: React.FC = () => {

  const backgroundStyle = {
    backgroundImage: 'url("https://images.pexels.com/photos/33310503/pexels-photo-33310503.jpeg?_gl=1*6u3bae*_ga*MTAzNTIxMjQyMi4xNzU0NTk4ODg5*_ga_8JE65Q40S6*czE3NTQ1OTg4ODgkbzEkZzEkdDE3NTQ1OTkyNzAkajQ3JGwwJGgw)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };


  return (
    <div className="bg-white dark:bg-black flex">
      {/* Left side - Image/Branding */}
      <div style={backgroundStyle} className="hidden lg:flex lg:w-1/2 bg-gradient-to-br relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <div>
            <Logo />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Secure Access</h1>
          <p className="text-xl text-center text-white/90 max-w-md">
            Crate an account in Tour Hobe and book your best tour ever.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 opacity-60">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/40 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex justify-center p-8 h-[100vh] overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className='flex justify-center mb-3'>
              <LogoIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign Up</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Create your account now</p>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
              <GoogleIcon />
              <span className="ml-3">Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
              <TwitterIcon />
              <span className="ml-3">Continue with Twitter</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-400">Or Create Credential Account</span>
            </div>
          </div>

          {/* Signup form  */}
          <SignUpForm/>

          {/* Footer */}
          <div className="text-center pb-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to='/login' className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
