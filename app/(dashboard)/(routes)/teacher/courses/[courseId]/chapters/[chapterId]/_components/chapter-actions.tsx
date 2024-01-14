"use client"

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useRouter } from "next/navigation"

interface Props {
  disabled: boolean;
  courseId: string,
  chaperId: string,
  isPublished: boolean
}

const ChapterActions = ({chaperId,courseId,disabled,isPublished}:Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => {}}
        disabled={disabled}
        variant="outline"
        size="sm"
      >
        {!isPublished ? "Published": "Unpublished"}
      </Button>
      <Button size="sm" variant="destructive">
        <Trash className="h-4 w-4"/>
      </Button>
    </div>
  )
}
export default ChapterActions