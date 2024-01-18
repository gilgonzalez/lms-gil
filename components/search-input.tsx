"use client"

import { Search } from 'lucide-react'
import qs from "query-string"
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SearchInput = () => {
  const [value, setValue] = useState("")
  const debounceValue = useDebounce(value)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname= usePathname()

  const currentCategoryId = searchParams.get("categoryId")

  useEffect(() => {
    
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debounceValue
      }
    },{skipNull: true, skipEmptyString: true})
    router.push(url)
  }, [currentCategoryId, debounceValue, router, pathname])
  

  return (
    <div className='relative '>
      <Search className='h-4 w-4 absolute top-3 left-3 text-slate-600'/>
      <Input 
        placeholder='Search for a course'
        className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200'
        value={value}
        onChange={(e)=> setValue(e.target.value)}
      />

    </div>
  )
}

export default SearchInput