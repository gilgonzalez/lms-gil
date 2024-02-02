import React from 'react'

interface Props{
  title: string
}

const ColumnContainer = ({title}:Props) => {
  return (
    <div className='bg-slate-500 flex-1 h-5/6 rounded-md flex flex-col max-w-xs min-w-40'>
      {title}
      <div className='flex flex-grow'>
        content
      </div>
      <footer>
        footer
      </footer>
    </div>
  )
}

export default ColumnContainer