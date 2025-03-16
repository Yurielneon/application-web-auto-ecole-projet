"use client"

import { useState } from 'react'
import { PhotoIcon, DocumentIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import Header from "@/components/ui/Header"
import FormSection from '@/components/ui/FormSection'
import FileUpload from '@/components/ui/FileUpload'
import DatePicker from '@/components/ui/DatePicker'
import axios from 'axios'
import { useForm } from 'react-hook-form';

export default function Inscription({ params }) {
  const { training_id } = params;
  // const { register, handleSubmit, control, formState: { errors } } = useForm()
  const [filePreviews, setFilePreviews] = useState({})
  // Modifier la déclaration useForm
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm(); 

  const handleFileChange = (fieldName, e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validation des types de fichiers
    const acceptedTypes = {
      profile_picture: ['image/'],
      residence_certificate: ['image/','application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      previous_license: ['image/', 'application/pdf'],
      payment_receipt: ['image/', 'application/pdf']
    }

    if (!acceptedTypes[fieldName].some(type => file.type.startsWith(type))) {
      alert('Type de fichier non supporté')
      return
    }

    // Mise à jour de la prévisualisation
    const reader = new FileReader()
    reader.onload = (e) => {
      setFilePreviews(prev => ({
        ...prev,
        [fieldName]: file.type.startsWith('image/') ? e.target.result : file.name
      }))
    }
    reader.readAsDataURL(file)

    // Mise à jour de react-hook-form
    const fileList = new DataTransfer()
    fileList.items.add(file)
    e.target.files = fileList.files
    e.target.name = fieldName
    register(fieldName).onChange(e)
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    // Conversion des données
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        formData.append(key, value[0])
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString().split('T')[0])
      } else if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
      // formData.append('training_id', training_id)
    })

    // Vérification des données
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }

    console.log("Envoi des données...", [...formData.entries()]) 

    try {
      const response = await axios.post(
        "http://localhost:8000/api/students",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }}
      )
      alert("Inscription réussie !")
      console.log(response.data)
    } catch (error) {
      let errorMessage = "Erreur lors de l'inscription\n\n"
    
      if (error.response?.data?.errors) {
        // Concaténer toutes les erreurs
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          errorMessage += `• ${messages.join(', ')}\n`
        })
      } else {
        errorMessage += "Une erreur inconnue est survenue"
      }
  
      alert(errorMessage)
    }

      // Réinitialisation après succès
      setFilePreviews({})
  }

  return (
    <main className="min-h-screen bg-background-100 from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Devenez un conducteur accompli
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Complétez votre inscription en 3 étapes simples
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section Informations personnelles */}
          <FormSection title="Informations personnelles" icon={<PhotoIcon className="h-6 w-6" />}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <FileUpload
                  accept="image/*"
                  {...register('profile_picture', { required: true })}
                  onChange={(e) => handleFileChange('profile_picture', e)}
                  preview={filePreviews.profile_picture}
                  label="Photo de profil"
                />
                {errors.profile_picture && <span className="text-red-500 text-sm">Requis</span>}
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    {...register('last_name', { required: true })}
                    placeholder="Nom de famille"
                    className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                  />
                  {errors.last_name && <span className="text-red-500 text-sm">Requis</span>}
                </div>
                <div>
                  <input
                    {...register('first_name')}
                    placeholder="Prénom (optionnel)"
                    className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </FormSection>

                  // Ajoutez cette section manquante dans le JSX
        <FormSection title="Coordonnées" icon={<DocumentIcon className="h-6 w-6" />}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <input
                type="email"
                {...register('email')}
                placeholder="Adresse email (optionnel)"
                className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
              />
            </div>

            {/* Téléphone */}
            <div>
              <input
                type="tel"
                {...register('phone', { 
                  required: "Requis",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Numéro invalide (10 chiffres requis)"
                  }
                })}
                placeholder="Téléphone"
                className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>

            {/* CIN */}
            <div>
              <input
                {...register('cin', { 
                  required: "Requis",
                  minLength: {
                    value: 12,
                    message: "12 caractères requis"
                  },
                  maxLength: {
                    value: 12,
                    message: "12 caractères maximum"
                  }
                })}
                placeholder="Numéro CIN"
                className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
              />
              {errors.cin && <span className="text-red-500 text-sm">{errors.cin.message}</span>}
            </div>

            {/* Date de naissance (Correction principale) */}
            <div>
              {/* Date de naissance simplifiée */}
                <input
                  type="date"
                  {...register('birth_date', { 
                    required: "La date est requise" 
                  })}
                  className="w-1/2 form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                />
                {errors.birth_date && <span className="text-red-500 text-sm">{errors.birth_date.message}</span>}
            </div>

            {/* Genre */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="1"
                  {...register('gender', { required: "Requis" })}
                  className="form-radio-rounded"
                />
                <span className="ml-2">Homme</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="2"
                  {...register('gender')}
                  className="form-radio-rounded"
                />
                <span className="ml-2">Femme</span>
              </label>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
            </div>
          </div>
        </FormSection>

          {/* Section Documents requis */}
          <FormSection title="Documents requis" icon={<DocumentIcon className="h-6 w-6" />}>
            <div className="grid md:grid-cols-2 gap-6">
              <FileUpload
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                {...register('residence_certificate', { required: true })}
                onChange={(e) => handleFileChange('residence_certificate', e)}
                preview={filePreviews.residence_certificate}
                label="Certificat de résidence"
              />
              <FileUpload
                accept="image/*,.pdf"
                {...register('previous_license')}
                onChange={(e) => handleFileChange('previous_license', e)}
                preview={filePreviews.previous_license}
                label="Permis précédent (optionnel)"
              />
            </div>
          </FormSection>

          {/* Section Paiement */}
          <FormSection title="Paiement" icon={<BanknotesIcon className="h-6 w-6" />}>
            <div className="space-y-6">
              <FileUpload
                accept="image/*,.pdf"
                {...register('payment_receipt', { required: true })}
                onChange={(e) => handleFileChange('payment_receipt', e)}
                preview={filePreviews.payment_receipt}
                label="Reçu de paiement"
              />
              {errors.payment_receipt && <span className="text-red-500 text-sm">Requis</span>}
              
              <div className="p-4 bg-blue-50 rounded-lg animate-pulse">
                <p className="text-sm text-blue-800">
                  ⏳ Votre inscription sera activée après vérification par notre équipe.
                  Comptez 24 à 48 heures pour recevoir votre confirmation par email.
                </p>
              </div>
            </div>
          </FormSection>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Finaliser l'inscription
          </button>
        </form>
      </div>                          
    </main>
  )
}