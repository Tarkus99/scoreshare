
import React from 'react'
import { WelcomeTitle } from './welcome-title'
import { TutorialBanner } from './tutorial-banner'

export const DashboardParent = () => {
  return (
    <div className='w-full p-2 space-y-2 md:p-4 rounded-b-2'>
        <WelcomeTitle/>
        <TutorialBanner/>
    </div>
  )
}