/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow:{
            neon: "0 0 5px theme('colors.purple.200'), 0 0 20px theme('colors.purple.700')",
            textRed: " 5px 5px #E0D2C3;",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(139deg, rgba(36, 40, 50, 1) 0%, rgba(36, 40, 50, 1) 0%, rgba(37, 28, 40, 1) 100%)',
      },
      animation: {
        'spin-y': 'spinY 2s linear infinite', 
        'fadeIn': 'fadeIn .5s ease-in-out',
        'fadeLeft': 'fadeLeft .5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 1s ease-in-out infinite alternate',
        'slideindown': 'slide-in-down 1s ease-in-out 0.25s 1',
          'slideinleft': 'slide-in-left 1s ease-in-out 0.25s 1',
          'slideinright': 'slide-in-right 1s ease-in-out 0.25s 1',
          'slideinup': 'slide-in-up 1s ease-in-out 0.25s 1',
          'slideoutdown': 'slide-out-down 0.25s ease-in-out 0.25s 1',
          'slideoutleft': 'slide-out-left 1s ease-in-out 0.25s 1',
          'slideoutright': 'slide-out-right 1s ease-in-out 0.25s 1',
          'slideoutup': 'slide-out-up 1s ease-in-out 0.25s 1',
          'slidedown': 'slide-down 1s ease-in-out 0.25s 1',
          'slideleft': 'slide-left 1s ease-in-out 0.25s 1',
          'slideright': 'slide-right 1s ease-in-out 0.25s 1',
          'slideup': 'slide-up 1s ease-in-out 0.25s 1',
      },
      keyframes: {
        spinY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
          
        },
        slideInDown: {
					from: { opacity: 0 },
					to: { opacity: 1 },
          
        },
        fadeLeft: {
					from: { opacity: 0 },
					to: { opacity: 1 },
          
        },
        "slide-in-down": {
              "0%": {
                  visibility: "visible",
                  transform: "translate3d(0, -100%, 0)",
              },
              "100%": {
                  transform: "translate3d(0, 0, 0)",
              },
          },
          "slide-in-left": {
    "0%": {
        visibility: "visible",
        transform: "translateX(-100%)",
    },
    "100%": {
        visibility: "visible",
        transform: "translateX(0)",
    },
},

          "slide-in-right": {
              "0%": {
                  visibility: "visible",
                  transform: "translate3d(100%, 0, 0)",
              },
              "100%": {
                  transform: "translate3d(0, 0, 0)",
              },
          },
          "slide-in-up": {
              "0%": {
                  visibility: "visible",
                  transform: "translate3d(0, 100%, 0)",
              },
              "100%": {
                  transform: "translate3d(0, 0, 0)",
              },
          },
          "slide-out-down": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  visibility: "hidden",
                  transform: "translate3d(0, 100%, 0)",
              },
          },
          "slide-out-left": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  visibility: "hidden",
                  transform: "translate3d(-100%, 0, 0)",
              },
          },
          "slide-out-right": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  visibility: "hidden",
                  transform: "translate3d(100%, 0, 0)",
              },
          },
          "slide-out-up": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  visibility: "hidden",
                  transform: "translate3d(0, -100%, 0)",
              },
          },
          "slide-down": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  transform: "translate3d(0, 100%, 0)",
              },
          },
          "slide-left": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  transform: "translate3d(-100%, 0, 0)",
              },
          },
          "slide-right": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  transform: "translate3d(100%, 0, 0)",
              },
          },
          "slide-up": {
              "0%": {
                  transform: "translate3d(0, 0, 0)",
              },
              "100%": {
                  transform: "translate3d(0, -100%, 0)",
              },
          },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow:{
          from :{
            'text-shadow': '0 0 10px #151C3B, 0 0 20px #151C3B, 0 0 30px #151C3B, 0 0 40px #151C3B, 0 0 50px #151C3B, 0 0 60px #151C3B, 0 0 70px #151C3B;',
          },
          to :{
            'text-shadow': '0 0 20px #CE93D8, 0 0 30px #CE93D8, 0 0 40px #CE93D8, 0 0 50px #CE93D8, 0 0 60px #CE93D8, 0 0 70px #CE93D8, 0 0 80px #CE93D8;'
          }
        }
      },

      
    },
  },
  plugins: [],
};
