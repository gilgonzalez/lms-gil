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
      include : {
        chapters: {
          include:{
            muxData: true
          }
        }
      }
    })
    if(!course) return new NextResponse("Course not Found", {status: 404})

    const hasPublishedChapters = course.chapters.some( chapter => chapter.isPublished)
    const courseAvailableToPublish = course.title && course.description && course.categoryId && course.imageUrl && hasPublishedChapters

    if(!courseAvailableToPublish) return new NextResponse("Some fields requested are unfilled", {status: 401})


    const publishedCourse = await db.course.update({
      where : {
        id: courseId,
        userId
      }, 
      data : {
        isPublished : true
      }
    })
    return NextResponse.json(publishedCourse)
  } catch (error) {
    console.log("[COURSE ID PUBLISH]", error)
    return new NextResponse("Internal server", {status: 500})
  }
}