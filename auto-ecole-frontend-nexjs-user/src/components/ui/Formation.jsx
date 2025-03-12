"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button"


const Formation = ({ image, typePermis, dateFormation, dureeFormation, dateExamenCode, dateExamenConduite, description, ...props}) => {
  
    let allId;
    const handleClickFormation = ({...props}) => {
        allId = 
        {
            form: props.idFormation, 
            cate: props.idCategorie,
            exam: props.idExam
        }
        console.log(allId)
        localStorage.setItem("reqFormation", JSON.stringify(allId))
    } 

    return (
        <div className=" md:w-1/3 w-11/12 md:h-[90%] h-[350px] rounded-2xl bg-background-100 dark:bg-foreground-100 md:ml-4 mt-4 md:mt-0 relative " >
            <div className="w-full bg-theme-f py-1 text-sm rounded-t-2xl text-center text-white font-semibold italic shadow-2xl shadow-black" >Formation en mois de Mars 2025</div>
            <div className="md:px-4 px-2 absolute" >
            <Image src={image} alt="logo" width={1000} height={10} className="rounded-b-3xl" ></Image>
            </div>
            <div className="_formation w-full h-[90%] flex flex-col justify-end px-8 pb-8 hover:pb-0 rounded-b-2xl text-sm z-20 relative hover:bg-transparent-b hover:dark:bg-transparent-w" >
                <div className="font-medium flex italic py-1" >
                    <div className="text-theme-f font-semibold " > Type de permis:</div>
                    <div className="font-medium pl-1">{typePermis}</div>
                </div>
                <div className="w-full font-medium flex flex-row italic py-1" >
                    <div className="text-gray-300 dark:text-gray-900" > Date de debut de formation:</div>
                    <div className="font-medium pl-1" > {dateFormation}</div>
                </div>
                <div className="w-full font-medium flex flex-row italic py-1" >
                    <div className="text-gray-300 dark:text-gray-900  " > Duree de formation:</div>
                    <div className="font-medium pl-1" > {dureeFormation}</div>
                </div>
                <div className="_formationP w-full font-medium flex italic py-1" >
                    <div className="text-gray-300 dark:text-gray-900  " > Date d`examen du code:</div>
                    <div className="font-medium pl-1" > {dateExamenCode}</div>
                </div>
                <div className="_formationP font-medium flex italic py-1" >
                    <div className="text-gray-300 dark:text-gray-900  " > Date d`examen de conduite:</div>
                    <div className="font-medium pl-1" > {dateExamenConduite}</div>
                </div>
                <div className="_formationP font-medium flex italic py-1" >
                    <div className="text-gray-300 dark:text-gray-900  " > Description:</div>
                    <div className="font-medium pl-1" > {description}</div>
                </div>
                <div className="_formationP w-full flex justify-evenly items-center py-2 md:pb-0 mb-4" >
                    {/* <Button variant={"primary"} size={"md"}  ></Button> */ }
                    {/* <Link href={'/inscription'} >
                        <button onClick={() => {handleClickFormation(props)}} className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600" >Suivre cette formation</button>
                    </Link> */}
                    <Link href={'/inscription'} >
                        <Button size="sm" variant="primary" onClick={() => {handleClickFormation(props)}}>Suivre cette formation</Button>
                   </Link>
                </div>
            </div>
                
        </div>  
        )
}

export default Formation