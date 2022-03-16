const theme = require('./theme');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...theme,
    },
  },
  plugins: [],
  important: true,
};
