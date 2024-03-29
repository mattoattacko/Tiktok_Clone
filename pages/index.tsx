//'getServerSideProps' is how we fetch data in NextJS. 'gSSP' is used instead of 'getStaticProps' because we need the data to be fetched before the page is rendered.
//we need to fetch new videos every time we load the page.
//'getServerSideProps' is used when we need authorization.
//if we dont need to render the data during the request, we should consider fetching data on the client side or with 'getStaticProps'.

import React from 'react'
import axios from 'axios'
import NoResults from '../components/NoResults'
import VideoCard from '../components/VideoCard'
import { Video } from '../types'
import { BASE_URL } from '../utils'

//for TS, whenever we accept some props inside of our NextJS page, we need to create an 'interface'. It's like an object with it's own name. It accepts only one thing here, our videos.
interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {/* For each video, we return a VideoCard component. If we dont have a video, we return the NoResults component */}
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id}/>
        ))
      ) : (
        <NoResults text={'No Results'} />
      )}
    </div>
  )
}

//using getServerSideProps, we gain access to the users search parameters
export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string }
}) => {
  let response = null;

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {
    response = await axios.get(`${BASE_URL}/api/post`)
  }

  return {
    // whatever we pass inside the props object will automatically be populated inside of real props in Home 
    props: {
      videos: response.data
    }
  }
}

export default Home
