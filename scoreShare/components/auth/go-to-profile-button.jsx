"use client";
import Link from 'next/link';
import React from 'react'


export const GoToProfileButton = ({children}) => {

  return (
    <Link href={"/profile"}>
        {children}
    </Link>
  )
}
