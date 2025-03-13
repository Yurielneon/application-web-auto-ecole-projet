"use client"

import {useForm} from 'react-hook-form';
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Inputs from "@/components/ui/Inputs";
import Alert from "@/components/ui/Alert";
import BankInfoCard from "@/components/ui/BankInfoCard";
import axios from 'axios';

export default function Inscription() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Ajoute tous les champs au FormData
    for (const key in data) {
      if (key === 'profile_image') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.post('/api/inscription', formData);

      if (response.ok) {
        alert('Inscription réussie ! Vérifiez votre email.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  return (
    <main className="min-h-screen w-full bg-background-100 dark:bg-foreground-100 flex flex-col items-center">
      <Header />
      
      <section className="w-full max-w-7xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white dark:text-background-100 mb-4">
            Inscription à la Formation
          </h1>
        </div>

        <Alert type="warning" className="mb-8">
          <strong>Attention :</strong> Aucun compte ne sera activé sans la fourniture 
          d'un numéro de bordereau valide. Vérifiez triple fois vos informations bancaires !
        </Alert>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <BankInfoCard 
              bankName="Banque Nationale"
              accountNumber="CM210 00785 12345678901 99"
              amount="40 000 MGA"
              referenceFormat="FORM-2023-XXXX"
            />
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <Alert type="warning" className="mb-8">
                Formats d'image acceptés : JPG, PNG (max 2MB)
              </Alert>

              <div className="grid md:grid-cols-3 gap-8">
                {/* ... (même contenu pour BankInfoCard) ... */}

                <div className="md:col-span-2">

                    {/* Nouveau champ image */}
                    <div className="col-span-full">
                      <Input
                        label="Photo de profil"
                        type="file"
                        accept="image/*"
                        error={errors.profile_image}
                        {...register('profile_image', { 
                          required: 'Une photo est obligatoire'
                        })}
                      />
                    </div>

                    {/* ... (autres champs existants) ... */}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'S\'inscrire maintenant'}
                    </button>
              
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Inputs
                  label="Nom Complet"
                  error={errors.fullname}
                  {...register('fullname', { required: 'Ce champ est obligatoire' })}
                />
                
                <Inputs
                  label="Adresse"
                  error={errors.address}
                  {...register('address', { required: 'Ce champ est obligatoire' })}
                />
                
                <Inputs
                  label="Téléphone"
                  type="tel"
                  error={errors.phone}
                  {...register('phone', { 
                    required: 'Ce champ est obligatoire',
                    pattern: {
                      value: /^(\+261|0)(32|33|34|37|38)\d{7}$/i,
                      message: 'Numéro de téléphone invalide'
                    }
                  })}
                />
                
                <Inputs
                  label="Email"
                  type="email"
                  error={errors.email}
                  {...register('email', { 
                    required: 'Ce champ est obligatoire',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide'
                    }
                  })}
                />
                
                <Inputs
                  label="Mot de passe"
                  type="password"
                  error={errors.password}
                  className="col-span-full"
                  {...register('password', { 
                    required: 'Ce champ est obligatoire',
                    minLength: {
                      value: 8,
                      message: 'Minimum 8 caractères'
                    }
                  })}
                />
              </div>

              <div className="pt-6 border-t border-foreground-200">
                <h3 className="text-xl font-semibold mb-6">Validation du Paiement</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Inputs
                    label="Numéro de Bordereau"
                    error={errors.bank_slip}
                    {...register('bank_slip', { 
                      required: 'Ce champ est obligatoire',
                      pattern: {
                        value: /^FORM-2023-\d{4}$/,
                        message: 'Format invalide (ex: FORM-2023-1234)'
                      }
                    })}
                  />
                  
                  <Inputs
                    label="Banque Émettrice"
                    error={errors.bank_name}
                    {...register('bank_name', { 
                      required: 'Ce champ est obligatoire',
                      minLength: {
                        value: 3,
                        message: 'Minimum 3 caractères'
                      }
                    })}
                  />
                </div>

                <Alert type="info" className="mt-6">
                  Un email contenant votre code d'accès temporaire sera envoyé après vérification 
                  bancaire (délai maximum 48h). Contactez-nous en cas de problème.
                </Alert>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Traitement...' : 'Confirmer l\'inscription'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

// import Header from "@/components/ui/Header"
// import Input from "@/components/ui/Input";

// export default function Inscription() {
//     return (
//         <main className="h-full w-full bg-background-100 dark:bg-foreground-100 flex flex-col items-center">
//             <Header></Header>
//             <div className="text-white dark:text-background-100 w-5/6 h-full flex justify-center" >
//                 <div className="py-8" >
//                     <div className="text-lg italic text-center py-6" >- Information a retenir -</div>
//                     <div className="text-sm" >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur tempore odio sapiente modi totam ducimus qui porro doloremque culpa vel quo, cumque nobis saepe quos, eligendi dicta quae. Doloribus, molestiae eaque. Nulla labore tenetur dolorem nisi debitis magni, nihil, adipisci, recusandae pariatur repellat voluptatum rerum totam enim odit. Hic odio atque ad illo optio neque eveniet voluptatibus sequi exercitationem odit quas dolor cumque laudantium distinctio eius, unde quo harum culpa maiores voluptates impedit? Earum iste sit animi labore minus, soluta alias cupiditate eius ipsum placeat omnis odit ut voluptate reiciendis quaerat nihil, dignissimos reprehenderit asperiores pariatur! Id ea voluptas quod!</div>
//                 </div>
//             </div>
//             <div className="h-full w-full flex justify-center items-center text-white dark:text-background-100 py-6" >
//                 <div className="w-5/6 h-full flex flex-col md:flex-row" >
//                     <div className="h-full md:w-1/3 w-full pr-10" >
//                         <div className="text-lg px-4 py-4">A propos de formation :</div>
//                         <div className=" bg-background-200 dark:bg-foreground-200 rounded-lg text-sm text-gray-500" >
//                             <ul>
//                                 <li>
//                                     <div className=" font-semibold" >Type de permis</div>
//                                     <div className="" ></div>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="h-full md:w-2/3 w-full pl-10 flex flex-wrap" >
//                         <div className="w-[40%] pl-6 pt-4" >
//                             <Input label="Name" placeholder="" className="text-white dark:text-black bg-background-200 dark:bg-foreground-200" ></Input>
//                         </div>
//                         <div className="w-[40%] pl-6 pt-4" >
//                             <Input label="Name" placeholder="" className="text-white dark:text-black bg-background-200 dark:bg-foreground-200" ></Input>
//                         </div>
//                         <div className="w-[40%] pl-6 pt-4" >
//                             <Input label="Name" placeholder="" className="text-white dark:text-black bg-background-200 dark:bg-foreground-200" ></Input>
//                         </div>
//                         <div className="w-[40%] pl-6 pt-4" >
//                             <Input label="Name" placeholder="" className="text-white dark:text-black bg-background-200 dark:bg-foreground-200" ></Input>
//                         </div>
//                         <div className="w-[40%] pl-6 pt-4" >
//                             <Input label="Name" placeholder="" className="text-white dark:text-black bg-background-200 dark:bg-foreground-200" ></Input>
//                         </div>
//                     </div>
//                 </div>
               

//             </div>
//         </main>
//     )
// }