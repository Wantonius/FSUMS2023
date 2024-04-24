import { StyleSheet,View } from 'react-native';
import ThemeContext,{themes} from './context/ThemeContext';
import {useState} from 'react';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

export default function App() {
	
	const [state,setState] = useState({
		theme:themes.dark
	})
	
	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}
	
	return (
		<ThemeContext.Provider value={state.theme}>
			<View style={styles.container}>
				<Headline>
				Hello React Navigation
				</Headline>
				<Paragraph>
				In a web browser, you can link to different pages using an anchor tag. When the user clicks on a link, the URL is pushed to the browser history stack. When the user presses the back button, the browser pops the item from the top of the history stack, so the active page is now the previously visited page. React Native doesn't have a built-in idea of a global history stack like a web browser does -- this is where React Navigation enters the story.
				</Paragraph>
				<ThemeButton toggleTheme={toggleTheme}/>
			</View>
		</ThemeContext.Provider>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
