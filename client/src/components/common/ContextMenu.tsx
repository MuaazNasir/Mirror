"use client"

import React, { useEffect, useRef } from "react";

type props = {
  contextMenu: boolean,
  setContextMenu: any,
  options: { title: string, callback: any }[],
  cordinates: { x: number, y: number }
}

function ContextMenu({ contextMenu, setContextMenu, options, cordinates }: props) {

  const handleClick = (e: any, callback: any) => {
    e.stopPropagation();
    setContextMenu(false);
    callback()
  }

  const ContextMenuRef: any = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (e.target.id != 'context-menu-id') {
        if (
          ContextMenuRef.current && !ContextMenuRef.current.contains(e.target)
        ) {
          setContextMenu(false);
        }
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [])


  return (
    <div className={`bg-dropdown-background fixed transition-all z-20 p-2 rounded-lg shadow-2xl shadow-gray-700 select-none`}
      style={{
        top: cordinates.y,
        left: cordinates.x,
      }}
      ref={ContextMenuRef}
    >
      <ul className="flex flex-col items-start justify-center space-y-1">

        {
          options.map(({ title, callback }, i) => (
            <li className="hover:bg-dropdown-background-hover text-xl text-white p-2 rounded-lg w-full capitalize transition-all"
              onClick={(e) => handleClick(e, callback)}
            >
              {title}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ContextMenu;
