import React from 'react';
import ChevronDown from './ChevronDown';
import type { Photo } from '../../types/SliderHorizontal';

interface HorizontalSliderProps {
  photos: Map<string, Photo[]>;
}

export const HorizontalSlider = ({ photos }: HorizontalSliderProps) => {
  const [currentPhoto, setCurrentPhoto] = React.useState(photos.get("1"));

  return (
    <React.Fragment>
      <button className='w-14 mx-auto rounded-full bg-yellow-300 px-2 py-4 hover:bg-rose-400 h-20 transition-all duration-300 cursor-pointer'>
        <ChevronDown className="mx-auto rotate-90" />
      </button>
      <div className="relative flex flex-row items-center justify-center flex-wrap w-max xl:max-w-[1000px] gap-4 mx-auto">
        <p className="text-5xl w-max font-bold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-58%]">
          {`vacaciones diferentes :)`}
        </p>
        {currentPhoto &&
          currentPhoto.map((photo, index) => (
            <img
              src={photo.src}
              alt={photo.alt}
              className={`object-cover w-[${photo.width}px] h-[${photo.height}px]`}
              key={index}
            />
          ))}
      </div>
      <button className='w-14 mx-auto rounded-full bg-yellow-300 px-2 py-4 hover:bg-rose-400 h-20 transition-all duration-300 cursor-pointer'>
        <ChevronDown className="mx-auto -rotate-90" />
      </button>
    </React.Fragment>
  );
};