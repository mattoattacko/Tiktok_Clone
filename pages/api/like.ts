//we make a call to Sanity from our api request
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';

import { client } from '../../utils/client';

// nextJS api handler
export default async function handler( req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'PUT') {
    // we need everything from the body
    const { postId, like, userId } = req.body;
   

    //we want to change something in the client
    //setIfMissing only happens for the first like. 'insert(after)' will insert it at the end.
    //the ref=userId is the user that is liking the post.
    //commit saves it to the database.
    //the unset will check all the likes, and we want to find the like inside of the likes array that has the _ref=_id of the user that is liking the post.

    /// ~~~ THIS BLOCK OF CODE LIKES/UNLIKES A POST ~~~ /// (via NextJS backend route)
    const data = 
      like ? await client 
        .patch(postId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
          {
            _ref: userId,
            key: uuid(),
          }
        ])
        .commit()
      : await client
        .patch(postId)
        .unset([`likes[_ref=='${userId}']`])
        .commit();

      res.status(200).json(data);
  }
}
