import React from 'react'

export const TutorialItem = ({children}) => {
  return (
    <li className="p-2 list-inside rounded bg-cyan-800/40">
      <div className="p-2 font-thin ">
       {children}
      </div>
    </li>
  );
}
