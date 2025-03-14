import { XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline'

export default function FileUpload({ accept, preview, onChange, ...props }) {
  return (
    <div className="group relative">
      <label className={`flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed 
        ${preview ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 
          'border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400'} 
        transition-colors cursor-pointer`}>
        
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            onChange(e)
            if(e.target.files?.[0]) props.onChange?.(e)
          }}
          {...props}
        />
        
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {typeof preview === 'string' ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <DocumentIcon className="h-8 w-8" />
                <span className="truncate max-w-[160px]">{preview}</span>
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                props.onChange?.({ target: { files: [] } })
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <XMarkIcon className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <div className="text-center p-4">
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-500">
              <DocumentIcon className="h-8 w-8 mb-2" />
              <span className="text-sm">Glissez-déposez ou cliquez</span>
              <span className="text-xs mt-1">Formats acceptés: {accept}</span>
            </div>
          </div>
        )}
      </label>
    </div>
  )
}