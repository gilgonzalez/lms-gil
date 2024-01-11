"use client";

import * as z from "zod";
import axios from "axios";


import { Button } from "@/components/ui/button";
import { PlusCircle, ImageIcon, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  imageUrl: z
    .string()
    .min(1, "Image is required")
    
});

interface Props {
  initialData: Course
  courseId: string;
}

const ImageForm = ({ courseId, initialData }: Props) => {
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast.success("Description changed successfully");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong trying to change the title. Try again");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md px-4 py-1">
      <div className="font-medium flex items-center justify-between">
       Course Image
        <Button onClick={toggleEditing} variant="borderless">
          {isEditing ? (
            <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
              <X className="h-4 w-4 "/>
            </p>
            ) : (
              <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Pick an image
              </>
              )}
        </Button>
      </div>
      {isEditing ? (
        <div>
          <FileUpload 
            endpoint="courseImage"
            onChange={(url)=> {
              if(url){
                onSubmit({imageUrl: url})
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      ) : (
        <>
          {
            !isEditing && initialData?.imageUrl 
              ? (
                <div className="flex flex-col" >
                <div className="relative aspect-video mb-2 "> 
                  <Image 
                    alt="course image" 
                    fill 
                    className="object-cover rounded-md z-0" 
                    src={initialData.imageUrl}
                  />
                </div>
                </div>
              ) 
              : (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mb-2">
                  <ImageIcon className="h-10 w-10 text-slate-500"/>
                </div>
              )
          }
        </>
      )}
    </div>
  );
};
export default ImageForm;
