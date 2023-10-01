import React from "react";


type props = {
  name: string,
  state: string,
  setState: any,
  label: boolean
}

function Input({ name, state, setState, label = false }: props) {


  return (
    <>
      <div className="flex flex-col items-start justify-start space-y-2">
        {
          label && (
            <label htmlFor={name} className="text-white text-lg font-sans font-bold capitalize">
              {name}
            </label>
          )
        }
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="bg-input-background p-3 h-10 outline-none rounded-lg text-start text-white"
          name={name}
        />
      </div>
    </>
  );
}

export default Input;
