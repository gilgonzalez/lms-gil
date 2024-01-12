import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function  POST(
  req :Request,
  {params}:{params:{courseId : string}}
) {

  try{

    const {userId} = auth()
    const {title} = await req.json()

    if(!userId) return new NextResponse("Unathorized to create chapter", {status:401})

    const {courseId} = params
    if(!courseId) return new NextResponse("No course found to create chapter", {status:404})
    
    const ownerCourse = await db.course.findUnique({
      where:{
        id: courseId,
        userId
      }
      
    })
    if(!ownerCourse) return new NextResponse("No owner found", {status:401})
    
    const lastChapter = await db.chapter.findFirst({
      where:{
        courseId,
      },
      orderBy:{
        position: "desc"
      }
    })
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const newChapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position : newPosition
      }
    })
    console.log({newChapter})
    return NextResponse.json(newChapter)
  
  }catch(error){
    console.log("[CHAPTERS]:Error creating chapter", error)
    return new NextResponse("Internal Error", {status : 500})
  }
  
}