import {useNavigate} from 'react-router-dom';

const About = (props) => {
	
	const navigate = useNavigate();
	
	return (
	<>
		<h2>This is the React Router Test</h2>
		<button onClick={() => navigate("/secret")}>Go to Secret Page</button>
	</>
	)
}

export default About;