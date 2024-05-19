import React from 'react'
import { LoadingTriangles } from '../misc/loading-triangles';
import { RiDeleteBack2Line } from "react-icons/ri";

export const LoadingAndClearButtons = ({loading, handleClear, showClear = true}) => {
  return (
    <div className="absolute inset-y-0 z-10 flex items-center right-5">
      {loading ? (
        <LoadingTriangles height={40} />
      ) : (
        showClear && (
          <div
            className="transition-all cursor-pointer hover:text-red-500"
            onClick={() => handleClear()}
          >
            <RiDeleteBack2Line />
          </div>
        )
      )}
    </div>
  );
}
