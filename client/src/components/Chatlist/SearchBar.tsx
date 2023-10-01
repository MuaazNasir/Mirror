import React from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { BiSearchAlt2, BiFilter } from 'react-icons/bi'

type props = {
  type: 'recentChat' | 'addContact',
  value: string,
  setValue: any,
  btnClick ? : any,
}


function SearchBar({ type, value, setValue , btnClick}: props) {
  return (
    <>
      <div className="bg-search-input-container-background flex h-14 py-3 pl-5 items-center gap-3">
        <div className="bg-panel-header-background gap-4 flex items-center px-3 py-2 w-full rounded-md">
          <BiSearchAlt2 className="text-panel-header-icon text-xl " />
          <input
            type="text"
            placeholder={type == "recentChat" ? "enter name / start a new chat" : "Add a Contact"}
            className="text-white placeholder:text-gray-400 placeholder:capitalize text-start bg-transparent w-full outline-none focus:placeholder:text-panel-header-icon"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        </div>
        <div className="py-2 pr-3 text-xl flex items-center text-white cursor-pointer">
          {
            type == "recentChat" ?
              <BiFilter />
              : <RiUserSearchLine onClick={btnClick}/>
          }
        </div>
      </div>
    </>
  );
}

export default SearchBar;
