//we make a call to Sanity from our api request
import type { NextApiRequest, NextApiResponse } from 'next'

import { topicPostsQuery } from '../../../utils/queries'
import { client } from '../../../utils/client';

// nextJS api handler
export default async function handler( req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'GET') {

    const { topic } = req.query;
      
    // we get the data from the request
    const videosQuery = topicPostsQuery(topic)
  
    //get the actual videos
    const videos = await client.fetch(videosQuery)

    //send the videos back to the client/component
    res.status(200).json(videos)
    }
}
