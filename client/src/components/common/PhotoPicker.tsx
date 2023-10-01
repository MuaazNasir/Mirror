"use client"
import React from "react";


function PhotoPicker({ onChange }: any) {


  return (
    <>
    <input type="file" name="" id="photo-picker" hidden onChange={onChange} accept=".png,.jpg,.webp,.avif"/>
    </>
    
  )

}

export default PhotoPicker;
