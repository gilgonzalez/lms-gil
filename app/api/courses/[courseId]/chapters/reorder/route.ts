import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PUT(
  req : Request, 
  {params}: {params : {courseId : string}}
) {
  try {
    const {userId}= auth()
    const {courseId} = params
    if(!userId) return new NextResponse("No user id", {status: 401})

    const {list} = await req.json()

    const ownerCourse = await db.course.findUnique({
      where:{
        id: courseId,
        userId
      }
      
    })
    if(!ownerCourse) return new NextResponse("No owner found", {status:401})

    for (let item of list) {
      await db.chapter.update({
        where:{
          id: item.id,
        },
        data:{
          position: item.position
        }
      })
    }
    return new NextResponse("Success", {status:200})
  } catch (error) {
    console.log("[Reorder]", error)

    return new NextResponse("Internal Error", {status:500})
  }
}