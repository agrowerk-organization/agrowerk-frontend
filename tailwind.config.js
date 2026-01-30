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
        'neutral-tertiary': 'var(--color-neutral-tertiary)',
        'background': 'var(--color-background)',
        'button-main': 'var(--color-button-main)',
        'button-main-hover': 'var(--color-button-main-hover)',
        'button-second': 'var(--color-button-second)',
        'button-second-hover': 'var(--color-button-second-hover)',
        'footer-text-primary': 'var(--color-footer-text-primary)',
        'footer-text-secondary': 'var(--color-footer-text-secondary)',
        'footer-heading': 'var(--color-footer-heading)',
        'footer-link': 'var(--color-footer-link)',
        'footer-link-hover': 'var(--color-footer-link-hover)',
        'footer-icon': 'var(--color-footer-icon)',
        'footer-icon-hover': 'var(--color-footer-icon-hover)',
        'footer-border': 'var(--color-footer-border)',
        'footer-input-bg': 'var(--color-footer-input-bg)',
        'footer-input-border': 'var(--color-footer-input-border)',
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['var(--size-text)', { lineHeight: 'var(--line-height-text)' }],
        'lg': ['var(--size-links)', { lineHeight: 'var(--line-height-links)' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['var(--size-title)', { lineHeight: '2.5rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        'footer-title': ['var(--font-size-footer-title)', { lineHeight: '1.5' }],
        'footer-links': ['var(--font-size-footer-links)', { lineHeight: '1.75' }],
        'footer-subtext': ['var(--font-size-footer-subtext)', { lineHeight: '1.5' }],
        'button': ['var(--size-buttons)', { lineHeight: 'var(--line-height-buttons)' }],
      },
      
      fontWeight: {
        normal: '400',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
      },
      
      fontFamily: {
        sans: ['var(--font-family-sans)', 'ui-sans-serif', 'system-ui'],
      },
      
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',  
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float-delayed 25s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // ✨ Animações extras úteis
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
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
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      
      // ✨ NOVO: Espaçamentos personalizados (se precisar)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      
      // ✨ NOVO: Border radius personalizados
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'green': '0 0 20px rgba(76, 175, 80, 0.3)',
        'green-lg': '0 0 40px rgba(76, 175, 80, 0.4)',
      },
    },
  },
  plugins: [],
};