"use client"

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  disabled: boolean;
  courseId: string,
  chapterId: string,
  isPublished: boolean
}

const ChapterActions = ({chapterId,courseId,disabled,isPublished}:Props) => {
  
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const onDelete = async () => {

    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success("Chapter removed successfully")
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    }
    catch (error) {
      toast.error("Removing chapter went wrong")
    }finally {
      setIsLoading(false)
    
    }

  }
  const onClickPublish = async () => {

    try {
      setIsLoading(true)
      if(isPublished){
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        toast.success("Chapter unpublished 😢")
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success("Chapter published! 😄")      
      }
      router.refresh()
    }catch (error) {
      toast.error("Error publishing the chapter")
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
        actionString="delete this chapter"
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
export default ChapterActions