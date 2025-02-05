/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "400px",
    },
    extend: {
      keyframes: {
        bounceUp: {
          "0%, 100%": { transform: "translateY(-15%)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
          "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
        },
        bounceUpOnce: {
          "0%": {
            transform: "translate(0, 0%)",
            animationTimingFunction: "ease-in",
          },
          "30%": {
            transform: "translate(0, -30%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "100%": {
            transform: "translate(0, 0%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        bounceDown: {
          "0%, 100%": { transform: "translate(-50%, 0)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
          "50%": { transform: "translate(-50%, -10%)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        subtleMove: {
          "0%": { transform: "translateY(0px);" },
          "50%": { transform: "translateY(-2px);" },
          "100%": { transform: "translateY(0px);" },
        },
      },
      animation: {
        "bounce-up": "bounceUp 2.5s linear infinite",
        "bounce-up-fast": "bounceUp 1.2s linear infinite",
        "bounce-up-once": "bounceUpOnce 0.5s linear",
        "bounce-down": "bounceDown 4s linear infinite",
        heartbeat: "heartbeat 3s ease-in-out infinite",
        "heartbeat-fast": "heartbeat 1s ease-in-out infinite",
        "subtle-move": "5s ease-in-out infinite alternate",
      },
      colors: {
        default: "#3D2505",
        brand: {
          100: "#FF6682",
          200: "#FF375C",
        },
        chocolates: {
          milk: {
            100: "#894E00",
            200: "#683E07",
          },
          dark: {
            100: "#533608",
            200: "#3F2802",
          },
          vanilla: {
            100: "#FFF5BA",
            200: "#D1C593",
          },
          ruby: {
            100: "#FEACB1",
            200: "#F77B83",
          },
          red: {
            100: "#E54932",
            200: "#B52915",
          },
          greentea: {
            100: "#95C43D",
            200: "#72A90B",
          },
        },
        chocopens: {
          milk: {
            100: "#FFF",
            200: "#CFCFCF",
          },
          ruby: {
            100: "#FEACB1",
            200: "#F77B83",
          },
          red: {
            100: "#E54932",
            200: "#B52915",
          },
          yellow: {
            100: "#FFEA46",
            200: "#DCC512",
          },
          greentea: {
            100: "#90E117",
            200: "#76B319",
          },
          dark: {
            100: "#533608",
            200: "#3F2802",
          },
        },
        gray: {
          warm: {
            0: "#FFF",
            50: "#D8D3BD",
            100: "#C1BCB5",
            200: "#90887D",
            300: "#170804",
          },
          cool: {
            50: "#BDBDBD",
            100: "#9E9C9D",
          },
        },
        popup: {
          100: "#FEF9E1",
          200: "#FDE882",
        },
        disabled: {
          100: "#F0A7B4",
          200: "#D27E8E",
        },
        button: {
          100: "#894E00",
          200: "#4C2F08",
        },
        cards: {
          heart: "#FFC1C1",
          clover: "#CCE9AA",
          flower: "#FFB0D2",
          smile: "#FFEE9C",
          cake: "#FFC997",
          fire: "#8CE8FD",
        },
      },
    },
  },
  plugins: [],
};
