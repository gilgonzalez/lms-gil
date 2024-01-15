import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import ChapterTitleForm from './_components/chapter-title-form';
import ChapterDescription from './_components/chapter-description-form';
import ChapterAccessForm from './_components/chapter-access-form';
import ChapterVideoForm  from './_components/chapter-video-form';
import { Banner } from '@/components/banner';
import ChapterActions from './_components/chapter-actions';


const EditChapter = async ( { params }: { params: { courseId: string, chapterId: string; }; } ) => {
  const { courseId, chapterId } = params;

  const { userId } = auth();

  if ( !userId ) return redirect( "/" );

  const chapter = await db.chapter.findUnique( {
    where: {
      id: chapterId,
      courseId
    },
    include: {
      muxData: true
    }
  } );

  if ( !chapter ) return redirect( '/' );

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter( Boolean ).length;

  const completionText = `(${ completedFields }/${ totalFields })`;
  const isCompleted = requiredFields.every(Boolean);
  return (
    <>
    
      <Banner 
        variant={chapter.isPublished ? "success" : "warning"}
        label={chapter.isPublished ? "This chapter is now avaible for your students" : "This chapter is not published yet. It will not be visible in the course"}
      />
      <div className='p-6'>
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link href={ `/teacher/courses/${ courseId }` }
              className='flex items-center text-sm hover:opacity-75 transition mb-6 italic'
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to the course
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className='text-2xl font-medium'>Chapter Edition</h1>
                <span className='text-sm text-slate-700'>Complete all fields { completionText }</span>
              </div>
              <ChapterActions
                disabled={!isCompleted}
                courseId={ courseId }
                chapterId={ chapterId }
                isPublished={ chapter.isPublished }
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ LayoutDashboard } />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={ chapter }
              courseId={ courseId }
              chapterId={ chapterId }
            />
            <ChapterDescription
              initialData={ chapter }
              courseId={ courseId }
              chapterId={ chapterId }
            />
            <div className="flex flex-row items-center gap-x-2">
              <IconBadge icon={ Eye } />
              <h2 className="text-xl">Access settings</h2>
            </div>
            <ChapterAccessForm
              initialData={ chapter }
              courseId={ courseId }
              chapterId={ chapterId }
            />
          </div>
            <div>
          <div className="flex items-center gap-x-2 ">
            <IconBadge icon={Video}/>
            <h2 className="text-xl">Add video</h2>
          </div>
          <ChapterVideoForm
            initialData={ chapter }
            courseId={ courseId }
            chapterId={ chapterId }
          />
            </div>
        </div>
      </div>
    </>
  );
};

export default EditChapter;