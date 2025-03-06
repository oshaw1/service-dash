/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "#e2e8f0",
          input: "#e2e8f0",
          ring: "#3b82f6",
          background: "#ffffff",
          foreground: "#0f172a",
          primary: {
            DEFAULT: "#3b82f6",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#f1f5f9",
            foreground: "#1e293b",
          },
          destructive: {
            DEFAULT: "#ef4444",
            foreground: "#ffffff",
          },
          muted: {
            DEFAULT: "#f1f5f9",
            foreground: "#64748b",
          },
          accent: {
            DEFAULT: "#6366f1", // A shade of indigo
            foreground: "#ffffff", // White text color for contrast
          },
          card: {
            DEFAULT: "#ffffff",
            foreground: "#0f172a",
          },
          dark: {
            border: "#374151",
            input: "#374151",
            ring: "#4f46e5",
            background: "#0f172a",
            foreground: "#f1f5f9",
            primary: {
              DEFAULT: "#4f46e5",
              foreground: "#f1f5f9",
            },
            secondary: {
              DEFAULT: "#1e293b",
              foreground: "#f1f5f9",
            },
            destructive: {
              DEFAULT: "#b91c1c",
              foreground: "#f1f5f9",
            },
            muted: {
              DEFAULT: "#1e293b",
              foreground: "#94a3b8",
            },
            accent: {
                DEFAULT: "#6366f1", // A shade of indigo
                foreground: "#ffffff", // White text color for contrast
            },
            card: {
              DEFAULT: "#1e293b",
              foreground: "#f1f5f9",
            },
          }
        },
        borderRadius: {
          lg: "0.5rem",
          md: "calc(0.5rem - 2px)",
          sm: "calc(0.5rem - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }