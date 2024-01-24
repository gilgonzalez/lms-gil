import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import VideoPlayer from './_components/videoplayer';
import CourseEnrollButton from './_components/course-enroll-button';
import { Separator } from '@/components/ui/separator';
import { Preview } from '@/components/preview';
import { File } from 'lucide-react';
import CourseProgressButton from './_components/course-progress-button';

const ChapterIdPage = async ({
  params
}:{
  params : {chapterId : string, courseId: string}
}) => {
  const {chapterId, courseId } = params
  const { userId } = auth();

  if(!userId) return redirect('/')

  const {chapter, course, muxData, attachments, nextChapter, userProgress, purchase} = await getChapter({userId, courseId, chapterId})
  
  if(!chapter || !course) return redirect('/')
  
  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted
  
  
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="This chapter is already completed"/>
      )}
      {isLocked && (
        <Banner variant="warning" label="This chapter is locked because you didn't purchase this course"/>
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer 
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton 
                chapterId = {params.chapterId}
                courseId = {params.courseId}
                nextChapterId = {nextChapter?.id}
                isCompleted = {!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator/>
          <div>
            <Preview
              value={chapter.description!}
            />
          </div>
          {
            !!attachments.length && (
              <>
                <Separator/>
                <div className="p-4 space-y-2">
                  {attachments.map((attachment) => (
                    <a 
                      href={attachment.url} 
                      target="_blank" 
                      key={attachment.id}
                      className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    >
                      <File/>
                      <p>{attachment.name}</p>
                    </a>
                  ))}
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default ChapterIdPage