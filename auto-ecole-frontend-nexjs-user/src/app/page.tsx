'use client';

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCarSide, FaRoad, FaIdCard, FaCalendarAlt,FaClock, FaRegClock, FaInstagram, FaFacebookF } from "react-icons/fa";
import { RiSteering2Fill } from "react-icons/ri";
import Header from "../components/ui/Header";
import Link from "next/link";

export default function Home() {
  
  const [formation] = useState([
    {
      id: 1,
      title: "Formation Permis B",
      description: "Apprenez à conduire en toute sécurité avec notre formation complète.",
      start_date: "2023-11-15",
      duration_weeks: 12,
      price: 1200.50,
      category: { id: 1, name: "Permis B" },
      schedule: "[\"9h-12h\", \"14h-17h\"]",
      registration_end_date: "2023-11-10",
      couverture: "/images/permiA.jpg"
    },    {
      id: 2,
      title: "Formation Permis B",
      description: "Apprenez à conduire en toute sécurité avec notre formation complète.",
      start_date: "2023-11-15",
      duration_weeks: 12,
      price: 1200.50,
      category: { id: 1, name: "Permis B" },
      schedule: "[\"9h-12h\", \"14h-17h\"]",
      registration_end_date: "2023-11-10",
      couverture: "/images/permiB.jpg"
    }

  ]);

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { 
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  return (
    <div className="dark:bg-foreground-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/handsome-elegant-man-car-salon.jpg"
            alt="Conduite accompagnée"
            fill
            className="object-cover"
            priority
          />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent dark:from-background-900/60" />        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex items-center px-8"
        >
          <div className="max-w-2xl space-y-6 text-background-800">
            <h1 className="text-5xl font-bold leading-tight">
              Devenez un conducteur <span className="text-theme-t">confiant</span> avec nos experts
            </h1>
            <div className="flex gap-4">
              <button className="bg-theme-t text-background-800 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-theme-t/90 transition-all">
                <RiSteering2Fill />
                S`inscrire maintenant
              </button>
              <button className="border-2 border-background-800 text-background-800 px-8 py-3 rounded-full hover:bg-background-100/10 transition-all">
                Découvrir
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background-100 dark:bg-foreground-800">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-background-200 dark:bg-foreground-700 p-8 rounded-2xl shadow-xl"
          >
            <FaCarSide className="text-4xl text-theme-t mb-4" />
            <h3 className="text-xl font-bold mb-2">Véhicules Modernes</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Parc automobile récent équipé des dernières technologies de sécurité
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-background-200 dark:bg-foreground-700 p-8 rounded-2xl shadow-xl"
          >
            <FaRoad className="text-4xl text-theme-t mb-4" />
            <h3 className="text-xl font-bold mb-2">Circuits Adaptés</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Plateaux d`entraînement privés et parcours urbains réalistes
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-background-200 dark:bg-foreground-700 p-8 rounded-2xl shadow-xl"
          >
            <FaIdCard className="text-4xl text-theme-t mb-4" />
            <h3 className="text-xl font-bold mb-2">Examens Blancs</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simulations complètes avec inspecteurs professionnels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formation Timeline */}
      <section className="py-16 bg-background-200 dark:bg-foreground-900" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Méthode en 4 Étapes</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {['Évaluation', 'Théorie', 'Pratique', 'Examen'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-background-100 dark:bg-foreground-800 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-theme-t rounded-full flex items-center justify-center text-background-100 mx-auto mb-4">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Processus étape par étape pour une progression maîtrisée
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Nouveautés Section */}
      <section className="py-16 bg-background-100 dark:bg-foreground-800">
        <div className="container mx-auto px-4">
        <div id="formations" ></div>
          <h2 className="text-3xl font-bold text-center mb-12">Nos Formations</h2>
          
          <div className="grid md:grid-cols-2 gap-8 ">
          {formation.map((forma) => (
            <motion.div
              key={forma.id}
              whileHover={{ scale: 1.02 }}
              className="bg-background-200 dark:bg-foreground-700 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Image de la formation (à remplacer par une image dynamique si disponible) */}
              <div className="relative h-64">
                <Image
                  src={forma.couverture} // Remplacez par une image dynamique si disponible
                  alt={`Formation ${forma.title}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 text-background-800">
                {/* Titre et catégorie */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-theme-t px-4 py-1 rounded-full">
                    {forma.category?.name || "Non catégorisé"} {/* Affiche la catégorie */}
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FaRegClock />
                    <span>{forma.duration_weeks} semaines</span> {/* Durée en semaines */}
                  </div>
                </div>

                {/* Titre de la formation */}
                <h3 className="text-xl font-bold mb-2">{forma.title}</h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {forma.description}
                </p>

                {/* Dates importantes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-theme-t" />
                      <span>Début : {new Date(forma.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-theme-t" />
                      <span>Fin d`inscription : {forma.registration_end_date ? new Date(forma.registration_end_date).toLocaleDateString() : "Aucune date"}</span>
                    </div>
                  </div>

                  {/* Horaires (si disponibles) */}
                  {forma.schedule && (
                    <div className="flex items-center gap-2">
                      <FaClock className="text-theme-t" />
                      <span>Horaires : {JSON.parse(forma.schedule).join(", ")}</span>
                    </div>
                  )}
                </div>

                {/* Prix et bouton de réservation */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-theme-t">
                    {forma.price.toFixed(2)} Ar
                  </span>
                  <Link href={`/inscription/${forma.id}`}>
                    <button className="bg-theme-t text-background-800 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-theme-t/90 transition-all">
                      <RiSteering2Fill />
                      Réserver
                    </button>
                  </Link>

                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground-900 text-background-100 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Auto-École Excellence</h3>
            <p className="text-gray-400">
              Votre réussite, notre priorité depuis 2005
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 01 23 45 67 89</li>
              <li>📧 contact@excellence-autoecole.com</li>
              <li>📍 123 Rue de la Conduite, 75000 Paris</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Réseaux sociaux</h4>
            <div className="flex gap-4">
              <FaInstagram className="text-2xl hover:text-theme-t cursor-pointer" />
              <FaFacebookF className="text-2xl hover:text-theme-t cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Horaires</h4>
            <ul className="text-gray-400">
              <li>Lun-Ven : 8h-20h</li>
              <li>Sam : 9h-18h</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400">
            © 2024 Auto-École Excellence - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}


// 'use client';

// import { useState } from "react";
// import Image from "next/image";

// // import Button from "@/components/ui/Button";
// import { FaBook, FaSpaceShuttle} from "react-icons/fa";
// import Header from "../components/ui/Header";
// import Formation from "../components/ui/Formation";

// export default function Home() {

  

//   const [formation, setFormation] = useState([
//     {
//       idFormation:0,
//       idCategorie:2,
//       idExam:4,
//       image: "/images/couverture.jpg",
//       dateFormation: "12 Mars 2025",
//       dureeFormation: "2 mois +",
//       typePermis: "A",
//       dateExamenCode: "23 Novembre 2025",
//       dateExamenConduite: "30 Decembre 2025",
//       description: "Pour plus d'information, vous pouvez consulter directement au point de service CCA Ivato"
//     },{

//       idFormation:3,
//       idCategorie:1,
//       idExam:4,
//       image: "/images/couverture.jpg",
//       dateFormation: "12 Mars 2025",
//       dureeFormation: "2 mois +",
//       typePermis: "A",
//       dateExamenCode: "23 Novembre 2025",
//       dateExamenConduite: "30 Decembre 2025",
//       description: "Pour plus d'information, vous pouvez consulter directement au point de service CCA Ivato"
//     },{
//       idFormation:2,
//       idCategorie:2,
//       idExam:2,
//       image: "/images/couverture.jpg",
//       dateFormation: "12 Mars 2025",
//       dureeFormation: "2 mois +",
//       typePermis: "A",
//       dateExamenCode: "23 Novembre 2025",
//       dateExamenConduite: "30 Decembre 2025",
//       description: "Pour plus d'information, vous pouvez consulter directement au point de service CCA Ivato"
//     },
//   ])


//   return (
//     <div className="">

//       <main className="main h-full w-full">
//         <Header></Header>
//         <div className="w-full md:h-[350px] h-[250px] pb-8" >

//           <div className="h-full w-full flex justify-center items-center " >
//             <div className="" >
//               <Image src={"/images/couverture.jpg"} alt="logo" width={400} height={400} ></Image>
//             </div>
//           </div>
//         </div>
//         <div className="bg-background-100 dark:bg-foreground-100 dark:text-background-100 w-full h-full flex justify-center pt-8 pb-4" >
//           <div className="w-11/12 h-full " >
//             <div className="w-full h-full flex flex-col md:flex-row justify-evenly" >
//               <div className="p-4 w-full md:w-1/2 " >
//                 <Image src={"/images/couverture.jpg"} alt="logo" width={1000} height={1000} className="rounded-2xl" ></Image>
//               </div>
//               <div className="italic w-full md:w-1/2 p-4" >
//                 <div className="text-xl py-4" >Introduction:</div>
//                 <div className="text-sm" >
//                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt veritatis vel vero commodi velit, rerum cupiditate aliquid nulla est cum sint voluptates, incidunt sunt quae architecto labore iste quibusdam odit! Accusantium illo molestiae quidem labore vitae, beatae voluptatum at eum veniam nisi harum laborum sint tempore. Illo, repudiandae exercitationem. Eius, iure autem? Aut autem dolorem, totam optio dolorum dicta eveniet assumenda a suscipit, numquam quas? Tempore eos recusandae eligendi a nostrum nobis odio eaque obcaecati aliquam sit molestiae rerum deleniti, fugiat quod excepturi ullam quos repellat voluptatum perspiciatis doloremque libero. Odio eligendi deleniti sunt! Totam dignissimos asperiores corrupti pariatur enim?

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <section className="bg-background-100 dark:bg-foreground-100 w-full h-full flex justify-center pb-4 dark:text-background-100" >
//           <div className="w-11/12 h-full p-4" >
//             <div className="text-xl italic text-center py-8 font-bold" >- Divers -</div>
//             <div className="w-full h-full flex md:flex-row flex-col justify-evenly items-center" >
//               <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
//                 <div>
//                   <FaBook size={150} className="dark:text-background-200" ></FaBook>
//                   <div className="text-sm text-center font-semibold py-4 text-theme-f" >Historique</div>
//                   <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100 dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
//                 <div>
//                   <FaSpaceShuttle size={150} className="dark:text-background-200" ></FaSpaceShuttle>
//                   <div className="text-sm text-center font-semibold py-4 text-theme-f" >Terrain</div>
//                   <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100 dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
//                 <div>
//                   <FaBook size={150} className="dark:text-background-200" ></FaBook>
//                   <div className="text-sm text-center font-semibold py-4 text-theme-f" >Historique</div>
//                   <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100 dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/6 h-64 flex justify-center items-center bg-background-200  dark:bg-foreground-200 dark:text-background-100 pt-12 mb-10 md:mb-0 rounded-2xl" >
//                 <div>
//                   <FaBook size={150} className="dark:text-background-200" ></FaBook>
//                   <div className="text-sm text-center font-semibold py-4 text-theme-f" >Historique</div>
//                   <button className="font-bold px-4 w-full flex justify-center text-sm py-2 border-b-2 border-theme-f bg-background-100  dark:bg-foreground-100 dark:hover:bg-background-200 dark:hover:text-foreground-100 dark:text-background-100 rounded-xl hover:bg-white hover:text-background-100 transition-all duration-900" >Voir</button>
//                 </div>
//               </div>
//             </div>
            
//           </div>
//         </section>
//         <section className="bg-background-100 dark:bg-foreground-100 dark:text-background-100 w-full h-full py-2 md:py-8" >
//           <div className="w-full h-full text-xl italic text-center py-4 md:py-8 font-bold" >- Nouveautes -</div>
//           <div className="w-full h-full flex items-center justify-center" > 
//             <div className="w-11/12 md:h-[500px] h-full rounded-2xl bg-background-200 dark:bg-foreground-200 " >
//               <div className="h-full w-full flex md:flex-row flex-col md:items-center md:py-6" >
//                 {
//                   formation.map((forma) => (
//                     <Formation 
//                       key={forma.idFormation}
//                       idFormation={forma.idFormation}
//                       idCategorie={forma.idCategorie}
//                       idExam={forma.idExam}
//                       image={forma.image}
//                       typePermis={forma.typePermis}
//                       dateFormation={forma.dateFormation}
//                       dureeFormation={forma.dureeFormation}
//                       dateExamenCode={forma.dateExamenCode}
//                       dateExamenConduite={forma.dateExamenConduite}
                    
//                   />
//                   ))
//                 }
//               </div>

//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="h-full w-full flex justify-center">

//       </footer>
//     </div>
//   );
// }
