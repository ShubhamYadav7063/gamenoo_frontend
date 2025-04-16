/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        background: "#F9FAFB",
        card: "#FFFFFF",
        accent: "#F59E0B",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
