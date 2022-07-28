// this is where we fetch our google response
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createOrGetUser = async (response: any, addUser: any) => {
  // the types in decoded come from console.log(decoded), but I only got an error saying "missing required parameter 'client_id'"
  const decoded: { name: string, picture: string, sub: string } = jwt_decode(response.credential);

  // the sub value is the user id
  const { name, picture, sub } = decoded;

  // all Sanity documents need to have _id, _type, userName, and image
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }

  //adds our user to the persistent state
  addUser(user);

  // makes API call
  await axios.post(`${BASE_URL}/api/auth`, user);
}