"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Pencil, Ban, X, PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChaptersList from "./chapters-list";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Chapter must have a title")
});

interface Props {
  initialData: Course & { chapters : Chapter[]}
  courseId: string;
}

const ChaptersForm = ({ courseId, initialData }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating(!isCreating);
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, data);
      toast.success("Chapter created successfully");
      toggleCreating();
      router.refresh();
      form.reset()
    } catch (error) {
      toast.error("Something went wrong trying to create the chapter. Try again");
    }
  };
  const onReorder = async (updateData : {id: string, position: number}[])=>{

    try{
      setIsUpdating(true)
      await axios.put(`/api/courses/${courseId}/chapters/reorder`,{
        list : updateData
      })
      toast.success("Chapters reordered")
      router.refresh()
    } catch(error){
      toast.error("Reordering wrong")
    }finally{
      setIsUpdating(false)
    }
  }
  const onEdit = (idChapter: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${idChapter}`)
  }
  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md px-4 py-1">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Chapters
        <Button onClick={toggleCreating} variant="borderless">
          {isCreating ? (
          <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
            <X className="h-4 w-4 "/>
          </p>
            ) : (
              <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add chapter
              </>
              )}
        </Button>
      </div>
      {isCreating ? (
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
                  <FormLabel title='cualquier cosa'/>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction of...'"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <Button disabled={ isSubmitting} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <div className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}>
            {
              !initialData.chapters.length ? "No chapters" : (
                <ChaptersList 
                  onEdit={onEdit}
                  onReorder={onReorder}
                  items = {initialData.chapters || []}
                />
              )
            }
          </div>
          <p className="text-xs italic text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
          </p>
        </>
      )}
    </div>
  );
};
export default ChaptersForm;
