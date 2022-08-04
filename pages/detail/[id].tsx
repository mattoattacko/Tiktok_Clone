//url will be dynamic (the [id])
//How do we fetch the data for our 'detail'? We use the 'id' inside of the url. We do that with the 'getServerSideProps' function.
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useAuthStore from '../../store/authStore' //used for checking if user is logged in
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

//what our post details are. We get this from our 'types.d.ts' file.
interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails); //we set the post to the postDetails so that we can manually change the post. eg: with 'likes' in the comments.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); //we use this to reference the video element.
  const router = useRouter(); //need this to be able to return to the home page
  const { userProfile }: any = useAuthStore(); //we need to check if the  user is logged in.
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      // if we have the post, and the post has a valid video selected
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  //if we have a logged in user, we need to display the like button
  //the second parameter is an object of the things we want to send to the server.
  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, { 
        userId: userProfile._id,
        postId: post._id,
        like
      })

      //whenever we set objects, we have to open a new object and spread the previous state of the post. Then we select the property we want to change and set it to the new value.
      setPost({ ...post, likes: data.likes })
    }
  }

  // ~~~ Comments ~~~ //
  const addComment = async (e) => {
    e.preventDefault()

    if(userProfile && comment) {
      setIsPostingComment(true)
      
      //We want to get the response. We use a PUT request because we are adding something to do the document. We need to know on which video are we posting the comment. Second parameter contains the object with the userId and the actual comment itself.
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment //the comment is coming from the input, so we need to pass those states down into our <Comments /> component
      })

      setPost({ ...post, comments: data.comments })
      setComment('') //clear input field
      setIsPostingComment(false) //reset the state since we are not posting anymore
    }
  }

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        {/* can blur the background instead of using just 'bg-black' with '...bg-blurred-img bg-no-repeat bg-cover bg-center'  */}
        <div className="absolute top-2 left-2 lg:left-6 flex gap-6 z-50">
          {/* this <p> onClick takes us back to home */}
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px] hover:text-[#807d7d]" />
          </p>
        </div>

        {/* Video */}
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoClick}
              // controls
            ></video>
          </div>

          {/* Playing the video needs state to work (isPlaying or isntPlaying) */}
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        {/* Mute */}
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-2xl text-white lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      {/* Right Side Details (comments) */}
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
                {/* we cant put an image as a child component of a Link, so we need to use a React fragment */}
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy?.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              {/* Username */}
              <Link href="/">
                <div className="flex flex-col gap-2 mt-3">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                    {` `} {/* {``} is a blank space */}
                    <GoVerified className="text-blue-400 text-md" />
                    <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                      {post.postedBy.userName}
                    </p>
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Post */}
          <p className="px-10 text-lg text-gray-600">
            {post.caption}
          </p>

          {/* Comments */}
          <div className='mt-10 px-10'>
            {/* Can only like if user is logged in */}
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments 
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data }, //this return is how we retrieve our posts.
  };
};

export default Detail;
