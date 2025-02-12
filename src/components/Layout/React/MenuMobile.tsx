import React, { use, useEffect, useRef, useState } from "react";

const items = [
    { href: "/", text: "Principio" },
    { href: "/photos", text: "Photos" },
    { href: "/questions-and-answers", text: "Q&A" },
    { href: "/does-it-worth", text: "¿Vale la pena? (opinión personal)" },
    { href: "/timeline", text: "Timeline photo Gallery" },
  ];

export const MenuMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerScroll, setHeaderScroll] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY; 
  
      if (scrollTop > 10) {
        setHeaderScroll(true);
      } else {
        setHeaderScroll(false);
      }
    }
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <header
    ref={headerRef}
    className={`w-full py-4 px-8 sticky top-0 z-[10000] left-0 right-0 ${headerScroll ? " headerBgGradientDark" : "headerBgGradient"} transition-all duration-500 flex flex-row justify-center items-center `}>
    <ul className="hidden lg:flex flex-row justify-between items-center w-full">
      {items.map((item, index) => {
        const isActive = currentPath === item.href;
        return (
          <li 
          key={index}
          className="text-lg">
            <a
              href={item.href}
              className={`anchors-header no-underline rounded-xl font-nunito p-3 transition-all duration-300
                ${
                  isActive && index === items.length - 1 ? "text-white bg-rose" 
                  : isActive && index !=- items.length - 1 ? "text-black bg-yellow"

                    : index === items.length - 1 && !headerScroll
                    ? "text-rose hover:bg-rose hover:text-white"
                    : index !== items.length - 1 && !headerScroll
                    ? "text-black hover:bg-yellow"
                    : "text-white hover:font-bold"
                }`}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
    <button 
    onClick={handleClick}
    className="burguer-menu lg:hidden cursor-pointer z-50 ">
      { menuOpen ? <img src="/svgs/burger-menu-right-color.svg" alt="burger-menu-color" className={'burger-svg w-8 h-8'}/> : <img src={`/svgs/burger-${headerScroll ? "menu-white" : "menu-color"}.svg`} alt="burger-menu-color" className={'burger-svg w-8 h-8'}/> }
    </button>
    <div className={`optionsForMobile lg:hidden absolute inset-0 h-[100dvh] ${menuOpen ? "left-0 opacity-100" : "left-[200%] opacity-0"} bg-regal-blue transition-all duration-300 flex flex-col justify-center items-center gap-20 pt-16`}>
      <ul className="anchorsMobileContainer flex flex-col justify-center items-center w-full gap-12 text-white">
          {items.map((item, index) => (
            <li className="text-2xl font-nunito">
              <a
                href={item.href}
                className={`anchors-header text-white  
                  no-underline rounded-xl font-nunito p-3 
                  transition-all duration-300 ${index === items.length - 1 ? "hover:text-white hover:bg-rose" : "hover:text-black hover:bg-yellow"}`}
              >
                {item.text}
              </a>
            </li>
          ))}
      </ul>
    </div>
  </header>
  );
};
