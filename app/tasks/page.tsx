import React from 'react'
import Kanban from './_components/kanban';
import { KanbanIcon } from 'lucide-react';

const TEsting = () => {
  return (
    <div 
      className="p-4 border border-slate-400 h-full rounded-md shadow-xl m-10 flex items-start overflow-auto overflow-x-auto px-[40px]">
        
        <Kanban/>
    </div>
  )
}

export default TEsting