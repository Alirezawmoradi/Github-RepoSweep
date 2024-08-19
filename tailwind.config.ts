import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'star-pattern': "url('/images/bg-stars-1.webp')",
        'hero-pattern': "url('/images/footer-galaxy.webp')"
      },
    },
  },
  plugins: [],
};
export default config;
