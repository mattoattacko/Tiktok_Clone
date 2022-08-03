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


const Search = () => {
  return (
    <div>
      
    </div>
  )
}

//props form our backend api
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { data: res.data },
  };
};

export default Search