import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

type SliderProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  max: number;
  min: number;
  value: number;
  onChange: (value: number) => void;
};

export const Slider = ({ value, min, max, containerRef, onChange }: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const movePosition = useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current || !isDragging) return;

      const { clientX } = event;
      const slider = containerRef.current.getBoundingClientRect();
      const posX = clientX - slider.left;

      let selectedValue = Math.round((posX / slider.width) * (max - min) + min);
      selectedValue = Math.max(min, selectedValue);
      selectedValue = Math.min(max, selectedValue);

      onChange(selectedValue);
    },
    [containerRef, isDragging, max, min, onChange],
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
    <div
      className={clsx('h-2 absolute items-center inline-flex')}
      style={{ width: `${((value - min) / (max - min)) * 100}%` }}
    >
      <span
        className={clsx(
          'bg-sky-500 rounded-full absolute right-[-8] h-4 w-4 z-10',
          isDragging ? 'cursor-grabbing scale-125' : 'hover:cursor-grab hover:scale-125',
        )}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};
