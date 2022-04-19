// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["Catamaran", ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: "#EEF7F1",
          100: "#D9EDDF",
          200: "#B7DCC3",
          300: "#91CAA3",
          400: "#6BB883",
          500: "#4DA167",
          600: "#3D8052",
          700: "#2E613E",
          800: "#1F422A",
          900: "#0F1F14",
        },
        daviesgrey: {
          50: "#ECEDEE",
          100: "#D9DADD",
          200: "#B6B8BE",
          300: "#90949D",
          400: "#6E727C",
          500: "#4D5057",
          600: "#3E4146",
          700: "#2D2F33",
          800: "#1F2023",
          900: "#0E0F10",
        },
        hookersgreen: {
          50: "#EDF2F0",
          100: "#D8E3DD",
          200: "#B4CABF",
          300: "#8EAF9D",
          400: "#6A957E",
          500: "#4E6E5D",
          600: "#3F5A4C",
          700: "#2F4237",
          800: "#202D26",
          900: "#0F1512",
        },
        pastelgreen: {
          50: "#EBF9ED",
          100: "#D8F3DB",
          200: "#B1E7B7",
          300: "#8ADB93",
          400: "#63CF6F",
          500: "#3BC14A",
          600: "#309C3C",
          700: "#24752D",
          800: "#184E1E",
          900: "#0C270F",
        },
        lightgray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EBEBEB",
          300: "#E3E3E3",
          400: "#D9D9D9",
          500: "#CFCFCF",
          600: "#A6A6A6",
          700: "#7D7D7D",
          800: "#525252",
          900: "#292929",
        },
        dark: "#222222",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
