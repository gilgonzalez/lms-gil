import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"

export async function DELETE(
  req: Request,
  {params}: {params:{courseId:string, attachmentId: string}}
){

  console.log('chekcing')
  try {
    const { userId } = auth()

    if(!userId) return new NextResponse("Unauthorized", {status:401})

    const courseOwner = await db.course.findUnique({
      where : {
        id: params.courseId,
        userId
      }
    })
//teacher/courses/api/courses/5e7bf7e9-699d-457e-b924-ffc0316754d5/attachments/fbae8909-7b8f-4d22-93d0-c77f8ba70ccb
    if(!courseOwner) return new NextResponse("Unauthorized: no owner found", {status : 401})

    const attachmentRemoved = await db.attachment.delete({
      where:{
        courseId : params.courseId,
        id : params.attachmentId
      }
    })
    return NextResponse.json(attachmentRemoved)
  }catch(error) {

    console.log("[ERROR REMOVING ATTACHMENT]", error)
    return new NextResponse("Internal error", {status: 500})
  }
}