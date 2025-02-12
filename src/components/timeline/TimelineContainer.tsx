import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import TimelineMock from "@utils/timelineMock.json";

interface TimelineContainerProps {
  handleButtonDate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void;
  className?: string;
  currentDate: string;
}

export const TimelineContainer = ({ handleButtonDate, className, currentDate }: TimelineContainerProps) => {
  const [timelineBarHeight, setTimelineBarHeight] = useState(100);
  const containerTimelineRef = useRef<HTMLDivElement>(null);
  const buttonSliderRef = useRef<HTMLDivElement>(null);

  // Recalcular posición del slider cada vez que la fecha cambie
  useEffect(() => {
    if (containerTimelineRef.current && buttonSliderRef.current) {
      const selectedButton = containerTimelineRef.current.querySelector(
        `.dateBoxes button[data-date="${currentDate}"]`
      ) as HTMLButtonElement;

      if (selectedButton) {
        const buttonRect = selectedButton.getBoundingClientRect();
        const containerRect = containerTimelineRef.current.getBoundingClientRect();
        const buttonOffsetTop = buttonRect.top - containerRect.top + containerTimelineRef.current.scrollTop;
        const sliderTop = buttonOffsetTop + selectedButton.offsetHeight / 2 - buttonSliderRef.current.offsetHeight / 2;

        buttonSliderRef.current.style.transform = `translateY(${sliderTop}px)`;
      }
    }
  }, [currentDate]); // Actualiza cada vez que el currentDate cambia

  // Ajustar la altura del timeline dinámicamente
  useEffect(() => {
    const handleResize = () => {
      const container = containerTimelineRef.current;
      if (container) {
        const containerRect = container.scrollHeight;
        setTimelineBarHeight(containerRect);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar inmediatamente para calcular la altura al inicio

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerTimelineRef}
      className={twMerge(
        `scrollNone flex shadow-lg relative flex-col items-start justify-start gap-6 w-[30%] min-h-[700px] rounded-xl overflow-y-scroll`,
        className
      )}
    >
      <div
        style={{ height: `${timelineBarHeight - 48}px` }}
        className="absolute top-0 left-1/2 my-6 -translate-x-1/2 w-3 bg-gray rounded-lg"
      ></div>
      <div className="containerTimeline py-6 px-1 absolute left-0 flex flex-col items-center justify-start gap-20 w-full">
        {TimelineMock.timeline.map((item, index) => (
          <div
            className="dateBoxes relative flex flex-row items-center odd:justify-start justify-end w-full gap-6 font-nunito h-[2rem] bg-amber-100/20 rounded-xl p-2 group"
            key={index}
          >
            <p className="font-nunito group-hover:font-bold transition-all">{item.date}</p>
            <button
              data-date={item.date}
              onClick={(e) => handleButtonDate(e, item.date)}
              className={`absolute left-1/2 cursor-pointer -translate-x-1/2 top-0 ${
                currentDate === item.date ? "bg-gray" : "bg-white"
              } border border-gray rounded-full w-8 h-8 font-nunito font-bold hover:bg-gray-500 transition-all duration-500`}
            ></button>
          </div>
        ))}
        <div
          ref={buttonSliderRef}
          className="buttonSlider transition-all ease-out duration-500 flex w-8 h-8 rounded-full bg-gray-600 absolute top-0 left-1/2 -translate-x-1/2"
        ></div>
      </div>
    </div>
  );
};
