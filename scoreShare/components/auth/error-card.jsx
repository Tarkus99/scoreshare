
import React from 'react'
import { CardWrapper } from './card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className='flex justify-center gap-2'>
                <ExclamationTriangleIcon className='text-destructive' height={"3rem"} width={"3rem"}/>
            </div>
       </CardWrapper>
    )
}
