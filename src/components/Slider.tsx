import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

type SliderProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  max: number;
  min: number;
  value: number;
  onChange: (value: number, isFromKeyboard?: boolean) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLSpanElement>) => void;
};

export const Slider = ({ value, min, max, containerRef, onChange, onKeyDown }: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const movePosition = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current || !isDragging) return;

      const clientX = (event as MouseEvent).clientX || (event as TouchEvent).touches[0].clientX;
      const slider = containerRef.current.getBoundingClientRect();
      const posX = clientX - slider.left;

      let selectedValue = Math.round((posX / slider.width) * (max - min) + min);
      selectedValue = Math.max(min, selectedValue);
      selectedValue = Math.min(max, selectedValue);

      onChange(selectedValue);
    },
    [containerRef, isDragging, max, min, onChange],
  );

  const handleStartDragging = useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging]);

  const handleEndDragging = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', movePosition);
      window.addEventListener('mouseup', handleEndDragging);

      window.addEventListener('touchmove', movePosition);
      window.addEventListener('touchend', handleEndDragging);
    }
    return () => {
      window.removeEventListener('mousemove', movePosition);
      window.removeEventListener('mouseup', handleEndDragging);

      window.removeEventListener('touchmove', movePosition);
      window.removeEventListener('touchend', handleEndDragging);
    };
  }, [isDragging, movePosition, handleStartDragging, handleEndDragging]);

  return (
    <div
      className={clsx('absolute items-center inline-flex')}
      style={{ width: `${((value - min) / (max - min)) * 100}%` }}
    >
      <span
        data-testid='slider-value'
        className={clsx(
          'bg-sky-500 rounded-full absolute right-[-8] h-4 w-4 z-10',
          isDragging ? 'cursor-grabbing scale-125' : 'hover:cursor-grab hover:scale-125',
          'focus:scale-125',
        )}
        onMouseDown={handleStartDragging}
        onTouchStart={handleStartDragging}
        onKeyDown={onKeyDown}
        tabIndex={0}
      />
    </div>
  );
};
