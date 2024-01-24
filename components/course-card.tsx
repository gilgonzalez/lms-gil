import Link from 'next/link';
import Image from 'next/image';
import { IconBadge } from '@/components/icon-badge';
import { BookOpen } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import CourseProgress from './course-progress';

interface Props{
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  chaptersLength : number;
  progress: number | null;
  category: string,
}

const CourseCard = ({
  id,
  title,
  price,
  imageUrl,
  chaptersLength,
  progress,
  category
}: Props) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image 
            src={imageUrl ?? ""}
            fill
            className="object-cover"
            alt={title}
          />
        </div>
        <div className="flex flex-col p-2">
          <p className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </p>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm dm:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size={"sm"} icon={BookOpen}/>
              <span>
                {chaptersLength} {chaptersLength > 1 ? "Chapters" : "Chapter"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              value={progress}
              size="small"
              variant={progress === 100 ? "success" : "default"}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">{formatPrice(price)}</p>
          )}
        </div>
      </div>
      
      
    </Link>
  )
}
export default CourseCard