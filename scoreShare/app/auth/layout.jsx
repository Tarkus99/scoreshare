import Image from 'next/image';
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
      <>
        <Image
          src="/back7.svg"
          height={1080}
          width={1920}
          alt="background"
          className="fixed bottom-0 right-0 min-h-[100%] min-w-[100%] object-fill -z-10"
        />
        <div className="flex items-center justify-center min-h-full py-1 auth-page">
          {children}
        </div>
      </>
    );
}

export default AuthLayout;
