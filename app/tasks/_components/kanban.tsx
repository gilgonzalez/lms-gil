"use client"
import { Button } from '@/components/ui/button';
import { KanbanIcon } from 'lucide-react';
import React, { useState } from 'react'

type Column = {
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
    <div className="m-auto">
      <div>
        {columns.map((col)=>(
          <div key={col.id}>
            {col.title}
          </div>
        ))}
      </div>
      <Button variant="borderless" className="flex gap-2" onClick={createNewColumn}>
      <KanbanIcon/>
        Add Column
      </Button>
    </div>
  )
}

export default Kanban
