/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Mode (Option D)
        offwhite: "#F2F0EB",
        navy: "#0D1B3E",
        royal: "#1A56DB",
        royaldark: "#4169E1",
        warmgray: "#6a6050",
        // Dark Mode (Option C)
        charcoal: "#111318",
        charcoalborder: "#1e2028",
        cello: "#1e3a5f",
        lochinvar: "#3B82F6",
        "light-grey": "#E4E8F0",
        ronchi: "#60A5FA",
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.5rem",
      },
    },
  },
  plugins: [],
};
