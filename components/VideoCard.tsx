import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { GoVerified } from 'react-icons/go'

interface IProps {
  post: Video
}

//this is kinda confusing. See JSM video @1:30:00 for more info
// we could also just do VideoCard = ({ post }: IProps) => {.... as seen in the NoResults component.
//our VideoCard is of a type 'NextPage'
//<IProps> is a prop and is passed to the component
const VideoCard: NextPage<IProps> = ({ post }) => {

  const [isHover, setIsHover] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // we need useRef to be able to play the video. For buttons to do something, we need to change the state of the video (play/pause onClick). The videoRef is attached to the html video element, and thats what has the pause/play properties. We need this or TypeScript would complain with our 'videoRef?.current?.pause()' on the 'pause' part. 
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if(isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              {/* we cant put an image as a child component of a Link, so we need to use a React fragment */}
              <>
                <Image 
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={post.postedBy?.image}
                  alt='profile photo'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            {/* Username */}
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName}                  
                  {` `} {/* {``} is a blank space */}
                  <GoVerified className='text-blue-400 text-md' />
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Video */}
      <div className='lg:ml-20 flex gap-4 relative'>
        <div 
          className='rounded-3xl'
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video 
              ref={videoRef}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
              src={post.video.asset.url}
              loop
              
            >
            </video>
          </Link>

          {/* Play/Pause button. Shows if hovered. Hides if not. */}
          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-13 lg:left-0 flex gap-12 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-4'>
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-2xl text-black lg:text-4xl' />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp className='text-2xl text-black lg:text-4xl' />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default VideoCard