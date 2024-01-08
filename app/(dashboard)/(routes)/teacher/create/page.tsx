"use client"
import React from 'react'

import * as z from "zod"
import axios from "axios"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast';

const scheme = z.object({
  title: z.string().min(1, {message: "Title is required"}),
});


const CreateCourse = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof scheme>>({
    resolver : zodResolver(scheme),
    defaultValues : {
      title: ""
    }
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values : z.infer<typeof scheme>) => {
    try{
      const response = await axios.post("/api/courses", values)
      router.push(`/teacher/courses/${response.data.id}`)
      toast("Course created")
    } catch(error) {
      toast.error('Something went wrong',{duration:1000})
    }
    console.log(values)
  }
  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
      <div>
        <h1 className='text-2xl'>Name your course</h1>
        <p className='text-sm text-slate-600'>What would you like to name your course? Dont panic, you can change this later</p>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
            <FormField 
              control={form.control}
              name="title"
              render={({field})=> (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder='e.g. React desde 0 a experto'
                      {...field }
                    />
                  </FormControl>
                  <FormDescription>What would you teach in this course</FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2 justify-between'>
                <Link href="/">
                  <Button variant={'ghost'} type='button' size={'sm'}>
                    Cancel
                  </Button>
                </Link>
                <Button disabled={!isValid || isSubmitting} type='submit' size={'sm'} variant={'confirm'}>
                  Continue
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCourse