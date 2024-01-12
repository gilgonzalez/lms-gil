import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, {params} : {params : {courseId: string, chapterId: string}}) {
  try {
    const {userId} = auth()
    const {courseId, chapterId} = params;
    const {isPublished, ...values } = await req.json()

    if(!userId) return new NextResponse("Unathorized", {status:401})

    const ownCourse = await db.course.findUnique({
      where:{
        id: courseId,
        userId
      }
    })
    if(!ownCourse) return new NextResponse("Unathorized", {status:401})

    const chapter = await db.chapter.update({
      where : {
        id: chapterId,
        courseId: courseId
      },
      data: {
        ...values
      }
    });

    // TODO : handle video uplode
    return NextResponse.json(chapter)
  }catch(error){
    console.log("[CHAPTER ID]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}