/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '576px',
    },
    extend: {
      keyframes: {
        bounceUp: {
          '0%, 100%': {transform: 'translateY(-15%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'},
          '50%': {transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'},
        },
        bounceDown: {
          '0%, 100%': {transform: 'translate(-50%, 0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'},
          '50%': {transform: 'translate(-50%, -10%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'},
        }
      },
      animation: {
        'bounce-up': 'bounceUp 2.5s linear infinite',
        'bounce-down': 'bounceDown 4s linear infinite'
      },
      colors: {
        default: "#3D2505",
        brand: {
          100: "#FF6682",
          200: "#FF375C",
        },
        chocolates: {
          green: {
            100: "#95C43D",
            200: "#72A90B",
          },
          milk: {
            100: "#894E00",
            200: "#683E07",
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
        gray: {
          warm: {
            0: "#FFF",
            50: "#D8D3BD",
            100: "#C1BCB5",
            200: "#90887D",
            300: "#271B0B",
          },
          cool: {
            50: "#BDBDBD",
            100: "#9E9C9D"
          }
        },
        popup: {
          100: "#FEF9E1",
          200: "#F3E086",
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
