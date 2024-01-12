"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod'; 
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"

import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title : z.string(),
})

interface Props {
  initialData :{
    title: string
  },
  courseId : string
  chapterId: string
}

const ChapterTitleForm
 = ({courseId,initialData, chapterId}: Props) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : initialData
  });
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const { isSubmitting, isValid} = form.formState

  const onSubmit = async (data : z.infer<typeof formSchema>) => {

    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data)
      toast.success("Chapter title successfully")
      toggleEditing()
      router.refresh()
    }catch(error){
      toast.error("Something went wrong trying to change the title. Try again")
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md px-4 py-1">
      <div className="font-medium flex items-center justify-between">
        Chapter title 
        <Button onClick={toggleEditing} variant="borderless">
          {isEditing ? (
            <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
              <X className="h-4 w-4 "/>
            </p>
            ) : (
              <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
              </>
              )}
        </Button>
      </div>
      {isEditing 
        ? (
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter title" disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage/>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="flex items-center gap-x-2 justify-end">
              <Button disabled={!isValid || isSubmitting} type="submit" >
                Save
              </Button>
            </div>
            </form>
          </Form>
        ) 
        : (<p className="text-sm mt-2">{initialData.title}</p>)
      }
    </div>
  )
}
export default ChapterTitleForm
