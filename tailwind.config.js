/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",  
    ],
    theme: {
      extend: {
        colors: {
            'primary': 'var(--color-primary)',
            'primary-dark': 'var(--color-primary-dark)',
            
            'secondary': 'var(--color-secondary)',
            'tertiary': 'var(--color-tertiary)',
            'quartenary': 'var(--color-quartenary)',
            'accent': 'var(--color-accent)',
            
            'success': 'var(--color-success)',
            'warning': 'var(--color-warning)',
            'error': 'var(--color-error)',
            
            'neutral-primary': 'var(--color-neutral-primary)',
            'neutral-secondary': 'var(--color-neutral-secondary)',
            
            'background': 'var(--color-background)',
            
            'button-main': 'var(--color-button-main)',
            'button-main-hover': 'var(--color-button-main-hover)',
            'button-second': 'var(--color-button-second)',
            'button-second-hover': 'var(--color-button-second-hover)',
        },
        animation: {
          'fadeInUp': 'fadeInUp 0.6s ease-out forwards',  
          'float': 'float 20s ease-in-out infinite',
          'float-delayed': 'float-delayed 25s ease-in-out infinite',
          'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
        },
        keyframes: {
            float: {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
              '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
              '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
            },
            'float-delayed': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
              '33%': { transform: 'translate(-30px, 30px) rotate(-120deg)' },
              '66%': { transform: 'translate(20px, -20px) rotate(-240deg)' },
            },
            'pulse-slow': {
            }
        },
      },
    },
    plugins: [],
};