"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {  FaSpotify } from "react-icons/fa"
import { Button } from '../ui/button';
import {signIn} from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
export const Social = ({loading, setLoading}) => {
    const onClick = async (provider) => {
        await signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }
    return (
      <div className="flex items-end w-full gap-x-1">
        <Button
          disabled={loading}
          variant="outline"
          className="w-full"
          onClick={() => {
            setLoading(true)
            onClick("google")}}
        >
          <FcGoogle className="w-5 h-5" />
        </Button>
        <Button
          disabled={loading}
          variant="outline"
          className="w-full"
          onClick={() => {
            setLoading(true)
            onClick("spotify")}}
        >
          <FaSpotify className="w-5 h-5" />
        </Button>
      </div>
    );
}
