/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["pastel", "dark"],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  plugins: [require("daisyui")],
  safelist: [
    "btn-primary",
    "btn-secondary",
    "btn-neutral",
    "btn-accent",
    "btn-ghost",
    "btn-link",
    "badge-primary",
    "badge-secondary",
    "badge-neutral",
    "badge-accent",
    "badge-ghost",
    "badge-link",
  ],
};
