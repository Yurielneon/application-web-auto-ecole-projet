"use client";

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import Header from "./Header";
import useAuth from '@/hooks/useAuth';

export default function EspaceMenu ({children}: {children: React.ReactNode}) {
    
    const usePath = usePathname();
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if(!isAuthenticated) {
        return null;
    }

    return(
            <main>
                <Header></Header>
                <div className='w-full h-full md:mt-12 md:pt-16 mt-4 md:p-4 text-sm' >
                    <div className='w-full h-full flex md:flex-row flex-col' >
                        <div className='w-1/4 md:block hidden h-full bg-background-200 dark:bg-foreground-200 px-4 py-6 rounded-2xl mr-4' >
                            <div className='w-full h-full justify-center items-center flex' >
                                <Image src={'/images/couverture.jpg'} width={250} height={250} className='rounded-2xl' alt='image'></Image>
                            </div>
                            <div className='md:py-8 ' >
                                <div className='' >
                                    <Link href={"/espace/cours"} className={usePath === "espace/programme"? "bg-green-500 text-black ":""} >
                                        <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                            Cours de votre categorie
                                        </div>
                                    </Link>
                                    <Link href={"/espace/programme"} className={usePath === "espace/programme"? "bg-green-500 text-black ":""} >
                                        <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                            Nos programme
                                        </div>
                                    </Link>
                                    <Link href={"/espace/simulation"} className={usePath === "espace/simulation"? "bg-green-500 text-black ":""} >
                                        <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                            Simulation d`examen
                                        </div>
                                    </Link>
                                    <Link href={"/espace/contact"} className={usePath === "espace/contact"? "bg-green-500 text-black ":""} >
                                        <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                            Contacter l`administration
                                        </div>
                                    </Link>                                
                                    <Link href={"/espace/information/1"} className={usePath === "espace/information/"? "bg-green-500 text-black ":""} >
                                        <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                            Attestations et informations
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='md:hidden block w-full h-10' >
                            <div className='flex w-full h-10 justify-center items-center' >
                                <Link href={"/espace/cours"} className={usePath === "espace/contact"? "bg-green-500 text-black ":""} >
                                    <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                        Cours
                                    </div>
                                </Link>
                                <Link href={"/espace/programme"} className={usePath === "espace/contact"? "bg-green-500 text-black ":""} >
                                    <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                        Programme
                                    </div>
                                </Link>
                                <Link href={"/espace/simulation"} className={usePath === "espace/contact"? "bg-green-500 text-black ":""} >
                                    <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                        Simulation
                                    </div>
                                </Link>
                                <Link href={"/espace/contact"} className={usePath === "espace/contact"? "bg-green-500 text-black ":""} >
                                    <div className='text-foreground-100 dark:text-background-100 bg-background-100 dark:bg-foreground-100 hover:bg-theme-t hover:text-white font-semibold px-4 py-3 my-1' >
                                        Contact
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='w-full md:h-[500px] h-full md:overflow-y-scroll rounded-2xl' >
                            {children}
                        </div>
                    </div>
                </div>
            </main>       
    )
}