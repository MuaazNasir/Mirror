"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Loading from '../common/Loading'

type Props = {
  public_id: string
}

const ImageMessage = ({ public_id }: Props) => {

  const [showImg, setShowImg] = useState(false);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const publicId = public_id;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;

  const downloadImage = async (
    imageSrc: string,
    nameOfDownload = 'my-image.png',
  ) => {
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }



  return (
    <>
      <Image src={imageUrl} alt='' height={200} width={200} className='my-3 mx-2 rounded-sm cursor-pointer' placeholder='blur' blurDataURL='/loading.gif' onClick={() => setShowImg(true)} />

      {showImg && <div className="fixed top-0 right-0 w-full h-full flex flex-col items-center justify-center bg-gray-500 z-10 bg-opacity-70 backdrop-blur-lg gap-10 transition-all">
        <div className="">
          <Image alt='' src={imageUrl} width={350} height={350} placeholder='blur' blurDataURL='/rocket.gif'></Image>
        </div>
        <div className="flex flex-row items-center justify-between gap-3">
          <button className='bg-gray-400 p-4 rounded-lg text-md font-sans font-semibold '
            onClick={() => {
              downloadImage(imageUrl)
            }}
          >Download</button>
          <button className='bg-gray-400 p-4 rounded-lg text-md font-sans font-semibold '
            onClick={() => setShowImg(false)}
          >Close</button>
        </div>
      </div>}
    </>
  )
}

export default ImageMessage