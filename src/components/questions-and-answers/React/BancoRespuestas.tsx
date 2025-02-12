import React, { act, useEffect, useRef, useState } from "react";
import { questions, type Question } from "@utils/questionsMock.ts";
import ChevronDown from "@components/reactComponents/ChevronDown";
import { useDebounce } from "use-debounce";

export const BancoRespuestas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<Question[][]>([]);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const [debouncedValue] = useDebounce(searchValue, 300);

  const QUESTIONS_PER_PAGE = 4;

  useEffect(() => {
    // Agrupar las preguntas en arrays de 3 en 3
    const groupedQuestions: Question[][] = [];
    for (let i = 0; i < questions.length; i += QUESTIONS_PER_PAGE) {
      groupedQuestions.push(questions.slice(i, i + QUESTIONS_PER_PAGE));
    }
    setQuestionsList(groupedQuestions);
  }, []);

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      // Restaurar la lista original si el input está vacío
      const groupedQuestions: Question[][] = [];
      for (let i = 0; i < questions.length; i += QUESTIONS_PER_PAGE) {
        groupedQuestions.push(questions.slice(i, i + QUESTIONS_PER_PAGE));
      }
      setQuestionsList(groupedQuestions);
      setCurrentIndex(0);
      return;
    }

    // Filtrar preguntas basadas en el valor de búsqueda después del debounce
    const relatedQuestions = questions.filter((question) =>
      question.question.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    setQuestionsList([relatedQuestions]);
    setCurrentIndex(0); // Resetear a la primera página
  }, [debouncedValue]);

  const handleActiveQuestion = (index: number) => {
    const globalIndex = currentIndex * QUESTIONS_PER_PAGE + index;
    setActiveQuestion(activeQuestion === globalIndex ? null : globalIndex);
  };


  return (
    <div className="w-full lg:w-[70%] bg-gray-200/75 rounded-xl p-3 flex flex-col items-center justify-center gap-8 shadow-xl pb-12 overflow-auto">
      <h1 className="text-3xl font-bold font-nunito mt-6">
        Banco de Respuestas
      </h1>

      <form className="w-[85%] flex flex-col justify-end items-end gap-2 mb-10 mt-6">
        <label
          htmlFor="coincidencias"
          className="text-lg font-roboto text-center lg:text-right w-full"
        >
          Búsqueda por coincidencias
        </label>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          id="coincidencias"
          type="text"
          className="w-full mx-auto lg:mx-0 rounded-lg px-2 py-4 font-roboto text-black bg-white/75 outline-none shadow-md focus:shadow-xl transition-shadow max-w-[400px]"
          placeholder="Busca las preguntas aquí..."
        />
      </form>

      <ul className="flex flex-col items-center justify-center gap-6 w-full mt-2 mb-10">
        {questionsList.length > 0 ? (
          questionsList[currentIndex].map((question, index) => (
            <li
              key={index}
              onClick={() => handleActiveQuestion(index)}
              className={`relative text-lg font-roboto px-4 py-4 cursor-pointer bg-white 
                text-black rounded-xl shadow-xl w-[85%] mx-auto flex flex-col 
                items-start transition-all duration-300 ease-in-out`}
            >
              <div className="questionsList flex items-center justify-between w-full">
                <p className="question-text font-bold">{question.question}</p>
                <p
                  className={`${activeQuestion === currentIndex * QUESTIONS_PER_PAGE + index ? "bg-yellow px-4  rounded-xl " : "bg-transparent"}  text-2xl transition-all duration-300 text-black font-delicious-small-caps`}
                >
                  {activeQuestion === currentIndex * QUESTIONS_PER_PAGE + index ? "-" : "+"}
                </p>
              </div>
              <p
                className={` text-left text-black font-nunito mt-2 
                ${
                  activeQuestion === currentIndex * QUESTIONS_PER_PAGE + index
                    ? "opacity-100 h-auto"
                    : "opacity-0 h-0"
                } 
                transition-all duration-300 ease-in-out`}
                            >
                {question.answer}
              </p>
            </li>
          ))
        ) : (
          <p className="text-center font-delicious-small-caps text-xl">
            No hay preguntas disponibles
          </p>
        )}
      </ul>

      <div className="relative flex flex-row items-center justify-center gap-4 w-max mt-2 ">
        <p className="text-xl font-delicious-small-caps mx-10">
          Página {questionsList.length > 0 ? currentIndex + 1 : 0} de{" "}
          {questionsList.length}
        </p>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-between gap-4 w-[125%]">
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
            }
            className={`w-9 h-12 rounded-full ${
              currentIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow hover:bg-rose cursor-pointer"
            } px-2 py-4 transition-all duration-300`}
            disabled={currentIndex === 0}
          >
            <ChevronDown className="mx-auto rotate-90" />
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                Math.min(prevIndex + 1, questionsList.length - 1),
              )
            }
            className={`w-9 h-12 rounded-full ${
              currentIndex === questionsList.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow hover:bg-rose cursor-pointer"
            } px-2 py-4 transition-all duration-300`}
            disabled={currentIndex === questionsList.length - 1}
          >
            <ChevronDown className="mx-auto -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};
