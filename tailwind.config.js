module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "rgb(83, 87, 90)",
        customGreen: "rgb(15, 103, 31)",
        customMaroon: "rgb(159, 34, 65)",
        customGold: "rgb(180, 162, 105)",
      },
      screens: {
        "custom-md-lg": "960px",
        "custom-lg": "1280px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
