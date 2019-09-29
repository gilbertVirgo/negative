import React, {useState} from 'react';
import {Switch, Route, withRouter} from "react-router-dom";

import Container from './components/Container';

import Welcome from "./pages/Welcome";
import Editor from "./pages/Editor";

import imageCompression from "browser-image-compression";

import "./scss/main.scss";

const toDataURL = async file => new Promise((resolve, reject) => {
	const reader = new FileReader();

	reader.onload = () => resolve(reader.result);
	reader.onerror = reject;

	reader.readAsDataURL(file);
});

const App = ({history}) => {
  	const [image, setImage] = useState(null);

	const handleFile = async file => {
		// Handle exif
		file = await imageCompression(file, {maxSizeMB: 5});

		const dataURL = await toDataURL(file);

		let image = new Image();
		
		image.onload = () => {
			setImage(image);
			history.push("/editor");
		}

		image.src = dataURL;
	}

	return (
		<main>
			<Container className="large">
				<Switch>
				<Route 
					exact path="/" 
					render={
						() => <Welcome onFile={handleFile}/>
					}/>
				<Route
					path="/editor"
					render={
						() => <Editor image={image}/>
					}/>
				</Switch>
			</Container>
		</main>
	);
}

export default withRouter(App);
