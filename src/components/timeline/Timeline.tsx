import React, { useState } from "react";
import TimelineMock from "@utils/timelineMock.json";

export const Timeline = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [timeline, setTimeline] = useState(TimelineMock.timeline);
  const [currentDate, setCurrentDate] = useState(TimelineMock.timeline[0].date);
  const [allDates, setAllDates] = useState(TimelineMock.timeline.map((date) => date.date));
  const [currentContent, setCurrentContent] = useState(TimelineMock.timeline[0].content);

  const handleButtonDate = (date: string) => {
    
    setCurrentDate(date);
    setCurrentContent(TimelineMock.timeline.find((item) => item.date === date)?.content || []);

  }

  return (   
    <div className="flex flex-row items-center justify-center gap-6 w-full">
      {/* <!-- linea de tiempo --> */}
      <div className="relative flex flex-col items-center justify-center gap-6 w-[30%] min-h-[700px] rounded-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gray rounded-lg"></div>
        <div className="absolute top-0 left-0 flex flex-col items-center justify-start gap-20 h-full w-full">
          {/* <!-- fecha y boton --> */}
          {allDates.map((date, index) => (
            <div 
              className="relative flex flex-row items-center odd:justify-start justify-end w-full gap-6 font-nunito h-[2rem] bg-amber-100/20 rounded-xl p-2 group" 
              key={index}
            >
              {/* Texto que cambia a bold cuando el botón está en hover */}
              <p className="font-nunito group-hover:font-bold transition-all">{date}</p>

              {/* Botón con grupo personalizado */}
              <button 
              onClick={() => {
                setCurrentDate(date)
                handleButtonDate(date)
              }}
              className={`absolute left-1/2 cursor-pointer -translate-x-1/2 top-0 ${currentDate === date ? "bg-gray" : "bg-white"} border border-gray rounded-full w-8 h-8 font-nunito font-bold hover:bg-gray-500 transition-all `}>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* <!-- contenido del dia --> */}
      <div className="flex flex-col items-center justify-start gap-12 w-[70%] shadow-xl bg-textura h-[700px] rounded-xl overflow-auto py-5">
        {currentContent && currentContent.map((cardContent, index) => (
            <div className="flex flex-row-reverse odd:flex-row items-center justify-start gap-16 w-[98%] h-full px-2 py-8 bg-white/30 ">
                    <div className={`relative flex flex-col ${index % 2 === 0 ? "-rotate-2" : "rotate-2"} items-center justify-center gap-6 h-max py-8 rounded-sm bg-white p-3 min-w-max `}>
                        <img src={cardContent.image} alt={cardContent.titleImage} width={300} height={400} className="rounded-xl object-cover object-center" />
                        <p className="text-center font-delicious-small-caps text-xl">{cardContent.titleImage}</p>
                    </div>
                    <p className={` min-w-[660px] min-h-[400px]  w-auto ${index % 2 === 0 ? "mr-1" : "ml-4"} text-lg font-nunito`}>{cardContent.description}
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, excepturi! Iure soluta rerum inventore quos placeat eligendi quaerat maiores minima?</p>
                    </p>
                </div>
        ))}
      </div>
    </div>
  );
};