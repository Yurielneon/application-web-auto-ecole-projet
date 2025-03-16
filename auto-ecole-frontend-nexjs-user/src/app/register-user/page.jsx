"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Header from "@/components/ui/Header"

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setServerError('')

    try {
      const response = await axios.post('http://localhost:8000/api/register', data)
      
      if (response.data.message) {
        alert(`Succès ! ${response.data.message}`)
        window.location.href = '/dashboard' // Redirection après succès
      }
    } catch (error) {
        if (error.response?.data?.error) {
            // Afficher l'erreur spécifique du serveur
            alert(error.response.data.error); 
          } else {
            alert("Une erreur inconnue est survenue");
          }

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background-100 from-blue-50 to-purple-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-8">
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Activer votre compte étudiant</h2>

          {/* Explications */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              ℹ️ Vous devez avoir reçu un email de validation de l'auto-école pour utiliser cette page.<br/>
              ⚠️ Si vous avez déjà activé votre compte, <a href="/login" className="text-blue-600 underline">connectez-vous ici</a>.
            </p>
          </div>

          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {serverError.includes('non validé') ? (
                <>
                  <p>❌ Votre compte n'est pas encore validé !</p>
                  <p className="mt-2 text-sm">
                    Contactez l'auto-école au 034 00 000 00 ou par email à contact@autoecole.mg
                  </p>
                </>
              ) : (
                serverError
              )}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email de validation</label>
              <input
                type="email"
                {...register('email', {
                  required: "L'email est obligatoire",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Format d'email invalide"
                  }
                })}
                className="form-input-rounded w-full p-2 border rounded-lg"
                placeholder="email@example.com"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                {...register('password', {
                  required: "Le mot de passe est obligatoire",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 caractères"
                  }
                })}
                className="form-input-rounded w-full p-2 border rounded-lg"
                placeholder="••••••••"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirmez le mot de passe</label>
              <input
                type="password"
                {...register('password_confirmation', {
                  required: "Confirmation obligatoire",
                  validate: value => 
                    value === watch('password') || "Les mots de passe ne correspondent pas"
                })}
                className="form-input-rounded w-full p-2 border rounded-lg"
                placeholder="••••••••"
              />
              {errors.password_confirmation && (
                <span className="text-red-500 text-sm">{errors.password_confirmation.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? 'Activation en cours...' : 'Activer mon compte'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Vous n'avez pas de compte validé ?</p>
            <p className="mt-1">
              Inscrivez-vous d'abord en agence, puis utilisez cette page pour activer votre accès en ligne.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}