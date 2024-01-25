import React from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';

const UserItem = ({name, id}: {name:string, id:number}) => {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id,
  })
  const style = {
    transform : CSS.Transform.toString(transform),
    transition,
  } 

  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef} 
      className="bg-white p-4 rounded-md shadow-md m-4 text-black "
    >
        <h1>{name}</h1>
    </div>
  )
}

export default UserItem
