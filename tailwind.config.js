/** @type {import('tailwindcss').Config} */
export default {
	content: ['./public/index.html', './src/**/*.{js,ts}'],
	theme: {
	  extend: {
		colors: {
		  pomodoro: '#BA4949',
		  short: '#38858A',
		  long: '#397097'
		},
		fontFamily: {
		  poppins: 'Poppins'
		}
	  }
	},
	plugins: []
  };