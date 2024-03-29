import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

// the name of the param in gSSP() is the same as the name of what we have in the [] square brackets
// we also need to define the params, so we say 'id: string'
// then we fetch the user profile via 'const res = ...'
// then we check if the endpoint exists in our api
const Profile = ({ data }: IProps) => {

  const [showUserVideos, setShowUserVideos] = useState(true)
  const { user, userVideos, userLikedVideos } = data;
  const [videosList, setVideosList] = useState<Video[]>([])

  // if showUserVideos is true, then show the user's videos.
  // needed to show which tab is underlined. Liked or Videos.
  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

  // if the user has videos, then show them. 
  // this is how we show either Videos or Liked videos
  useEffect(() => {
    if(showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10  bg-white w-full"> 
        <div className="w-16 h-16 md:w-20 md:h-20">
          <Image
            src={user.image}
            alt="user profile"
            width={120}
            height={120}
            className="rounded-full"
            layout="responsive"
          />
        </div>

        {/* User Name */}
        <div className="flex flex-col">
          {/* 'xl:block' will make sure the user images show on smaller screens */}
          <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}{" "}
            {/* reaplaceAll(' ', '') will replace spaces with no space */}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize md:text-xl text-gray-400 text-xs">{user.userName}</p>
        </div>
      </div>

      {/* Videos & Liked Tabs */}
      {/* Underlines which tab we are currently viewing */}
      <div className='flex gap-10 mb-10 mt-1 border-b-2 border-gray-200 bg-white w-full'>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={()=> setShowUserVideos(true)}>
          Videos
        </p>        
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={()=> setShowUserVideos(false)}>
          Liked
        </p>
      </div>

      <div className='flex gap-6 flex-wrap md:justify-start'>
        {/* loop over video list based on which the user wants to see. Liked vs Videos. If the videos do exist, map over them */}
        {videosList.length > 0 ? (
          videosList.map((post: Video, idx: number) => (
            <VideoCard post={post} key={idx} />
          ))
        ) : <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`} />}
      </div>
    </div>
  );
};

//props form our backend api
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
