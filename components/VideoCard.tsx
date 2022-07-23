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
          <div>
            <Link>
              {/* we cant put an image as a child component of a Link, so we need to use a React fragment */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard