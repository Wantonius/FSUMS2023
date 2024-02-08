import { useState,useMemo } from 'react'


function App() {
	const [count, setCount] = useState(0)
	const [currentWord,setCurrentWord] = useState(0);
	const words = ["banaani","omena","jäätelö","talvi"];
	const word = words[currentWord];
	
	const computeWordLength = (word) => {
		let i=0;
		while(i<1000000000) {
			i++;
		}
		return word.length;
	}
	
	//let wordLength = computeWordLength(word);
	let wordLength = useMemo(() => computeWordLength(word),[word])


	return (
		<>
			<div style={{"margin":"auto","textAlign":"center"}}>
				<h3>Compute the length of the word {word}</h3>
				<h3>{word} has {wordLength} letters</h3>
				<button onClick={() => {
					const next = currentWord +1 === words.length ? 0 : currentWord +1;
					setCurrentWord(next)
				}}>Next Word</button>
				
				<h3>Current count:{count}</h3>
				<button onClick={() => setCount(count => count +1)}>Increment</button>
			</div>
		</>
	)
}

export default App
