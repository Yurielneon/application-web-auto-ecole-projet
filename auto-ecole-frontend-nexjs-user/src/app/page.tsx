'use client';

import { useState } from "react";
import Image from "next/image";

// import Button from "@/components/ui/Button";
import { FaBook, FaSpaceShuttle} from "react-icons/fa";
import Header from "../components/ui/Header";
import Formation from "../components/ui/Formation";

export default function Home() {

  

  const [formation, setFormation] = useState([
    {
      idFormation:0,
      idCategorie:2,
      idExam:4,
      image: "/images/couverture.jpg",
      dateFormation: "12 Mars 2025",
      dureeFormation: "2 mois +",
      typePermis: "A",
      dateExamenCode: "23 Novembre 2025",
      dateExamenConduite: "30 Decembre 2025",
      description: "Pour plus d'information, vous pouvez consulter directement au point de service CCA Ivato"
    },{

      idFormation:3,
      idCategorie:1,
      idExam:4,
      image: "/images/couverture.jpg",
      dateFormation: "12 Mars 2025",
      dureeFormation: "2 mois +",
      typePermis: "A",
      dateExamenCode: "23 Novembre 2025",
      dateExamenConduite: "30 Decembre 2025",
      description: "Pour plus d'information, vous pouvez consulter directement au point de service CCA Ivato"
    },{
      idFormation:2,
      idCategorie:2,
      idExam:2,
      image: "/images/couverture.jpg",
      dateFormation: "12 Mars 2025",
      dureeFormation: "2 mois +",
      typePermis: "A",
      dateExamenCode: "23 Novembre 2025",
      dateExamenConduite: "30 Decembre 2025",
      description: "Pour plus d'information, vous pouvez consulter directement au point de service CCA Ivato"
    },
  ])


  return (
    <div className="">

      <main className="main h-full w-full">
        <Header></Header>
        <div className="w-full md:h-[350px] h-[250px] pb-8" >

          <div className="h-full w-full flex justify-center items-center " >
            <div className="" >
              <Image src={"/images/couverture.jpg"} alt="logo" width={400} height={400} ></Image>
            </div>
          </div>
        </div>
        <div className="bg-background-100 dark:bg-foreground-100 dark:text-background-100 w-full h-full flex justify-center pt-8 pb-4" >
          <div className="w-11/12 h-full " >
            <div className="w-full h-full flex flex-col md:flex-row justify-evenly" >
              <div className="p-4 w-full md:w-1/2 " >
                <Image src={"/images/couverture.jpg"} alt="logo" width={1000} height={1000} className="rounded-2xl" ></Image>
              </div>
              <div className="italic w-full md:w-1/2 p-4" >
                <div className="text-xl py-4" >Introduction:</div>
                <div className="text-sm" >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt veritatis vel vero commodi velit, rerum cupiditate aliquid nulla est cum sint voluptates, incidunt sunt quae architecto labore iste quibusdam odit! Accusantium illo molestiae quidem labore vitae, beatae voluptatum at eum veniam nisi harum laborum sint tempore. Illo, repudiandae exercitationem. Eius, iure autem? Aut autem dolorem, totam optio dolorum dicta eveniet assumenda a suscipit, numquam quas? Tempore eos recusandae eligendi a nostrum nobis odio eaque obcaecati aliquam sit molestiae rerum deleniti, fugiat quod excepturi ullam quos repellat voluptatum perspiciatis doloremque libero. Odio eligendi deleniti sunt! Totam dignissimos asperiores corrupti pariatur enim?

                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="bg-background-100 dark:bg-foreground-100 w-full h-full flex justify-center pb-4 dark:text-background-100" >
          <div className="w-11/12 h-full p-4" >
            <div className="text-xl italic text-center py-8 font-bold" >- Divers -</div>
            <div className="w-full h-full flex md:flex-row flex-col justify-evenly items-center" >
              <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
                <div>
                  <FaBook size={150} className="dark:text-background-200" ></FaBook>
                  <div className="text-sm text-center font-semibold py-4 text-theme-f" >Historique</div>
                  <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100 dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
                </div>
              </div>
              <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
                <div>
                  <FaSpaceShuttle size={150} className="dark:text-background-200" ></FaSpaceShuttle>
                  <div className="text-sm text-center font-semibold py-4 text-theme-f" >Terrain</div>
                  <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100 dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
                </div>
              </div>
              <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
                <div>
                  <FaBook size={150} className="dark:text-background-200" ></FaBook>
                  <div className="text-sm text-center font-semibold py-4 text-theme-f" >Historique</div>
                  <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100 dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
                </div>
              </div>
              <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
                <div>
                  <FaBook size={150} className="dark:text-background-200" ></FaBook>
                  <div className="text-sm text-center font-semibold py-4 text-theme-f" >Historique</div>
                  <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100  dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 dark:text-background-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
                </div>
              </div>
            </div>
            
          </div>
        </section>
        <section className="bg-background-100 dark:bg-foreground-100 dark:text-background-100 w-full h-full py-2 md:py-8" >
          <div className="w-full h-full text-xl italic text-center py-4 md:py-8 font-bold" >- Nouveautes -</div>
          <div className="w-full h-full flex items-center justify-center" > 
            <div className="w-11/12 md:h-[500px] h-full rounded-2xl bg-background-200 dark:bg-foreground-200 " >
              <div className="h-full w-full flex md:flex-row flex-col md:items-center md:py-6" >
                {
                  formation.map((forma) => (
                    <Formation 
                      key={forma.idFormation}
                      idFormation={forma.idFormation}
                      idCategorie={forma.idCategorie}
                      idExam={forma.idExam}
                      image={forma.image}
                      typePermis={forma.typePermis}
                      dateFormation={forma.dateFormation}
                      dureeFormation={forma.dureeFormation}
                      dateExamenCode={forma.dateExamenCode}
                      dateExamenConduite={forma.dateExamenConduite}
                    
                  />
                  ))
                }
              </div>

            </div>
          </div>
        </section>
      </main>
      <footer className="h-full w-full flex justify-center">

      </footer>
    </div>
  );
}
