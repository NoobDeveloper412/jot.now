import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],

	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
				openKhmer: ['OpenKhmerSchool', 'sans-serif']
			},
			colors: {
				'theme-border': '#E5E7EB',
				primary: {
					DEFAULT: '#818CF8',
					500: '#6366F1',
					100: '#E0E7FF'
				},
				secondary: {
					DEFAULT: '#64748B',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: '#020617',
					foreground: '#4E515D'
				},
				slate: {
					150: '#E9EEF5'
				},
				gray: {
					DEFAULT: '#F1F5F9',
					200: '#E7E5E4',
					500: '#E2E8F0',
					600: '#6B7280',
					700: '#E4E7EC'
				},
				blue: {
					DEFAULT: '#475569',
					500: '#4F46E5'
				},
				purple: {
					DEFAULT: '#818CF8'
				},
				red: {
					DEFAULT: '#EF4444',
					100: '#FEE2E2'
				},
				yellow: {
					DEFAULT: '#F59E0B',
					100: '#FEF3C7'
				},
				green: {
					DEFAULT: '#10B981',
					100: '#D1FAE5'
				},
				cyan: {
					DEFAULT: '#0891B2',
					100: '#CFFAFE'
				},
				stone: {
					DEFAULT: '#A8A29E'
				}
			}
		}
	},

	plugins: [typography, forms]
} satisfies Config;
