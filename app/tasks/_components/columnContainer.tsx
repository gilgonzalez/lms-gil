import React from 'react'
import { Column } from './kanban';

interface Props {
  column: Column
}

const ColumnContainer = ({ column }:Props) => {
  return (
    <div>
      {column.title}
    </div>
  )
}

export default ColumnContainer
