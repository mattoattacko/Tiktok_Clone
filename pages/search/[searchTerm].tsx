// searchTerm in [] square brackets just means that we are passing in a paramter. Here that would be whatever the user typed in the search bar, which will come up as the url end point. like /posts/animals.
//we are gonna fetch all the videos/profiles that match the search term

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { useRouter } from "next/router";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";

//getServerSideProps will populate our props here
const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);

  const router = useRouter(); //we need this to show the search term if <NoResults /> is rendered
  const { searchTerm } = router.query;

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {/* Accounts or Videos tab underline */}
      {isAccounts ? (
        <div>
          Accounts
        </div>
      ) : 
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {/* loop over videos if they exist */}
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : 
            <NoResults text={`No results for ${searchTerm}`} />
          }
        </div>
      }
    </div>
  );
};

//props form our backend api
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search