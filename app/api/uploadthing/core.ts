import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
  const {userId} = auth()
  const hola = auth()
  console.log({hola})
  console.log({userId})

  if(!userId) throw new Error("Unauthorized")
  return { userId }
}; // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f ({image: {maxFileSize: "4MB", maxFileCount:1}})
    .middleware(()=> handleAuth())
    .onUploadComplete(()=> {
      console.log("Upload completed!")
    }),
  courseAttachment : f(["image", "pdf", "video", "audio", "text"])
    .middleware(()=> handleAuth())
    .onUploadComplete(()=>{

    }),
  chapterVideo : f({video: {maxFileCount:1, maxFileSize:"512GB"}})
    .middleware(()=> handleAuth())
    .onUploadComplete(()=>{

    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;