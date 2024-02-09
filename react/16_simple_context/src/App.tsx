import React,{ useState } from 'react'
import ThemeContext,{themes,ThemeType} from './context/ThemeContext';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

interface State {
	theme:ThemeType;
}

function App() {

	const [state,setState] = useState<State>({
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
			<div style={{"margin":"auto","textAlign":"center"}}>
				<Headline>
				Tulorekisteri paljastaa Kelalle väärinkäytösaikeita
				</Headline>
				<Paragraph>
				Kelan väärinkäytösraportin mukaan etuuksia koskevat sosiaaliturvan väärinkäytösepäilyt ovat pysyneet suhteellisen vähäisinä vuosina 2018–2023. 

Vuonna 2023 epäilyjä oli yhteensä 1 277 ja niitä vastaava rahamäärä oli yhteensä noin 7,1 miljoonaa euroa. Vuonna 2023 ilmi tulleiden epäilyjen osuus kaikista maksetuista etuuksista oli 0,45 promillea
				</Paragraph>
				<ThemeButton toggleTheme={toggleTheme}/>
			</div>
		</ThemeContext.Provider>


		
	)
}

export default App
