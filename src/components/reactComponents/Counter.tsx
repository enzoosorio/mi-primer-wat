import React, { useState } from "react";
import ChevronDown from "./ChevronDown";
import type { Photo } from "../../types/SliderHorizontal";

const photosMap: Photo[][] = [
  [
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-izquierda.png",
      alt: "photo-1",
      width: 400,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-derecha.png",
      alt: "photo-2",
      width: 400,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-izquierda.png",
      alt: "photo-3",
      width: 400,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-derecha.png",
      alt: "photo-4",
      width: 400,
      height: 300,
    },
  ],
  [
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-izquierda.png",
      alt: "photo-1",
      width: 400,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-derecha.png",
      alt: "photo-2",
      width: 400,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-izquierda.png",
      alt: "photo-3",
      width: 400,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-derecha.png",
      alt: "photo-4",
      width: 400,
      height: 300,
    },
  ],
];

export const SliderHorizontal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevAlbum = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photosMap.length - 1 : prevIndex - 1
    );
  };

  const nextAlbum = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosMap.length);
  };

  return (
    <div className="relative flex items-center justify-center gap-24 w-full bg-red-900">
      {/* Contenedor principal que aloja todos los álbumes */}
      <div className="w-[816px] mx-auto flex overflow-hidden bg-red-500 ">
        <div
          className="flex transition-transform duration-400 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photosMap.map((album, index) => (
            <div key={index} className="relative flex flex-wrap w-[816px] justify-center gap-4">
              <p className="text-5xl w-max font-bold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-58%]">
                {`vacaciones diferentes :)`}
              </p>
              {album.map((photo, photoIndex) => (
                <img
                  key={photoIndex}
                  src={photo.src}
                  alt={photo.alt}
                  className="object-cover"
                  width={photo.width}
                  height={photo.height}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-between gap-4 w-[125%] ">
     <button
        onClick={prevAlbum}
        className={`w-14 h-20 rounded-full ${
          currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow hover:bg-rose cursor-pointer"
        } px-2 py-4 transition-all duration-300`}
        disabled={currentIndex === 0}
      >
        <ChevronDown className="mx-auto rotate-90" />
      </button>
      <button
        onClick={nextAlbum}
        className={`w-14 h-20 rounded-full ${
          currentIndex === photosMap.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow hover:bg-rose cursor-pointer"
        } px-2 py-4 transition-all duration-300`}
        disabled={currentIndex === photosMap.length - 1}
      >
        <ChevronDown className="mx-auto -rotate-90" />
      </button>
     </div>
    </div>
  );
};
