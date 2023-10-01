import React from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Image from "next/image";

function PhotoLibrary({ setImage, setShowGallery }: any) {

  const imagesSet = [
    '/avatars/1.png',
    '/avatars/2.png',
    '/avatars/3.png',
    '/avatars/4.png',
    '/avatars/5.png',
    '/avatars/6.png',
    '/avatars/7.png',
    '/avatars/8.png',
    '/avatars/9.png',
  ]

  return (
    <>

      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[70vw] h-[80%] flex flex-col items-center justify-around z-30 bg-gray-900 cursor-default p-5">

        <div className="w-full "
          onClick={() => setShowGallery(false)}
        >
          <AiOutlineCloseCircle className="text-5xl text-start text-white rounded-full hover:text-gray-200 transition-all"

          />
        </div>

        <div className="grid grid-cols-3 gap-10 ">
          {
            imagesSet.map((e, i) => {
              return (
                <>
                  <div className="" onClick={() => {
                    setImage(e);
                    setShowGallery(false);
                  }}>
                    <Image src={e} alt="avatar" height={100} width={100} className="rounded-full \"></Image>
                  </div>
                </>
              )
            })
          }
        </div>

      </div>

    </>
  );
}

export default PhotoLibrary;
