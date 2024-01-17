"use client"

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  disabled: boolean;
  courseId: string,
  isPublished: boolean
}

const CourseActions = ({courseId,disabled,isPublished}:Props) => {
  
  const [isLoading, setIsLoading] = useState(false)
  const confetti = useConfettiStore()
  const router = useRouter()
  const onDelete = async () => {

    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}`)
      toast.success("Course removed successfully")
      router.refresh()
      router.push(`/teacher/courses`)
    }
    catch (error) {
      toast.error("Removing course went wrong")
    }finally {
      setIsLoading(false)
    
    }

  }
  const onClickPublish = async () => {

    try {
      setIsLoading(true)
      if(isPublished){
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("Course unpublished 😢")
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Course published! 😄") 
        confetti.onOpen()    
      }
      router.refresh()
    }catch (error) {
      toast.error("Error publishing the course")
    } finally {
      setIsLoading(false)
    }
  }

  
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClickPublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {!isPublished ? "Publish": "Unpublish"}
      </Button>
      <ConfirmModal
        actionString="delete this course"
        description="Be sure, because this action cannot be undone."
        onConfirm={onDelete}
      >
        <Button size="sm" variant="destructive" disabled={isLoading}>
          <Trash className="h-4 w-4"/>
        </Button>
      </ConfirmModal>
    </div>
  )
}
export default CourseActions