/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./lib/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0068FF",   // Xanh Zalo
        secondary: "#FF6600", // Cam hành động
        success: "#00C853",
        error: "#D50000",
        surface: "#F5F5F5",
      },
      fontSize: {
        h1: ["24px", { fontWeight: "700" }],
        h2: ["20px", { fontWeight: "600" }],
        body: ["16px", { fontWeight: "400" }],
        caption: ["14px", { fontWeight: "500" }],
      },
      fontFamily: {
        sans: ["BeVietnamPro_400Regular"],
        medium: ["BeVietnamPro_500Medium"],
        semibold: ["BeVietnamPro_600SemiBold"],
        bold: ["BeVietnamPro_700Bold"],
      },

    },
  },
  plugins: [],
};
