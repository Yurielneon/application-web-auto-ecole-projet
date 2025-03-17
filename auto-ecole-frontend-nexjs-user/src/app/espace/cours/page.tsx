"use client"; 

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/ui/Layout";
import { GlobalWorkerOptions } from "pdfjs-dist";

// Chargement dynamique du PdfViewer sans SSR
const PdfViewer = dynamic(() => import("@/components/ui/PdfViewer"), { ssr: false });

export default function Cours() {
    const  [duration, setDuration] = useState({
        second: 0,
        minute: 0,
        pourcentage: 0
    })

    useEffect(() => {
        if (typeof window !== "undefined" && GlobalWorkerOptions) {
            GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        }
        const interval = setInterval(() => {
            setDuration((prevDura) => {
                let seconds = prevDura.second + 1;
                let minutes = prevDura.minute;

                if (seconds === 10) {
                    seconds = 0;
                    minutes += 1;
                }
                return {...prevDura, second:seconds, minute: minutes}

            })
        }, 1000)

        return() => clearInterval(interval); //nettoyage pour eviter les fuites de memoire
    }, []);

    useEffect(() => {
        if(duration.minute === 1) {setDuration({...duration, pourcentage: 3})} 
        if(duration.minute === 2) {setDuration({...duration, pourcentage: 6})} 
        if(duration.minute === 3) {setDuration({...duration, pourcentage: 10})} 
        if(duration.minute === 4) {setDuration({...duration, pourcentage: 13})} 
        if(duration.minute === 5) {setDuration({...duration, pourcentage: 16})} 
        if(duration.minute === 10) {setDuration({...duration, pourcentage: 33})} 
        if(duration.minute === 15) {setDuration({...duration, pourcentage: 50})} 
        if(duration.minute === 20) {setDuration({...duration, pourcentage: 66})} 
        if(duration.minute === 25) {setDuration({...duration, pourcentage: 83})} 
        if(duration.minute > 30) {
            setDuration({...duration, pourcentage: 100})
            alert("C'est bon, vous avez presque fini de lire le document PDF")
        } 
    }, [duration.second])

    return (
        <Layout>
            <div className="w-full bg-background-200 dark:bg-foreground-200 md:px-6 px-0 md:py-4 py-0 text-center font-bold rounded-2xl italic">
                Les cours
            </div>
            <div className="w-full bg-background-200 dark:bg-foreground-200 md:px-6 px-0 md:py-4 py-0 mt-4 rounded-2xl">
                <div className="pb-8" >Document PDF :</div>
                <PdfViewer fileUrl="/unit1.pdf" />
            </div>
        </Layout>
    );
}
