//* UNPUBLISH ROUTE

//*PUBLISH ROUTE

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function PATCH(req : Request, {params} : {params : {courseId: string}}){
  try {

    const { userId } = auth()
    const { courseId } = params
    if(!userId) return new NextResponse("Unathorized", {status: 401})

    const course = await db.course.findUnique({
      where : {
        id: courseId,
        userId
      },
    })
    if(!course) return new NextResponse("Course not Found", {status: 404})

    const unPublishedCourse = await db.course.update({
      where : {
        id: courseId,
        userId
      }, 
      data : {
        isPublished : false
      }
    })
    return NextResponse.json(unPublishedCourse)
  } catch (error) {
    console.log("[COURSE ID UNPUBLISH]", error)
    return new NextResponse("Internal server", {status: 500})
  }
}