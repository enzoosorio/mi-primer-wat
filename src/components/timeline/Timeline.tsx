import React, { use, useEffect, useRef, useState } from "react";
import TimelineMock from "@utils/timelineMock.json";
import { TimelineContainer } from "./TimelineContainer";

export const Timeline = () => {
  const [currentDate, setCurrentDate] = useState(TimelineMock.timeline[0].date);
  const [currentContent, setCurrentContent] = useState(TimelineMock.timeline[0].content);
  const [isMobile, setIsMobile] = useState(true);
  const [cardContentOpen, setCardContentOpen] = useState<number>(-1);
  const containerTimelineRef = useRef<HTMLDivElement>(null);
  const buttonSliderRef = useRef<HTMLDivElement>(null);
  const [timelineMobileOpen, setTimelineMobileOpen] = useState(false)
  const cardContentRef = useRef<HTMLDivElement>(null);
  //cambio de fechas del timeline
  const handleButtonDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => {
    setCurrentDate(date);
    setCurrentContent(TimelineMock.timeline.find((item) => item.date === date)?.content || []);

    if (containerTimelineRef.current && buttonSliderRef.current) {
      const button = e.currentTarget;
      const container = containerTimelineRef.current;

      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const buttonOffsetTop = buttonRect.top - containerRect.top + container.scrollTop;
      const sliderTop = buttonOffsetTop + button.offsetHeight / 2 - buttonSliderRef.current.offsetHeight / 2;

      buttonSliderRef.current.style.transform = `translateY(${sliderTop}px)`;
    }
  };

  //controlar si es mobile
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

 


  return (
      <>
      <div className={`${cardContentOpen !== -1 ? "block" : "hidden"} absolute inset-0  bg-gray/35 z-30`}></div>
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
      <button 
      onClick={() => setTimelineMobileOpen(true)}
      className="block lg:hidden bg-yellow rounded-xl px-4 py-2 text-black font-delicious-small-caps w-max cursor-pointer hover:bg-rose transition-colors text-xl">Linea de tiempo</button>
      
      {isMobile === false && <TimelineContainer handleButtonDate={handleButtonDate} className="flex" currentDate= {currentDate}/>}
      {isMobile && timelineMobileOpen === true && (
        <div className="absolute inset-0 z-50 bg-white top-0 left-0 flex flex-col items-center justify-center gap-6 ">
          <button 
          onClick={() => setTimelineMobileOpen(false)}
          className="text-xl bg-amber-200 rounded-xl w-max mx-auto cursor-pointer hover:bg-rose transition-colors px-4 py-2 hover:text-white">
            X
          </button>
          <TimelineContainer handleButtonDate={handleButtonDate} className="flex w-full" currentDate= {currentDate}/>
        </div>
      )}

      <div className="flex flex-col items-center justify-start gap-12 w-full lg:w-[70%] shadow-xl bg-textura h-[700px] rounded-xl overflow-auto py-5">
        {currentContent && currentContent.map((cardContent, indexCard) => (
          <div className="flex flex-row-reverse odd:flex-row items-center justify-start gap-4 lg:gap-16 w-[98%] h-full px-2 py-8 bg-white/30" key={indexCard}>
            <div 
            onClick={isMobile ? () => setCardContentOpen(indexCard) : undefined}
            className={`relative flex flex-col ${indexCard % 2 === 0 ? "-rotate-2" : "rotate-2"} hover:scale-110 lg:hover:scale-100 transition-transform cursor-pointer lg:cursor-auto items-center justify-center gap-6 h-max py-4 lg:py-8 rounded-sm bg-white p-3 min-w-max mx-auto lg:mx-0`}>
              <img src={cardContent.image} alt={cardContent.titleImage} width={300} height={400} className="rounded-xl max-w-[250px] lg:max-w-none  object-cover object-center " />
              <p className="text-center font-delicious-small-caps text-lg lg:text-xl">{cardContent.titleImage}</p>
            </div>
            <p className={`hidden lg:block min-w-[660px] min-h-[400px]  w-auto ${indexCard % 2 === 0 ? "mr-1" : "ml-4"} text-lg font-nunito`}>
              {cardContent.description}
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, excepturi! Iure soluta rerum inventore quos placeat eligendi quaerat maiores minima?</span>
            </p>
            <div
            ref={cardContentRef}
            className={`absolute ${cardContentOpen === indexCard ? "left-0 opacity-100" : "left-[200%] opacity-0"} inset-10 mx-auto bg-textura z-40 p-4 rounded-lg shadow-xl w-full flex flex-col gap-2`}
          >
            <button 
            className="text-2xl cursor-pointer mb-6"
            onClick={() => setCardContentOpen(-1)}>
              X
            </button>
            <h3 className="font-delicious-small-caps text-2xl font-bold">Contexto:</h3>
            <p>{cardContent.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};