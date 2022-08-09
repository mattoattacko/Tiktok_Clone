import React, { useState, useEffect } from 'react'
import Image from 'next/image' //optimized image component
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils' 

import useAuthStore from '../store/authStore'

// import Logo from '../utils/tiktik-logo.png'
import Logo2 from '../utils/petroltok2.png'


const Navbar = () => {

  const { userProfile, addUser, removeUser } = useAuthStore()
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  // once a user clicks search, we will get an event.
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    // if a search value exists, we use router.push to go to a different page.
    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4" >
      <Link href='/'>
        <div className="w-[100px] md:w-[130px]">
          <Image 
            className="cursor-pointer"
            src={Logo2} 
            alt='TikTik' 
            layout='responsive' 
          />
        </div>        
      </Link>

      <div className='relative hidden md:block'>
        <form 
          className='absolute md:static top-10 -left-20 bg-white'
          onSubmit={handleSearch}
        >
          <input 
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} //e is the keypress event
            placeholder='Search accounts and videos'
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded full md:top-0 '
          />
          <button 
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
            onClick={handleSearch}  
          >
            <BiSearch  />
          </button>
        </form>
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
            {userProfile?.image && (
              <Link href='/'>             
                <>  {/* we cant put an image as a child component of a Link, so we need to use a React fragment */}
                  <Image 
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={userProfile?.image}
                    alt='profile photo'    
                    title={userProfile?.userName}    
                  />
                </>
            </Link>
            )}
            <button               
              className='px-2 hover:opacity-50'
              type='button'
              onClick={() => {
                googleLogout();
                removeUser();          
              }}
            >
              <AiOutlineLogout color='red' fontSize={33} title='Logout' />
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