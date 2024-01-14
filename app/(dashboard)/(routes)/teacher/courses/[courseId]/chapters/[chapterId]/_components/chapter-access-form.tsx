"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Pencil, Ban, X, Receipt, BookOpenCheck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Checkbox } from '@/components/ui/checkbox';
import { IconBadge } from '@/components/icon-badge';
import { DialogOverlay } from '@/components/ui/dialog';

const formSchema = z.object({
  isFree: z
    .boolean().default(false)
});

interface Props {
  initialData: Chapter
  courseId: string;
  chapterId: string
}

const ChapterAccessForm
 = ({ courseId, initialData, chapterId }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData?.isFree 
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data);
      toast.success("Access type changed successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong trying to change the access type. Try again");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md px-4 py-1">
      <div className="font-medium flex items-center justify-between">
        Access Type
        <Button onClick={toggleEditing} variant="borderless">
          {isEditing ? (
            <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
            <X className="h-4 w-4 "/>
          </p>
            ) : (
              <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
              </>
              )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className=" flex flex-row items-start space-x-3 space-y-0 rounded-md boder p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        Check this box if you want to make this chapter free for preview
                      </FormDescription>
                    </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div
          className={cn(
            "text-sm font-medium mt-2 flex flex-row items-center mb-2",
            !initialData.isFree && "text-slate-500 italic"
          )}
        >
          {initialData.isFree 
            ? (<>
                <IconBadge size="sm" icon={ BookOpenCheck  }/>
                <span className="ml-2">This chapter is free for preview</span>
              </>) 
            : (<>
                <IconBadge size="sm" variant="success" icon={ Receipt  }/>
                <span className="ml-2">Students has to pay to view this chapter</span>
              </>)}
        </div>
      )}
    </div>
  );
};
export default ChapterAccessForm
;
