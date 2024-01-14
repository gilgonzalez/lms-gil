"use client";

import * as z from "zod";
import axios from "axios";


import { Button } from "@/components/ui/button";
import { PlusCircle, X, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";

const formSchema = z.object( {
  videoUrl: z
    .string()

} );

interface Props {
  initialData: Chapter & { muxData?: MuxData | null; };
  courseId: string;
  chapterId: string;
}

const ChapterVideoForm = ( { courseId, initialData, chapterId }: Props ) => {
  const router = useRouter();

  const [ isEditing, setIsEditing ] = useState( false );

  const toggleEditing = () => {
    setIsEditing( !isEditing );
  };

  const onSubmit = async ( data: z.infer<typeof formSchema> ) => {
    try {
      await axios.patch( `/api/courses/${ courseId }/chapters/${ chapterId }`, data );
      toast.success( "Chapter video updated successfully" );
      toggleEditing();
      router.refresh();
    } catch ( error ) {
      toast.error( "Something went wrong trying to upload the video. Try again" );
    }
  };
  console.log({video : initialData?.muxDate})
  return (
    <div className="mt-6 border bg-slate-100 rounded-md px-4 py-1">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={ toggleEditing } variant="borderless">
          { isEditing ? (
            <p className="text-xs text-white px-1 py-1 rounded-full bg-red-700/80 flex flex-row gap-2">
              <X className="h-4 w-4 " />
            </p>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          ) }
        </Button>
      </div>
      { isEditing ? (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={ ( url ) => {
              if ( url ) {
                onSubmit( { videoUrl: url } );
              }
            } }
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter video
          </div>
        </div>
      ) : (
        <>
          {
            !isEditing && initialData?.videoUrl
              ? (
                <div className="flex flex-col" >
                  <div className="relative aspect-video mb-2 ">
                  <MuxPlayer
                    playbackId={ initialData?.muxData?.playbackId || "" }
                  /> 
                  </div>
                </div>
              )
              : (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mb-2">
                  <Video className="h-10 w-10 text-slate-500" />
                </div>
              )
          }
        </>
      ) }
      { initialData.videoUrl && !isEditing && (
        <div className="text-xs mt-w text-muted-foreground italic">
          Videos can take a few minutes to process. Refresh the page if video does not appear
        </div>
      ) }
    </div>
  );
};
export default ChapterVideoForm;
