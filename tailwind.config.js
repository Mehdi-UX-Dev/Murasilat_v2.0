/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#181D25",
          800: "#393E46",
          700: "#546378",
          600: "#7B889D",
          500: "#99A7BD",
          400: "#BFC9D9",
          300: "#E1E4EA",
          200: "#EAEAF1",
          100: "#F6F7F9",
        },

        myAccent: {
          error: {
            500: "#8E1010",
            400: "#AE4137",
            300: "#D62929",
            200: "#ECB0AC",
            100: "#FAD5D1",
          },
          warning: {
            500: "#917D08",
            400: "#BA9E12",
            300: "#F2D40D",
            200: "#F9E686",
            100: "#FCF5CF",
          },
          success: {
            500: "#076105",
            400: "#1C971C",
            300: "#21D460",
            200: "#86F9A3",
            100: "#CFFCD2",
          },
        },
      },

      fontFamily: {
        // sans: ["Amiri", ...defaultTheme.fontFamily.sans],
        rounded: ["Helvetica Rounded"],
        IranSans: ["IRANSans"],
        nazanin: ["B Nazanin"],
        sans: ["Helvetica"],
        serif: ["Times New Roman", "Georgia"],
      },
    },
  },
  plugins: [],
};
