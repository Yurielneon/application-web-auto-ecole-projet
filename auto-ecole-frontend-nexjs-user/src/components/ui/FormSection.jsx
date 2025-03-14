export default function FormSection({ title, icon, children }) {
    return (
      <div className="p-6 bg-background-200 rounded-2xl shadow-sm border border-gray-8  00 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-theme-t dark:bg-gray-700 rounded-lg">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-200 dark:text-gray-100">{title}</h2>
        </div>
        {children}
      </div>
    )
  }