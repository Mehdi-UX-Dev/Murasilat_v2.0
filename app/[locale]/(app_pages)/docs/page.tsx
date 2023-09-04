import ListTable from '@/components/UI_Organisms/docs_pages/list'
import React from 'react'

function Page() {
    
  return (
    <div className=''>
        {/* the header must be with the id in the same row  */}
        <h1 className="font-IranSans text-4xl ">لیست تمام صادره</h1>

        <ListTable/>
    </div>
  )
}

export default Page