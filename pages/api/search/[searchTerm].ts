// our searchTerm endpoint
//we make a call to Sanity from our api request
import type { NextApiRequest, NextApiResponse } from 'next'

import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

// nextJS api handler
export default async function handler( req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'GET') {

    // we get the data from the request
    const { searchTerm } = req.query;

    const videosQuery = searchPostsQuery(searchTerm); //this will look into the 'searchPostsQuery' in 'queries.ts' where we are passing the searchTerm and match all of the videos that match it before returning them here.

    const videos = await client.fetch(videosQuery); //this will fetch the videos from the Sanity database and return them here.

    res.status(200).json(videos);
  }
}
