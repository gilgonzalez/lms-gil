import { CourseWithProgressAndCategory } from '@/actions/get-courses'
import React from 'react'
import { FcBinoculars} from "react-icons/fc"



interface Props {
  items : CourseWithProgressAndCategory[]
}

const CoursesList = ({items}:Props ) => {

  
  return (
    <div>

      <div>{items.map((item)=> (
        <div key={item.id}>
  
        </div>
      ))}</div>
      {items.length === 0 && (
        <div className='gap-10 justify-between items-center flex flex-col text-center text-3xl  font-medium text-muted-foreground mt-20'>
          <p className='italic'>No courses found</p> 
          <FcBinoculars size={45}/>
        </div>
      )}
    </div>
  )
}

export default CoursesList