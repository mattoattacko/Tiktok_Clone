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
                  src={post.postedBy.image}
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
                  <p>{post.postedBy.userName}</p>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard