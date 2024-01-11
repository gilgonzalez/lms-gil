import React from 'react'
import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full '>
        <nav className='h-[60px] md:pl-44 fixed inset-y-0 w-full z-50'>
          <Navbar/>
        </nav>
        <nav className='hidden md:flex h-full w-44 flex-col fixed inset-y-0 z-50'>
            <Sidebar />
        </nav>
        <main className='md:pl-44 pt-[60px] h-full'>
          {children}
        </main>
    </div>
  )
}

export default layout