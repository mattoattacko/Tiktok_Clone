import { uuid } from 'uuidv4';
//we make a call to Sanity from our api request
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { postDetailQuery } from '../../../utils/queries'

// nextJS api handler
export default async function handler( req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'GET') {
    // we fetch the 'id' from req.query. The 'id' data can be pulled from 'detail' in {id}
    const { id } = req.query

    //we can form our Sanity query with the 'id'
    const query = postDetailQuery(id)

    //gets the actual data
    const data = await client.fetch(query)

    //return the data starting with the first element in the array
    res.status(200).json(data[0])
    

  // ~~~ adding a comment ~~~ // 
  } else if (req.method === 'PUT') {
    //get comment and user id from body
    const { comment, userId } = req.body
    const { id }: any = req.query //the url once we leave a comment

    const data = await client 
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment: comment,
          _key: uuid(),
          postedBy: { _type: 'postedBy', _ref: userId },            
        },
      ])
      .commit()

    res.status(200).json(data)
  }
}
