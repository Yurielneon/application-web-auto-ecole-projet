"use client";
import Layout from "@/components/ui/Layout";
import Button from "@/components/ui/Button";

export default function Simulation() {
    const questions = [
        {
            timer: 10,
            quest: "Qu'est ce qu'un ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "What dfgdfgsdf dvv v  ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "Pourquoi je serai toujours  ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "Voila pourquoi ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "Faut tout d'abord ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "C'est quoi  ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "Cette phrase vous evoque ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "Qu'est ce qu'un ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "Comment faire pour ... ?",
            rep: " Tentative"
        },{
            timer: 10,
            quest: "On sait que ... ?",
            rep: " Tentative"
        },

    ]

    // let index = 0;
    let indexQuestion = 0;
    let timer = questions[indexQuestion].timer;

    const handleStart = () => {
        if (indexQuestion >= questions.length) {
            console.log("Toutes les questions sont terminees")
            return;
        }

        let interval = setInterval(() => {
            timer--;

            if(timer <= 0) {
                clearInterval(interval);
                indexQuestion++;
                if(indexQuestion < questions.length) {
                    timer = questions[indexQuestion].timer
                    handleStart();
                } else {
                    console.log("Fin du quiz")
                }
            }
        }, 1000)
        // alert("Tenez vous pret(e) pour la simulation de ton niveau!")
        // indexQuestion += 1
        // setInterval(() => {
        //     index += 1
        //     questions[index+1].timer -= 1;
        //     console.log("\nTimer : " + questions[index+1].timer);
        //     console.log("IndexQuestion : " + indexQuestion);
        //     console.log("index :" + index+"\n");
        //     if (questions[index+1].timer == 0 ) {
        //         console.log("index: "+index+"|| indexQuestion: " + indexQuestion)
        //         indexQuestion += 1
        //         index = 0
        //         questions[index+1].timer = questions[index+2].timer 
        //         console.log("apres le changement: index: "+index+"|| indexQuestion: " + indexQuestion)

        //     }
        // }, 1000)
    }


    return(
        <Layout>
            <div className="w-full bg-background-200 dark:bg-foreground-200 md:px-6 px-0 md:py-4 py-0 text-center font-bold rounded-2xl italic">
                <div className="font-bold" >Un simulation d`examen</div>
                <div className="text-gray-500 font-normal" >C`est a dire, vous pouvez Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis laudantium sint quo beatae nisi necessitatibus at iure nulla, aspernatur iste earum nihil, minus ab non deleniti? Tempora et excepturi voluptatibus?</div>
            </div>
            <div className="w-full bg-background-200 dark:bg-foreground-200 md:px-6 px-0 md:py-4 py-0 mt-4 rounded-2xl">
                
                {indexQuestion == 0 && <div>
                    <div className="text md:px-8" >
                        <div className="font-semibold underline p-4" >*A retenir :</div>
                        <p className="italic text-sm" >Lorsque vous appyuer sur ce button `COMMENCER` le compte a rebours va etre directement lancé pour chaque question. Vous avez 10 questions a repondre. Lorsque vous l`aurez fini, ton estimation pour la reussite de ton examen sera afficher.</p>
                        Pour commencer appuyer sur `COMMENCER`
                    </div>
                    <div className="w-full h-32 flex justify-center items-center" >
                        <div>
                            <Button size="sm" variant="primary" onClick={handleStart} >COMMENCER</Button>
                        </div>
                    </div>
                </div>}

               {indexQuestion > 0 &&
                <div>
                    <div className="" >Vous avez {questions[indexQuestion].timer}s pour repondre a cette question</div>
                    <div className="bg-theme-t font-medium px-4 py-3 border-l-2 border-theme-f" >Question numero 01 : {questions[indexQuestion].quest}</div>
                </div>
               }
            
            </div>
        </Layout>
    )
}