import React from 'react'

export const TutorialItem = ({children}) => {
  return (
    <li className="p-1 list-inside rounded md:p-2 bg-cyan-800/40">
      <div className="p-1 font-thin md:p-2 ">
       {children}
      </div>
    </li>
  );
}
