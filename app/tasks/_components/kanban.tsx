"use client"
import { Button } from '@/components/ui/button';
import { KanbanIcon } from 'lucide-react';
import React, { useState } from 'react'
import ColumnContainer from './columnContainer';

export type Column = {
  id: string;
  title: string;
}

const Kanban = () => {
  const [columns, setcolumns] = useState<Column[]>([])
  const createNewColumn = () => {
    const columnToAdd = {
      id: crypto.randomUUID(),
      title: `Column ${columns.length}`
    }

    setcolumns([...columns, columnToAdd] )
  }
  return (
    <div className="m-auto" >
      <Button variant="borderless" className="flex gap-4" onClick={createNewColumn}>
      <KanbanIcon/>
        Add Column
      </Button>
      <div className="m-auto flex gap-2">
        {columns.map((col)=>(
          <ColumnContainer column={col} key={col.id}/>
        ))}
      </div>
    </div>
  )
}

export default Kanban
