//'getServerSideProps' is how we fetch data in NextJS. 'gSSP' is used instead of 'getStaticProps' because we need the data to be fetched before the page is rendered.
//we need to fetch new videos every time we load the page.
//'getServerSideProps' is used when we need authorization.
//if we dont need to render the data during the request, we should consider fetching data on the client side or with 'getStaticProps'.

import type { NextPage } from 'next'
import axios from 'axios'

//for TS, whenever we accept some props inside of our NextJS page, we need to create an 'interface'. It's like an object with it's own name. It accepts only one thing here, our videos.

const Home: NextPage = ({ videos }) => {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`)

  return {
    // whatever we pass inside the props object will automatically be populated inside of real props in Home 
    props: {
      videos: data
    }
  }
}

export default Home
