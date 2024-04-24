import React from 'react';

export const themes = {
	dark:{
		textcolor:"#FFFFFF",
		background:"#595959"
	},
	light:{
		textcolor:"#000000",
		background:"#d3d3d3"
	}
}

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;