import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router' //will allow us to reroute to the Home page after we upload a new post
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { SanityAssetDocument } from '@sanity/client' //we need this to be able to set the type for the asset state (for videoAsset/setVideoAsset).
import { client } from '../utils/client' //sanity client
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'
import useAuthStore from '../store/authStore'
import axios from 'axios'

const Upload = () => {

  const router = useRouter() 
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>() //starts as undefined
  const [wrongFileType, setWrongFileType] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0].name) //default category is the first one in the topics array
  const [savingPost, setSavingPost] = useState(false) //are we currently saving the post?

  //we need to get the user from zustand
  //need to set TS to user type of any else TS will complain
  const { userProfile }: {userProfile: any} = useAuthStore()
  


  // we need to work with the 'event' to extract the file they are uploading
  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0] //this is where the video is stored
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mpeg'] //this is where we specify the file type

    //check if file type matches. First we check if the user has uploaded the video in the correct file type. If not, we display an error message. If they have, we upload the video to the Sanity API
    //the third thing we pass in is an options object which allows us to specify the filename of the video
    //if we are successful, we call a .then method with a cb that gives us the data back
    if (fileTypes.includes(selectedFile?.type)) {
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

  //this is the function that will be called when the user clicks the 'save post' button
  //if the caption, videoAsset, and category exist, we will call the API to save the post.
  //we need to pass the 'document' to Sanity so that it gets saved to the database
  //we refer to the video asset (_ref) and merge it with the _type: post.
  const handlePost = async () => {
    if(caption && videoAsset?._id && category) {
      setSavingPost(true)

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id
          }
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id
        },
        topic: category
      }

      //we need to send the document over to our backend route
      await axios.post(`${BASE_URL}/api/post`, document)

      //we need to reroute to the home page
      router.push('/')
    } 
  }

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6 w-[60%] '>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>

          {/* Upload Videos */}
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[500px] p-5 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              // if we are not loading, we have 2 different states. First state is when we didnt upload the file, the second is when we did.
              <div>
                {videoAsset ? (
                  <div>
                    <video 
                      src={videoAsset.url}
                      className='rounded-xl h-[450px] mt-3 mb-2 bg-black'
                      controls
                      loop                      
                    >
                    </video>
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
            {/* check if wrong file type is uploaded */}
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                incorrect file type :(
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium'>
            Caption
          </label>
          <input 
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)} //store the value of the key press
            className='rounded outline-none text-md border-2 border-gray-200 p-2'
          />
          <label className='text-md font-medium'>
            Choose a Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='rounded outline-none text-md border-2 border-gray-200 lg:p-4 p-2 cursor-pointer capitalize'
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className='outline-none text-md capitalize bg-white text-gray-700 p-2 hover:bg-slate-300'
              >
                {topic.name}
              </option>
            ))}
          </select>

          {/* Button Container */}
          <div className='flex gap-6 mt-10'>
            <button
              onClick={() => {}}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>            
            <button
              onClick={handlePost}
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload