
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				clan: {
					gold: "#FFD700",
					orange: "#FF7A00",
					red: "#FF3A30",
					dark: "#0D111C",
					"dark-accent": "#1A1F2C",
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(255, 215, 0, 0.3), 0 0 10px rgba(255, 122, 0, 0.2)' 
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 122, 0, 0.4)' 
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(20px)' 
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)' 
					}
				},
				'slide-in-left': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(-50px)' 
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)' 
					}
				},
				'slide-in-right': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(50px)' 
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)' 
					}
				},
				'scale-in': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.9)' 
					},
					'100%': { 
						opacity: '1',
						transform: 'scale(1)' 
					}
				},
				'rotate-glow': {
					'0%': { 
						transform: 'rotate(0deg)',
						boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)' 
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)' 
					},
					'100%': { 
						transform: 'rotate(360deg)',
						boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'rotate-glow': 'rotate-glow 10s linear infinite',
			},
			backgroundImage: {
				'hero-pattern': 'linear-gradient(to bottom, rgba(13, 17, 28, 0.7), rgba(13, 17, 28, 0.9)), url("/lovable-uploads/e29eae61-9195-47c9-ae8f-ebed8bf80c4e.png")',
				'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
				'gradient-dark': 'linear-gradient(135deg, #0D111C 0%, #1A1F2C 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
