import React, { useEffect, useRef, useState } from "react";
import TimelineMock from "@utils/timelineMock.json";
import { navigate } from "astro:transitions/client";

export const Timeline = () => {
  const [currentDate, setCurrentDate] = useState(TimelineMock.timeline[0].date);
  const [currentContent, setCurrentContent] = useState(TimelineMock.timeline[0].content);
  const containerTimelineRef = useRef<HTMLDivElement>(null);
  const buttonSliderRef = useRef<HTMLDivElement>(null);

  const handleButtonDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => {
    setCurrentDate(date);
    setCurrentContent(TimelineMock.timeline.find((item) => item.date === date)?.content || []);

    if (containerTimelineRef.current && buttonSliderRef.current) {
      const button = e.currentTarget;
      const container = containerTimelineRef.current;

      // Obtener posición del botón relativo al contenedor scrollable
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const buttonOffsetTop = buttonRect.top - containerRect.top + container.scrollTop;

      // Centrar el slider sobre el botón
      const sliderTop = buttonOffsetTop + button.offsetHeight / 2 - buttonSliderRef.current.offsetHeight / 2;

      buttonSliderRef.current.style.transform = `translateY(${sliderTop}px)`;
    }
  };

  useEffect(() => {
    if (containerTimelineRef.current && buttonSliderRef.current) {
      const firstButton = containerTimelineRef.current.querySelector(".dateBoxes button") as HTMLButtonElement;
      if (firstButton) {
        const buttonRect = firstButton.getBoundingClientRect();
        const containerRect = containerTimelineRef.current.getBoundingClientRect();
        const buttonOffsetTop = buttonRect.top - containerRect.top + containerTimelineRef.current.scrollTop;
        const sliderTop = buttonOffsetTop + firstButton.offsetHeight / 2 - buttonSliderRef.current.offsetHeight / 2;

        buttonSliderRef.current.style.transform = `translateY(${sliderTop}px)`;
      }
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-center gap-6 w-full">
      {/* <!-- linea de tiempo --> */}
      <div 
        ref={containerTimelineRef}
        className="scrollNone  shadow-lg relative flex flex-col items-center justify-center gap-6 w-[30%] min-h-[700px] rounded-xl overflow-y-scroll"
      >
        <div className="absolute top-0 left-1/2 my-6 -translate-x-1/2 w-3 h-[100dvh] bg-gray rounded-lg"></div>
        <div className="containerTimeline py-6 px-1 absolute top-0 left-0 flex flex-col items-center justify-start gap-20 w-full">
          {/* <!-- fecha y boton --> */}
          {TimelineMock.timeline.map((item, index) => (
            <div
              className={`dateBoxes relative flex flex-row items-center odd:justify-start justify-end w-full ${index === TimelineMock.timeline.length - 1 ? "" : ""} gap-6 font-nunito h-[2rem] bg-amber-100/20 rounded-xl p-2 group`}
              key={index}
            >
              {/* Texto que cambia a bold cuando el botón está en hover */}
              <p className="font-nunito group-hover:font-bold transition-all">{item.date}</p>

              {/* Botón con grupo personalizado */}
              <button 
                onClick={(e) => handleButtonDate(e, item.date)}
                className={`absolute left-1/2 cursor-pointer -translate-x-1/2 top-0 ${currentDate === item.date ? "bg-gray" : "bg-white"} border border-gray rounded-full w-8 h-8 font-nunito font-bold hover:bg-gray-500 transition-all duration-500`}
              ></button>
            </div>
          ))}
          <div 
            ref={buttonSliderRef}
            className={`buttonSlider transition-all ease-out duration-500 flex w-8 h-8 rounded-full bg-gray-600 absolute top-0 left-1/2 -translate-x-1/2`}
            // style={{ transform: `translateY(${positionButton}%)` }}
          >
          </div>
        </div>
      </div>
      {/* <!-- contenido del dia --> */}
      <div className="flex flex-col items-center justify-start gap-12 w-[70%] shadow-xl bg-textura h-[700px] rounded-xl overflow-auto py-5">
        {currentContent && currentContent.map((cardContent, index) => (
          <div className="flex flex-row-reverse odd:flex-row items-center justify-start gap-16 w-[98%] h-full px-2 py-8 bg-white/30" key={index}>
            <div className={`relative flex flex-col ${index % 2 === 0 ? "-rotate-2" : "rotate-2"} items-center justify-center gap-6 h-max py-8 rounded-sm bg-white p-3 min-w-max`}>
              <img src={cardContent.image} alt={cardContent.titleImage} width={300} height={400} className="rounded-xl object-cover object-center" />
              <p className="text-center font-delicious-small-caps text-xl">{cardContent.titleImage}</p>
            </div>
            <p className={`min-w-[660px] min-h-[400px] w-auto ${index % 2 === 0 ? "mr-1" : "ml-4"} text-lg font-nunito`}>
              {cardContent.description}
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, excepturi! Iure soluta rerum inventore quos placeat eligendi quaerat maiores minima?</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};