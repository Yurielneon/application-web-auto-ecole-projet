import type { Config } from "tailwindcss";
// import shadcnUI from "@shadcn/ui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background:{
          100:"var(--background)",
          200: "#151022"
        } ,
        foreground:{
          100: "var(--foreground)",
          200: "#e2e2e2"
        } ,
        transparent: {
          b: "#110d1ba8",
          w: "#ffffff93"
        } ,
        theme: {
          f: "#00e498",
          t: "#00be8e4b"
        }
      },
      fontFamily: {
        sans: ['Proxima Nova'],
      }
    },
  },
  plugins: [],
} satisfies Config;
