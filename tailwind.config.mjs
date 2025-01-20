/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#FF6682",
          200: "#3D2505",
        },
        chocolates: {
          green: {
            100: "#95C43D",
            200: "#72A90B",
          },
          milk: {
            100: "#894E00",
            200: "#3D2505",
          },
          dark: {
            100: "#533608",
            200: "#3F2802",
          },
          ruby: {
            100: "#FEACB1",
            200: "#F77B83",
          },
          vanilla: {
            100: "#FFF5BA",
            200: "#DDD397",
          },
          red: {
            100: "#E54932",
            200: "#B52915",
          },
        },
        grayscale: {
          0: "#FFF",
          50: "#D8D3BD",
          100: "#C1BCB5",
          200: "#90887D",
          300: "#271B0B",
        },
        popup: {
          100: "#FEF9E1",
          200: "#F9EAA4",
        },
        boxes: {
          purple: {
            box: "#FAECBC",
            ribbon: "#E6F4F1",
          },
          yellow: {
            box: "#FFCABE",
            ribbon: "#FAECBC",
          },
          beige: {
            box: "#FEF4EA",
            ribbon: "#B7A99A",
          },
          pink: {
            box: "#FFB8D0",
            ribbon: "#BDA5AD",
          },
          apricot: {
            box: "#FFCABE",
            ribbon: "#EDE9D0",
          },
          skyblue: {
            box: "#DCFCF6",
            ribbon: "#FFC5D9",
          },
        },
      },
    },
  },
  plugins: [],
};
