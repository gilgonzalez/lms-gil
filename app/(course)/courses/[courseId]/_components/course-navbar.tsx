import NavbarRoutes from '@/components/NavbarRoutes';
import { Course, Chapter, UserProgress } from '@prisma/client';
import CourseMobileNavbar from './course-mobile-navbar';

interface Props {
  course: Course & {
    chapters : (Chapter & {userProgress : UserProgress[]})[] | null
  },
  progressCount : number,
}

const CourseNavbar = ({
  course,
  progressCount
}:Props) => {
  return (
    <div className="p-4 boder-b h-full flex items-center bg-white">
      <CourseMobileNavbar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes/>
    </div>
  )
}
export default CourseNavbar