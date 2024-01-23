import { CourseWithProgressAndCategory } from '@/actions/get-courses'
import React from 'react'
import { FcBinoculars} from "react-icons/fc"
import CourseCard from '@/components/course-card';



interface Props {
  items : CourseWithProgressAndCategory[]
}

const CoursesList = ({items}:Props ) => {

  
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {items.map((item)=> (
          <CourseCard 
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl = {item.imageUrl!}
            chaptersLength = {item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
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