/** @type {import('tailwindcss').Config} */

import { withUt } from "uploadthing/tw";

export default withUt({
  // Your existing Tailwind config
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow : {
        'custom' : '5px 5px 50px 2px #07f'
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          '0%': { transform: 'translate(0, 0) scale(1,1) rotate(-3deg)' },
          '10%': { transform: 'translate(0, 0) rotate(3deg)' },
          '20%': { transform: 'translate(100%, 0) rotate(-3deg)' },
          '30%': { transform: 'translate(200%, 0) rotate(3deg)' },
          '40%': { transform: 'translate(300%, 0) rotate(-3deg)' },
          '50%': { transform: 'translate(400%) scale(1,1)' },
          '60%': { transform: 'translate(400%, 0) scale(-1,1) rotate(-3deg)'},
          '70%': { transform: 'translate(300%, 0) scale(-1,1) rotate(3deg)'},
          '80%': { transform: 'translate(200%, 0) scale(-1,1) rotate(-3deg)'},
          '90%': { transform: 'translate(100%, 0) scale(-1,1) rotate(3deg)'},
          '100%': { transform: 'translate(0, 0) scale(-1,1) rotate(3deg)'},
        },
        movingMd:{
          '0%':{ transform: 'translateX(-400%)' },
          '10%' : { transform: 'translateX(-150%) rotate(10deg)' },
          '20%' : { transform: 'translateX(-100%) rotate(20deg)' },
          '30%' : { transform: 'translateX(-50%) rotate(10deg)' },
          '50%' : { transform: 'translateX(0%) rotate(0deg)' },
          '65%' : { transform: 'translateX(400%) rotate(-50deg)' },
          '100%':{ transform: 'translateX(400%)' }, 
        },
        moving:{
          '0%':{ transform: 'translateX(-15rem)' },
          '10%' : { transform: 'translateX(-5rem) rotate(10deg)' },
          '20%' : { transform: 'translateX(-2rem) rotate(20deg)' },
          '30%' : { transform: 'translateX(0rem) rotate(10deg)' },
          '50%' : { transform: 'translateX(2rem) rotate(0deg)' },
          '65%' : { transform: 'translateX(10rem) rotate(-50deg)' },
          '100%':{ transform: 'translateX(20rem)' }, 
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        moving: "moving 2s linear infinite",
        wiggle: 'wiggle 5s ease infinite',
        movingMd: 'movingMd 5s linear infinite',
        moving: 'moving 5s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  
});
