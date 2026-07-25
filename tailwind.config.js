/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F6F7FB",
        surface: "#FFFFFF",
        "surface-secondary": "#F9FAFB",
        border: "#E7EAF3",
        "text-primary": "#101828",
        "text-secondary": "#6A7282",
        "text-muted": "#99A1AF",
        accent: "#7C5CFC",
        "accent-light": "#F3E8FF",
        success: "#10B981",
        "success-light": "#D0FAE5",
        warning: "#FF8904",
        error: "#EF4444",
        locked: "#99A1AF",
      },
    },
  },
  plugins: [],
};
