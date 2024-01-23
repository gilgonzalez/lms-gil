"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { formatPrice } from '@/lib/format';
import { auth } from '@clerk/nextjs';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FcShipped } from 'react-icons/fc';


interface Props {
  price: number;
  courseId: string;
}

const CourseEnrollButton = ( { courseId, price }: Props ) => {

  const [ isLoading, setIsLoading ] = useState( false );

  const onClick = async () => {
    setIsLoading( !isLoading );
    try {
      setIsLoading(true)

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign( response.data.url)

    } catch (error) {
      toast.error(`Something went wrong`)
    } finally{
      setIsLoading(false)
    }
  };


  return (
    <Button
      onClick={ onClick }
      disabled={ isLoading }
      size="sm"
      variant="enroll"
      className="w-full overflow-hidden md:w-auto md:min-w-40 relative"
    >{ isLoading ? <FcShipped  className="absolute md:animate-movingMd animate-moving" size={ 24 } /> : `Enroll for ${ formatPrice( price ) }` }</Button>
  );
};
export default CourseEnrollButton;