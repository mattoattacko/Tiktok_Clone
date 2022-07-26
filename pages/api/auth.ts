//we make a call to Sanity from our api request
import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../utils/client';

// nextJS api handler
export default async function handler( req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'POST') {

    // we get the data from the request
    const user = req.body;

    // create a new user if it doesn't exist (inside of the Sanity database)
    client.createIfNotExists(user)
      .then(() => res.status(200).json('logged in'))
  }
}
