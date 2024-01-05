"use client";
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { GraduationCap, LogOut } from 'lucide-react';
import Link from 'next/link';

const NavbarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/teacher")
  const isPlayerPage = pathname?.startsWith("/chapter")
    return (
      <div className="flex gap-x-4 ml-auto items-center">
        {isTeacherPage || isPlayerPage ? (
          <>
          <Link href={'/'}>
            <Button variant={'ghost'} size={'sm'}>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
          </>
        ) : (
          <Button variant={"ghost"} size={"icon"}>
            <Link href={"/teacher/courses"}>
              <GraduationCap size={16} />
            </Link>
          </Button>
          
        )}
        <UserButton afterSignOutUrl='/'/>
      </div>
    );
}

export default NavbarRoutes