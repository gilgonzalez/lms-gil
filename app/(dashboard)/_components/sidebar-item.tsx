import { LucideIcon } from 'lucide-react';
import React from 'react'
import {usePathname, useRouter} from "next/navigation"
import { cn } from '@/lib/utils';

interface Props {
    icon : LucideIcon,
    href: string;
    label: string;
}

const SideBarItem = ({icon : Icon, label, href} : Props) => {

  const pathname= usePathname()
  const router = useRouter()
  const isActive = ( pathname === "/" && href === "/") 
  || pathname === href 
  || pathname?.startsWith(`${href}/`)

  const onRouteClick = () => {
    router.push(href)
    router.refresh()
  }
  
  return (
      <button 
        onClick={onRouteClick}
        type='button'
        className={cn(
          'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-gray-500/30',
          isActive && "text-sky-700 bg-sky-200/20 hover:bg-sly-200/20 hover:text-sky-700"
        )}
      >
        <div className='flex items-center gap-x-2 py-4'>
          <Icon 
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          />
          {label}
        </div>
        <div className={cn("ml-auto opacity-0 border-2 border-sky-700 h-full transition-all", isActive && "opacity-100")}/>
      </button>
  )
}

export default SideBarItem