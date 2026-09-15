import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                eminence: {
                    // New primary palette — ivory / black / gold
                    ivory: {
                        DEFAULT: "#FAF7F0",
                        dark: "#F2EDE1",
                    },
                    black: "#0A0A0A",
                    white: "#FFFFFF",
                    gold: {
                        DEFAULT: "#B8935A",
                        light: "#D4AF7A",
                        dark: "#8F6E3F",
                    },
                    gray: {
                        50: "#FAFAFA",
                        100: "#F2F2F0",
                        200: "#E5E5E2",
                        600: "#5C5C58",
                        900: "#1A1A18",
                    },
                    // Retained for existing photography / legacy references only —
                    // no longer used as the dominant website UI palette
                    green: {
                        DEFAULT: "#0F5C3C",
                        dark: "#0A3D28",
                        light: "#2ECC81",
                    },
                    maroon: {
                        DEFAULT: "#7A1420",
                        dark: "#5C0F18",
                    },
                },
            },
            fontFamily: {
                heading: ["var(--font-heading)"],
                body: ["var(--font-body)"],
            },
            maxWidth: {
                container: "1400px",
            },
            letterSpacing: {
                widest2: "0.2em",
            },
            animation: {
                "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                "ping-slower": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.6s",
                marquee: "marquee 30s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;