//where we create the template structure for our files and folders
//a component is a specific page that we can render in our app. Some of them need to be shared across multiple pages (eg: Navbar)
//92vh is 92% of the height of the screen

import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }: AppProps) => {

  const [isSSR, setIsSSR] = useState(true)

  //if we make it to the useEffect, that means our code is being executed inside of React, which is client side. So we setIsSSR to false because its not server side.
  useEffect(() => {
    setIsSSR(false)
  }, [])

  if(isSSR) return null;//if we are server side rendering, then we don't want to show our components. 

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Navbar />
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar />
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
      
    </GoogleOAuthProvider>
  )
}

export default MyApp
