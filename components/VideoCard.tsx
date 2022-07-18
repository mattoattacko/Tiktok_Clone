import React from 'react'
import { Video } from '../types'
import { NextPage } from 'next'

interface IProps {
  post: Video
}

//this is kinda confusing. See JSM video @1:30:00 for more info
// we could also just do VideoCard = ({ post }: IProps) => {.... as seen in the NoResults component.
//our VideoCard is of a type 'NextPage'
//<IProps> is a prop and is passed to the component
const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <div>VideoCard</div>
  )
}

export default VideoCard