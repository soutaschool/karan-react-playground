/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				black: "var(--basic-black)",
				silver: "var(--basic-silver)",
				gray: "var(--basic-gray)",
				white: "var(--basic-white)",
				maroon: "var(--basic-maroon)",
				red: "var(--basic-red)",
				purple: "var(--basic-purple)",
				fuchsia: "var(--basic-fuchsia)",
				green: "var(--basic-green)",
				lime: "var(--basic-lime)",
				olive: "var(--basic-olive)",
				yellow: "var(--basic-yellow)",
				navy: "var(--basic-navy)",
				blue: "var(--basic-blue)",
				teal: "var(--basic-teal)",
        aqua: "var(--basic-aqua)",

        // extend
        charcoal: "var(--basic-charcoal)",
        paper: "var(--basic-paper)",
			},
			fontFamily: {
				sans: "var(--font-family-sans)",
				serif: "var(--font-family-serif)",
				monospace: "var(--font-family-monospace)",
			},
			fontWeight: {
				regular: "var(--font-regular)",
				medium: "var(--font-medium)",
				bold: "var(--font-bold)",
				extrabold: "var(--font-extrabold)",
			},
			fontSize: {
				xs: "var(--font-xs)",
				sm: "var(--font-sm)",
				base: "var(--font-base)",
				lg: "var(--font-lg)",
				xl: "var(--font-xl)",
				"2xl": "var(--font-2xl)",
				"3xl": "var(--font-3xl)",
				"4xl": "var(--font-4xl)",
				"5xl": "var(--font-5xl)",
			},
			lineHeight: {
				base: "var(--lh-base)",
				heading: "var(--lh-heading)",
				tight: "var(--lh-tight)",
			},
			letterSpacing: {
				normal: "var(--tracking-normal)",
				wide: "var(--tracking-wide)",
				wider: "var(--tracking-wider)",
			},
			spacing: {
				1: "var(--spacing-1)",
				2: "var(--spacing-2)",
				3: "var(--spacing-3)",
				4: "var(--spacing-4)",
				5: "var(--spacing-5)",
				6: "var(--spacing-6)",
				8: "var(--spacing-8)",
				10: "var(--spacing-10)",
				12: "var(--spacing-12)",
				16: "var(--spacing-16)",
				20: "var(--spacing-20)",
				24: "var(--spacing-24)",
			},
		},
	},
	plugins: [],
};
