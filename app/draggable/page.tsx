"use client"

import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import User from './_components/user';


const DraggableContent = () => {

  const [personas, setPersonas] = useState([
    {name: 'Juan', id: 1},
    {name: 'Andrea', id: 2},
    {name: 'Pepe', id: 3},
  ])

  const handleDragEnd= (event: DragEndEvent)=> {
    const {active, over } = event
    // indice que estoy moviendo
    //? const indexDragged = personas.findIndex(persona => active.id === persona.id)
    // indice donde estoy soltando
    //? const indexDestination = personas.findIndex(persona => over?.id === persona.id)

    // reordenar
    //? const updatedOrder = arrayMove(personas, indexDragged, indexDestination)

    //* Simplificado :
    setPersonas((people)=>{
      const indexDragged = personas.findIndex(persona => active.id === persona.id)
      const indexDestination = personas.findIndex(persona => over?.id === persona.id)

      return arrayMove(people, indexDragged, indexDestination)
    })
  
  }
  
  
  return (
    <div className="bg-black p-2">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event)=>handleDragEnd(event)}
      >
        <h1>users list</h1>
        <SortableContext strategy={verticalListSortingStrategy} items={personas}>
          {
          personas.map((persona) => (<User key={persona.id} name={persona.name} id={persona.id}/>))
          }
        </SortableContext>
        
      </DndContext>
    </div>
  );
  
  
}

export default DraggableContent;