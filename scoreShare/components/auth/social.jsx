"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpotify } from "react-icons/fa"
import { Button } from '../ui/button';
import {signIn} from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
export const Social = () => {
    const onClick = (provider) => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
            redirect:'/'
        })
    }
    return (
        <div className='flex items-end w-full gap-x-1'>
            <Button variant='outline' className="w-full"
                onClick={() => onClick("google")}
            >
                <FcGoogle className='w-5 h-5' />
            </Button>
            <Button variant='outline' className="w-full"
                onClick={() => onClick("spotify")}
            >
                <FaSpotify className='w-5 h-5' />
            </Button>
        </div>
    );
}
