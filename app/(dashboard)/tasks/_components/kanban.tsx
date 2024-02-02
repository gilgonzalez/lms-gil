"use client"
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, KanbanIcon, PlusCircle } from 'lucide-react';
import React, { useRef, useState } from 'react'
import ColumnContainer from './column-container';

type Column = {
  id: string;
  title: string;
}

const Kanban = () => {
  const [columns, setcolumns] = useState<Column[]>([])
  const scrollable = useRef<HTMLDivElement>(null)

  const createNewColumn = () => {
    const columnToAdd = {
      id: crypto.randomUUID(),
      title: `Column ${columns.length}`
    }
    setcolumns([...columns, columnToAdd] )
  }

  //*SCROLL BY DRAGGING
  // const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
  //   const ele = scrollable.current;
  //   if (!ele) {
  //     return;
  //   }
  //   const startPos = {
  //     left: ele.scrollLeft,
  //     top: ele.scrollTop,
  //     x: e.clientX,
  //     y: e.clientY,
  //   };

  //   const handleMouseMove = (e: React.MouseEvent) => {
  //     const dx = e.clientX - startPos.x;
  //     // const dy = e.clientY - startPos.y;
  //     // ele.scrollTop = startPos.top - dy;
  //     ele.scrollLeft = startPos.left - dx * 2;
  //     updateCursor(ele);
  //   };

  //   const handleMouseUp = () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //     resetCursor(ele);
  //   };

  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  // }, []);

  // const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
  //   const ele = scrollable.current;
  //   if (!ele) {
  //     return;
  //   }
  //   const touch = e.touches[0];
  //   const startPos = {
  //     left: ele.scrollLeft,
  //     top: ele.scrollTop,
  //     x: touch.clientX,
  //     y: touch.clientY,
  //   };

  //   const handleTouchMove = (e: React.TouchEvent) => {
  //     const touch = e.touches[0];
  //     const dx = touch.clientX - startPos.x;
  //     // const dy = touch.clientY - startPos.y;
  //     // ele.scrollTop = startPos.top - dy;
  //     ele.scrollLeft = startPos.left - dx * 2;
  //     updateCursor(ele);
  //   };

  //   const handleTouchEnd = () => {
  //     document.removeEventListener("touchmove", handleTouchMove);
  //     document.removeEventListener("touchend", handleTouchEnd);
  //     resetCursor(ele);
  //   };

  //   document.addEventListener("touchmove", handleTouchMove);
  //   document.addEventListener("touchend", handleTouchEnd);
  // }, []);

  // const updateCursor = (ele) => {
  //   ele.style.cursor = "grabbing";
  //   ele.style.userSelect = "none";
  // };

  // const resetCursor = (ele) => {
  //   ele.style.cursor = "grab";
  //   ele.style.removeProperty("user-select");
  // };
  //* SCROLLING HORIZONTAL
  const onWheel = (e : React.WheelEvent<HTMLDivElement>)=>{
    
    const move = Math.floor(e.deltaY) * 50
    if(scrollable.current) scrollable.current.scrollLeft = scrollable.current.scrollLeft + move
  }
  return (
    <div className="py-1 min-h-[90%] flex flex-col w-full items-start ">
      <Button variant="borderless" size={"sm"} className="flex gap-2" onClick={createNewColumn} >
        <PlusCircle />
      </Button>
      <div 
        ref={scrollable}
        className='flex gap-4  px-4 w-full flex-1 overflow-x-auto scroll whitespace-nowrap scroll-smooth'
        onWheel={onWheel}
        // onMouseDown={handleMouseDown}
        // onTouchStart={handleTouchStart}
      >
          {columns.map((col)=>(
            <ColumnContainer key={col.id} title={col.title}/>
          ))}
      </div>
    </div>
  )
}

export default Kanban
