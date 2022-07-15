import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { topics } from '../utils/constants'

const Discover = () => {

  // we use the router to get the data/info from the url. This will allow us to know if the topic has been clicked on and should be set to 'activeTopicStyle'
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]'

  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black'

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {/* loop through our topics. If user clicks on an icon they will be taken to the corresponding page */}
        { topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}> 
              {/* if we are currently on the item that the url topic is equal to, then show that style */}
              <span className='font-bold text-2xl xl:text-md'>
                {item.icon}
              </span>
              <span className='font-medium text-md hidden xl:block capitalize'>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover