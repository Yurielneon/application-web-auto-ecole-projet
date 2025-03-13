"use client";

import React from "react";

export default function Button  ({children, onClick, className= "", variant = "primary", size = "sm", ...props}) {

    const baseStyles = "font-bold text-white rounded-xl"
    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    }
    const variantStyles = {
        primary: "bg-indigo-600 hover:bg-indigo-700",
        secondary: "bg-gray-600 hover:bg-gray-600",
    }

    return(
            <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} onClick={onClick} {...props} >
                {children}
            </button>
    )
}
