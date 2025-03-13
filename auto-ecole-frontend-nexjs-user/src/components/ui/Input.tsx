import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:string;
  error?:string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label ,error, className,placeholder, ...props }, ref ) => {
    return (
      <div className="w-full" >
        {label && (
          <label className="block text-md font-medium mx-3 mb-1" >
            {label}
          </label>
        )}
        <input ref={ref}
        className={`w-full px-3 py-2 border rounded-lg text-sm  shadow-sm focus:ring  focus:ring-theme-t focus:outline-none ${error ? "border-red-500":"border-theme-t"} 
        ${className}`}
        placeholder={placeholder}
        {...props}

        
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;