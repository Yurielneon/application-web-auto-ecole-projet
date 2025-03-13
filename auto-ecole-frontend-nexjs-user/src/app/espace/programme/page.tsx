import React from "react";
import Layout from "@/components/ui/Layout"

export default function Programme () {
    return(
        <Layout>

            <div className="w-full bg-background-200 dark:bg-foreground-200 md:px-6 px-0 md:py-4 py-0 text-center font-bold rounded-2xl italic">
                Voici vos emplois du temps durant cette formation. 
            </div>
            <div className="w-full h-full bg-background-200 dark:bg-foreground-200 md:px-6 px-0 md:py-4 py-0 mt-4 rounded-2xl">
                    
                    <table className="w-full h-full text-center rounded-t-xl " >
                        <thead className="h-10 w-full bg-teal-500" >
                            <tr className="" >
                                <th></th>
                                <th>Lundi</th>
                                <th>Mardi</th>
                                <th>Mercredi</th>
                                <th>jeudi</th>
                                <th>Vendredi</th>
                                <th>Samedi</th>
                                <th>Dimache</th>
                            </tr>
                        </thead>

                        <tbody className="h-10 w-full ">
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>

                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>06h:00</th>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Exo.</td>
                                <td>-</td>
                                <td>C. theorique</td>
                                <td>-</td>
                            </tr>

                        </tbody>
                            
                    </table>
                    
                    
                </div>
                <div>
                    <div className="w-full h-full bg-background-200 dark:bg-foreground-200 md:px-6 px-0 md:py-4 py-0 text-center mt-4 font-bold rounded-2xl italic">
                        Voici nos programme durant cette annee. 
                    </div>       
                    <div className="w-full h-full bg-background-200 dark:bg-foreground-200 text-gray-500 md:px-6 px-0 md:py-4 py-0 mt-4 rounded-2xl">
                        <div className="w-5/6 h-full bg-background-100 dark:bg-foreground-100 p-3 ml-8 border-l-2 border-theme-f" >
                            <div className="font-semibold" >Remarque: </div>
                            <div className="text-sm" >Cet emploit du temps ne change jamais sauf s`il y a un examen a l`heure du cours. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, voluptates, perferendis a, eveniet sit laboriosam eos dolorem doloribus eum quos ea iure vitae. Eaque, quisquam enim dolorum deserunt exercitationem tenetur?</div>
                        </div>
                        <div>
                            
                        </div>
                    </div>             
                </div>

        </Layout>
    )
}