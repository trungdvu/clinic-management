const theme = require('./theme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...theme,
    },
  },
  plugins: [],
  important: true,
};
