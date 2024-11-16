/** @type {import('tailwindcss').Config} */
import { unstable_createBreakpoints } from '@mui/material';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightblue': '#243c5a',
        'sideBarLight':'#fff',
        'sideBarDark':'#0C1013',
        'sideBarTextDark':'#0C1013',
        'sideBarTextLight':'#C6C6C6',
        'bgMode': 'var(--background-color)',
        'textMode': 'var(--text-color)',
        'pageMode': 'var(--page-color)',
        'elementMode': 'var(--element-color)',
        'blurMode': 'var(--blur-color)',
      },
      boxShadow: {
        '3xl': 'var(--shadow-color)',
        'tg' : [
          '0px 8px 8px 0px #3390EC25',
          '0px -4px 8px 0px #3390EC10'
        ],
        'vk': [
          '0px 8px 8px 0px #0077FF40',
          '0px -4px 8px 0px #0077FF1A'
        ],
        'yt': [
          '0px 8px 8px 0px #FF000026',
          '0px -4px 8px 0px #FF000040'
        ],
        'tt': [
          '0px 8px 8px 0px #4DE8F440',
          '0px -4px 8px 0px #FD3E3E40'
        ],
        'btnTop': 'var(--shadowBtn-color)',
        'tagBtn': '0px 4px 30px 0px #779CFF80'
      },
      animation: {
        slidertime: 'slidertime 4s infinite',
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1300px'},
      // => @media (max-width: 1300px) { ... }

      'xm': {'max': '1200px'},
      // => @media (max-width: 1300px) { ... }

      'xs': {'max': '1130px'},
      // => @media (max-width: 1023px) { ... }

      'rs': {'max': '1012px'},

      'ml': {'max': '960px'},
      // => @media (max-width: 1300px) { ... }

      'lx': {'max': '1080px'},
      // => @media (max-width: 1023px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'lm': {'max': '680px'},
      // => @media (max-width: 680px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'mx': {'max': '530px'},
      // => @media (max-width: 500px) { ... }

      'ms': {'max': '500px'},
      // => @media (max-width: 500px) { ... }
    }
  },
  plugins: [],
};