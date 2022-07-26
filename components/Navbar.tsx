import React, { useState } from 'react'
import Image from 'next/image' //optimized image component
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils' 

import useAuthStore from '../store/authStore'

import Logo from '../utils/tiktik-logo.png'


const Navbar = () => {

  const { userProfile, addUser, removeUser } = useAuthStore()

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4" >
      <Link href='/'>
        <div className="w-[100px] md:w-[130px]">
          <Image 
            className="cursor-pointer"
            src={Logo} 
            alt='TikTik' 
            layout='responsive' 
          />
        </div>        
      </Link>

      <div>
        Search
      </div>

      <div>
        {/* Check if there is a user logged in */}
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href='/upload'>
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className='text-xl' /> 
                { ` ` }
                <span className='hidden md:block'>
                  Upload
                </span>
              </button>
            </Link>

            {/* Check if user image exists */}
            {userProfile.image && (
              <Link href='/'>
              {/* we cant put an image as a child component of a Link, so we need to use a React fragment */}
                <>
                  <Image 
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={userProfile?.image}
                    alt='profile photo'        
                  />
                </>
            </Link>
            )}
            <button 
              className='px-2'
              type='button'
              onClick={() => {
                googleLogout();
                removeUser();          
              }}
            >
              <AiOutlineLogout color='red' fontSize={35} />
            </button>
          </div>
        ) : (
          <GoogleLogin 
            onSuccess={(response) => createOrGetUser(response, addUser)} 
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar