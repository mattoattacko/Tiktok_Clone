import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
//needed to check if user already liked video
import useAuthStore from '../store/authStore'

//need to declare interface because of TS.
//'void' if it doesn't return anything.
interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}


const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {

  const [alreadyLiked, setAlreadyLiked] = useState(false)  
  const { userProfile }: any = useAuthStore() //instantiate our user
  const filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id) //checks the likes array to filter the likes to see if the user has already liked the video

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true) //if the user has already liked the video, set alreadyLiked to true
    } else {
      setAlreadyLiked(false)
    }
  }, [filterLikes, likes]) //this is a hook that runs when the likes changes.


  return (
    <div className="flex gap-6">
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {/* if already liked, return a <div>. If not,  */}
        {alreadyLiked ? (
          <div 
            className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]'
            onClick={handleDislike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div 
            className='bg-primary rounded-full p-2 md:p-4'
            onClick={handleLike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}

        <p className='text-md font-semibold'>
          {likes?.length || 0}
        </p>

      </div>
    </div>
  )
}

export default LikeButton