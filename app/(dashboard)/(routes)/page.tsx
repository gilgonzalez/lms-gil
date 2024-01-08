import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs"
import { useParams } from 'next/navigation'

export default function Home() {
  
  return (
      <UserButton afterSignOutUrl='/'/>
  )
}
