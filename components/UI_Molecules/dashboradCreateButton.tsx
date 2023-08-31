import Link from 'next/link'
import React from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {HiOutlineDocumentText} from 'react-icons/hi'

type props = {
  type : String, 
  path: string
}

function DashboardButton({type,path} : props) {
  return (
    <Link  href={path}>
    <div  className='flex  items-center border border-black h-20 rounded-md py-3 px-4 hover:scale-105 cursor-pointer'>
        <HiOutlineDocumentText size={56} className='text-medium'/>
        <div className='pl-4 pr-6'>
        <p className='font-bold font-rounded text-[18px] '>Create {type}</p>
        <p className='text-medium text-[14px]'>Create and Share with others</p>
        </div>
        <AiOutlinePlusCircle className='text-medium' size={36}/>
    </div>
    </Link>
  )
}

export default DashboardButton