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
                    black: "#0A0A0A",
                    white: "#FFFFFF",
                    green: {
                        DEFAULT: "#0F5C3C", // primary brand green (from logo/poster)
                        dark: "#0A3D28",
                        light: "#1C7A50",
                    },
                    maroon: {
                        DEFAULT: "#7A1420", // secondary accent — used sparingly
                        dark: "#5C0F18",
                    },
                    gray: {
                        50: "#FAFAFA",
                        100: "#F2F2F0",
                        200: "#E5E5E2",
                        600: "#5C5C58",
                        900: "#1A1A18",
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
            },
        },
    },
    plugins: [],
};

export default config;