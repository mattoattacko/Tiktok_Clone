//url will be dynamic (the [id])
//How do we fetch the data for our 'detail'? We use the 'id' inside of the url. We do that with the 'getServerSideProps' function.
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

//what our post details are. We get this from our 'types.d.ts' file.
interface IProps {
  postDetails: Video,
}

const Detail = ({ postDetails }: IProps ) => {

  const [post, setPost] = useState(postDetails) //we set the post to the postDetails so that we can manually change the post. eg: with 'likes' in the comments.
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null) //we use this to reference the video element.
  const router = useRouter() //need this to be able to return to the home page

  const onVideoClick = () => {
    if(isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if(post && videoRef?.current) { // if we have the post, and the post has a valid video selected
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])
  
  if(!post) return null;

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
        {/* can blur the background instead of using just 'bg-black' with '...bg-blurred-img bg-no-repeat bg-cover bg-center'  */}
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          {/* this <p> onClick takes us back to home */}
          <p className='cursor-pointer' onClick={() => router.back()}> 
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>          
        </div>

        {/* Video */}
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video 
              src={post.video.asset.url} 
              className='h-full cursor-pointer'             
              ref={videoRef}
              loop
              onClick={onVideoClick}
              // controls
            >
            </video>
          </div>

          {/* Playing the video needs state to work (isPlaying or isntPlaying) */}
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>
        
        {/* Mute */}
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className='text-2xl text-white lg:text-4xl' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id }
} : {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data } //this return is how we retrieve our posts.
  }
}

export default Detail