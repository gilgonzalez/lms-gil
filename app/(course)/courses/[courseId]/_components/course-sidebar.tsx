import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { redirect } from 'next/navigation';
import CourseSidebarChapterItem from './course-sidebar-chapter-item';
import { CourseWithProgressAndCategory } from '../../../../../actions/get-courses';
import CourseProgress from '@/components/course-progress';

interface Props {
  course: Course & {
    chapters : (Chapter & {userProgress : UserProgress[]})[] | null
  },
  progressCount : number,
}

const CourseSidebar = async ({course, progressCount} : Props) => {

  const { userId } = auth()
  if(!userId) return redirect("/")

  const purchase = await db.purchase.findUnique({
    where : {
      userId_courseId : {
        userId,
        courseId: course.id
      }
    }
  })
  return (
    <div
      className="h-full border-r flex flex-col overflow-y-auto shadow-sm"
    >
      <div className="p-6 flex flex-col border-b">
        <h1 className="font-medium">
          {course.title.toLocaleUpperCase()}
        </h1>
        {/**check progress */}
        {
          purchase && (
            <div className="mt-10">
              <CourseProgress 
                variant="success"
                value={progressCount}
              />
            </div>
          )
        }
      </div>
      <div className="flex flex-col w-full">
        {course.chapters && course.chapters.map((chapter) => (
          <CourseSidebarChapterItem 
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}
export default CourseSidebar