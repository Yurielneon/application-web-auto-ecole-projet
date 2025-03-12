"use client";

import React from 'react'
import Link from "next/link";
import { useState, useEffect } from 'react';
import { FaMoon, FaSun} from "react-icons/fa";
import { usePathname } from 'next/navigation';


const Header = () => {

    const pathname = usePathname(); //recupere l'URL actuelle
    const [darkMode,setDarkMode] = useState(false);


      const toggledarkMode = () => {
        if (darkMode) {
          setDarkMode(false)
          document.documentElement.classList.remove("dark")
          localStorage.setItem("theme", "light");
        } else {
          setDarkMode(true)
          document.documentElement.classList.add("dark")
          localStorage.setItem("theme","dark")
        }
      }

      
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)

    }
  }, [])

  return (
        <header className="h-10 w-full flex justify-center " >
          <div className="h-12 flex w-full md:w-2/3 md:scale-90 md:-translate-y-1 hover:scale-100 transition-all duration-800 bg-transparent-b backdrop-blur-sm fixed rounded-null md:rounded-b-full " >
            <div className="h-full w-full flex justify-evenly items-center" >
              <Link href={"/"} className={pathname === "/" ? 
                "font-semibold px-2 py-2 text-sm text-theme-f border-t-4 border-white flex items-center":
                "font-semibold px-2 py-2 text-sm hover:text-theme-f hover:border-t-4 border-white flex items-center"
              } >
                <div className="pl-2 italic text-sm " >Actualites</div>
              </Link>
              <Link href={"/inscription"} className={pathname === "/inscription"?
                "font-semibold italic text-sm text-theme-f px-2 py-2 border-t-4 border-white flex items-center ":
                "font-semibold italic text-sm hover:text-theme-f px-2 py-2 hover:border-t-4 border-white flex items-center "
              } >
                <div className="pl-2 italic text-sm   " >Inscription</div>
              </Link>
              <Link href={"/espace/cours"}  className={pathname === "/espace"?
                "font-semibold italic text-sm text-theme-f px-2 py-2 border-t-4 border-white flex items-center ":
                "font-semibold italic text-sm hover:text-theme-f px-2 py-2 hover:border-t-4 border-white flex items-center "
              }  >
                <div className="pl-2 italic text-sm  " >Espace</div>
              </Link>
              <Link href={"#"} className="font-semibold italic text-sm hover:text-theme-f px-2 py-2 hover:border-t-4 border-white flex items-center " >
                <div className="pl-2 italic text-sm  " >Autres</div>
              </Link>

            </div>
            <button onClick={toggledarkMode} className={` ${darkMode ? 'bg-background-100 text-foreground-100':'bg-foreground-100 text-background-100'} w-10 h-10 absolute -right-14 top-2 flex justify-center items-center backdrop-blur-md rounded-full mb-8`} >
            {darkMode ? <FaMoon size={28} ></FaMoon>: <FaSun size={25} ></FaSun>}
            </button>

          </div>

        </header>  )
}

export default Header