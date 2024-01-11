"use client";

import * as z from "zod";
import axios from "axios";


import { Button } from "@/components/ui/button";
import { PlusCircle, ImageIcon, X, File, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  url: z
    .string()
    .min(1)
    
});

interface Props {
  initialData: Course & { attachments : Attachment[]}
  courseId: string;
}

const AttachmentForm = ({ courseId, initialData }: Props) => {
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, data);
      toast.success("Description changed successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong trying to change the title. Try again");
    }
  };
  const onDelete = async (id: string) => {
    console.log({id})
    try{
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("Attachment removed")
      router.refresh()
    } catch(error){
      toast.error("Error trying to remove attachment")
    } finally {
      setDeletingId(null)
    }
  }
  //fbae8909-7b8f-4d22-93d0-c77f8ba70ccb
  //fbae8909-7b8f-4d22-93d0-c77f8ba70ccb
  return (
    <div className="mt-6 border bg-slate-100 rounded-md px-4 py-1">
      <div className="font-medium flex items-center justify-between">
       Course Attachments
        <Button onClick={toggleEditing} variant="borderless">
          {isEditing ? (
            <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
              <X className="h-4 w-4 "/>
            </p>
            ) : (
              <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
              </>
              )}
        </Button>
      </div>
      {
        !isEditing && (
          <>
            {initialData.attachments.length === 0 ? (
              <p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>
            ) : (
              <div className="space-y-2">
                {
                  initialData.attachments.map((att)=>(
                    <div key={att.id} className="flex items-center p-3 bg-sky-100 border-sky-200 border text-sky-700 rounded-sm">
                      <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                      <p className="text-sm line-clamp-1">{att.name}</p>
                      {deletingId === att.id && (
                        <div className="ml-auto">
                          <Loader2 className="h-4 w-4 animate-spin text-destructive"/>
                        </div>
                      )}
                      {deletingId !== att.id && (
                        <button className="ml-auto hover:opacity-75 transition" onClick={()=> onDelete(att.id)}>
                          <X className="h-4 w-4 "/>
                        </button>
                      )}
                    </div>
                  ))
                }
              </div>
              )
            }
          </>
        )
      }
      {isEditing && (
        <div>
          <FileUpload 
            endpoint="courseAttachment"
            onChange={(url)=> {
              if(url){
                onSubmit({url})
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add the resources that the students will need in your course.
          </div>
        </div>
      )}
    </div>
  );
};
export default AttachmentForm;
