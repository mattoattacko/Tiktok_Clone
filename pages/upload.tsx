import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router' //will allow us to reroute to the Home page after we upload a new post
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

import useAuthStore from '../store/authStore'
import { client } from '../utils/client' //sanity client

const Upload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState()

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
                      <p>
                        MP4 WebM ogg
                      </p>
                    </div>
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