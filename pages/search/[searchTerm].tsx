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
  const { searchTerm }: any = router.query;

  //we need all users from our store to use in our account search
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200"> {/* this is the gray dividing lines b/t account names */}
                  <div>
                    <Image
                      src={user.image}
                      alt="user profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>

                  {/* User Name */}
                  <div className="hidden xl:block">
                    {/* 'xl:block' will make sure the user images show on smaller screens */}
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(" ", "")}
                      {/* reaplaceAll(' ', '') will replace spaces with no space */}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {/* loop over videos if they exist */}
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No results for ${searchTerm}`} />
          )}
        </div>
      )}
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

export default Search;
