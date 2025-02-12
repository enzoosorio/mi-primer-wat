import React, { useEffect, useRef, useState } from "react";
import ChevronDown from "./ChevronDown";
import type { Photo } from "../../types/SliderHorizontal";

const photosMap: Photo[][] = [
  [
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-izquierda.png",
      alt: "photo-1",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-derecha.png",
      alt: "photo-2",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-izquierda.png",
      alt: "photo-3",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-derecha.png",
      alt: "photo-4",
      width: 500,
      height: 300,
    },
  ],
  [
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-izquierda.png",
      alt: "photo-1",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-izquierda.png",
      alt: "photo-2",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-izquierda.png",
      alt: "photo-3",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-derecha.png",
      alt: "photo-4",
      width: 500,
      height: 300,
    },
  ],
  [
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-izquierda.png",
      alt: "photo-1",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-arriba-izquierda.png",
      alt: "photo-2",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-izquierda.png",
      alt: "photo-3",
      width: 500,
      height: 300,
    },
    {
      src: "/images/cardSliderHorizontal/first/img-abajo-derecha.png",
      alt: "photo-4",
      width: 500,
      height: 300,
    },
  ],
];

const albumMessage = [
  "Vacaciones diferentes :)",
  "Experiencias diferentes :)",
  "Proyectos diferentes :)",
]


export const SliderHorizontal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoWidth, setPhotoWidth] = useState(0);


  const prevAlbum = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photosMap.length - 1 : prevIndex - 1
    );
  };

  const nextAlbum = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosMap.length);
  };


  useEffect(() => {
    const updateWidth = () => {
      // setIsMobile(window.innerWidth <= 768);
      setPhotoWidth(window.innerWidth <= 768 ? 420 : 500);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
  
    return () => window.removeEventListener("resize", updateWidth);
  }, []);


  return (
    <div className="no-scrollbar relative flex items-center justify-center gap-24 w-full md:w-max my-20">
      {/* Contenedor principal que aloja todos los álb  umes */}
      <p className="block absolute -top-20 text-3xl lg:hidden left-1/2 -translate-x-1/2 font-delicious-small-caps text-center">Desliza!</p>
      <div className={"no-scrollbar w-[856px] md:w-[1016px] mx-auto flex overflow-x-auto lg:overflow-hidden"}>
        <div
          className="no-scrollbar  flex transition-transform duration-400 ease-in-out lg:w-auto gap-x-6  "
          style={{ transform: `translateX(-${currentIndex * 1016 }px)` }}
        >
          {photosMap.map((album, index) => (
            <div key={index} className="relative flex flex-wrap w-[856px] md:w-[1016px] justify-center gap-4   ">
              <p className="text-5xl w-max font-bold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%]">
                {albumMessage[index]}
              </p>
              {album.map((photo, photoIndex) => (
                <img
                  key={photoIndex}
                  src={photo.src}
                  alt={photo.alt}
                  className={`object-cover h-[300px]  md:w-auto md:h-auto  ${ photoIndex === album.length - 2 || photoIndex === album.length - 1 ? "z-20" : ""}`}
                  style={{ width : `${photoWidth}px`}}
                  width={photo.width}
                  height={photo.height}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

     <div className="absolute hidden lg:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-row items-center lg:justify-center lg:gap-[930px] xl:gap-[1050px] w-[125%] transition-all ">
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
