import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <>
            <div className="flex items-center justify-center min-h-full py-1 auth-page">
                {children}
            </div>
        </>
        
    )
}

export default AuthLayout;
