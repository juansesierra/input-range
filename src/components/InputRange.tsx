'use client';
import clsx from 'clsx';
import React, { useState, useRef, useEffect, useCallback } from 'react';

type InputRangeProps = {
  min: number;
  max: number;
};

export const InputRange = ({ min, max }: InputRangeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(min);

  const movePosition = useCallback(
    (event: MouseEvent) => {
      if (!sliderRef.current || !isDragging) return;

      const { clientX } = event;
      const slider = sliderRef.current.getBoundingClientRect();
      const posX = clientX - slider.left;
      let value = Math.round((posX / slider.width) * (max - min) + min);
      value = Math.max(min, value);
      value = Math.min(max, value);
      setValue(value);
    },
    [isDragging, max, min],
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', movePosition);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousedown', handleMouseDown);
    }
    return () => {
      window.removeEventListener('mousemove', movePosition);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isDragging, movePosition, handleMouseDown, handleMouseUp]);

  return (
    <div className='bg-white w-full h-2 relative inline-flex items-center p-0' ref={sliderRef}>
      <div
        className={clsx('bg-sky-500 h-2 absolute items-center inline-flex', { 'cursor-move': isDragging })}
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      >
        <span
          className='bg-sky-500 rounded-full absolute right-[-8] h-4 w-4 hover:cursor-grab hover:scale-125'
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};
