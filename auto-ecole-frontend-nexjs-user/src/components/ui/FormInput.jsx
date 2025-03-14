export default function FormInput({ register, name, error, ...props }) {
    return (
      <div className="relative">
        <input
          {...register(name)}
          {...props}
          className={`w-full px-4 py-2 rounded-xl border ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          } bg-background-100 text-gray-800 dark:text-gray-100 
            focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
        />
        {error && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-sm">
            {error.message}
          </span>
        )}
      </div>
    )
  }