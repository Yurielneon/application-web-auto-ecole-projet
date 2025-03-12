import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  className, 
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`w-full px-4 py-2 rounded-lg border ${
          error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-200'
        } focus:outline-none focus:ring-2 bg-background-200 dark:bg-foreground-200 transition-colors ${className}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;