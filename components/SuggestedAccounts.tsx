import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore' //for the fetchAllUsers function
import { IUser } from '../types'

const SuggestedAccounts = () => {

  const { fetchAllUsers, allUsers } = useAuthStore()

  //as soon as SuggestedAccounts loads, we want to fetch all users to immediately get access to the 'allUsers' variable
  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">

      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested Accounts
      </p>

      {allUsers.slice(0,6).map((user: IUser) => (
        // ts only knows about the '_id' property on user if we import IUser from types
        <Link href={`/profile/${user._id}`} key={user._id}> 
          <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer rounded font-semibold'>
            <div className='w-8 h-8'>
              <Image 
                src={user.image} 
                alt='user profile'
                width={34} 
                height={34} 
                className='rounded-full'
                layout='responsive'
              />
            </div>

            {/* User Name */}
            <div className='hidden xl:block'> 
            {/* 'xl:block' will make sure the user images show on smaller screens */}
              <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                {user.userName.replaceAll(' ', '')} {/* reaplaceAll(' ', '') will replace spaces with no space */}            
                <GoVerified className='text-blue-400' />
              </p>
              <p className='capitalize text-gray-400 text-xs'>
                {user.userName}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SuggestedAccounts