import React from 'react'

import  { footerList1, footerList2, footerList3 } from '../utils/constants'


const List = ({ items, mt }: { items: string[], mt: boolean }) => (
  // if mt, add margin top
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item) => (
      <p key={item} className="text-gray-400 text-sm hover:underline cursor-pointer">
        {item}
      </p>
    ))}
  </div>
)

const Footer = () => {

  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false} />
      {/* if mt is true, we dont need to say 'true', we just provide the prop */}
      <List items={footerList2} mt /> 
      <List items={footerList3} mt />
    </div>
  )
}

export default Footer