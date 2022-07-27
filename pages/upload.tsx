import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router' //will allow us to reroute to the Home page after we upload a new post
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client' //we need this to be able to set the type for the asset state (for videoAsset/setVideoAsset).

import useAuthStore from '../store/authStore'
import { client } from '../utils/client' //sanity client

const Upload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>() //starts as undefined
  const [wrongFileType, setWrongFileType] = useState(false)

  // we need to work with the 'event' to extract the file they are uploading
  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0] //this is where the video is stored
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'] //this is where we specify the file type

    //check if file type matches. First we check if the user has uploaded the video in the correct file type. If not, we display an error message. If they have, we upload the video to the Sanity API
    //the third thing we pass in is an options object which allows us to specify the filename of the video
    //if we are successful, we call a .then method with a cb that gives us the data back
    if (fileTypes.includes(selectedFile.type)) {
      client.assets.upload('file', selectedFile, {
        filename: selectedFile.name,
        contentType: selectedFile.type
      })
      .then((data) => {
        setVideoAsset(data)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }

  }

  return (
    <div className="flex w-full h-full">
      <div className='bg-white rounded-lg'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>

          {/* Upload Videos */}
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              // if we are not loading, we have 2 different states. First state is when we didnt upload the file, the second is when we did.
              <div>
                {videoAsset ? (
                  <div>

                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-6xl text-gray-300' />
                        </p>
                        <p className='text-xl font-semibold'>
                          Upload Video
                        </p>
                      </div>
                      <p className='text-sm text-gray-400 text-center mt-7 leading-5'>
                        .mp4, .webm, or .ogg <br />
                        720x1280 or higher <br />
                        Up to 10 Minutes <br />
                        Less than 2GB
                      </p>
                      <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select File
                      </p>
                    </div>
                    <input 
                      type='file'
                      name='upload-video'
                      className='w-0 h-0'
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload