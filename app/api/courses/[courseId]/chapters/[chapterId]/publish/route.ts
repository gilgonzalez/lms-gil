import { db } from "@/lib/db";
import Mux  from "@mux/mux-node"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

const { Video} = new Mux(process.env.MUX_TOKE_ID!, process.env.MUX_TOKEN_SECRET!)

export async function PATCH(req: Request, {params} : {params : {courseId: string, chapterId: string}}) {
  try {
    const {userId} = auth()
    const {courseId, chapterId} = params;

    if(!userId) return new NextResponse("Unauthorized", {status:401})

    const ownCourse = await db.course.findUnique({
      where:{
        id: courseId,
        userId
      }
    })
    if(!ownCourse) return new NextResponse("Unauthorized", {status:401})

    const chapter = await db.chapter.findUnique({
      where : {
        id: chapterId,
        courseId: courseId
      }
    });

    const muxData = await db.muxData.findUnique({
      where : {
        chapterId,
      }
    })
    if(!chapter || !muxData || !chapter.description || !chapter.title || !chapter.videoUrl ) {
      return new NextResponse("Missing required field", {status: 400})
    }

    const publishedChapter = await db.chapter.update({
      where : {
        id: chapterId,
        courseId,
      },
      data :{
        isPublished : true
      }
    })
    
    return NextResponse.json(publishedChapter)
  }catch(error){
    console.log("[CHAPTER PUBLISH]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}