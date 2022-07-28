//url will be dynamic (the [id])
//How do we fetch the data for our 'detail'? We use the 'id' inside of the url. We do that with the 'getServerSideProps' function.
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'

import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

const Detail = () => {
  return (
    <div>Detail</div>
  )
}

export default Detail