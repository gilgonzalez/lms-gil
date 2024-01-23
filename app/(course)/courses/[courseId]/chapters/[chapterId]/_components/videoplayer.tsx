"use client"

import { useConfettiStore } from '@/hooks/use-confetti-store';
import { cn } from '@/lib/utils';
import MuxPlayer from '@mux/mux-player-react';
import axios from 'axios';
import { Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  chapterId:string;
  title:string;
  courseId:string;
  nextChapterId?:string;
  playbackId:string;
  isLocked:boolean;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  chapterId,
  completeOnEnd,
  courseId,
  isLocked,
  nextChapterId,
  playbackId,
  title
}:Props) => {
  
  const [isReady, setIsReady] = useState(false)


  return (
    <div className="md:relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
        </div>
      )}
      { isLocked &&
        <div className="absolute inset-0 flex flex-col items-center gap-y-2 justify-center bg-slate-800">
          <Lock className="h-8 w-8 text-secondary"/>
          <p className="text-base text-secondary">This chapter is locked</p>
        </div> 
      }
      {
        !isLocked && (
          <MuxPlayer
            title={title}
            className={cn(
              !isReady && "hidden"
            )}
            onCanPlay={() => setIsReady(true)}
            onEnded={()=>{}}
            autoPlay
            playbackId={playbackId}
          />
        )
      }
    </div>
  )
}
export default VideoPlayer