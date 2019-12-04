import React, {useState} from 'react';
import {Switch, Route, withRouter} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Editor from "./pages/Editor";

import imageCompression from "browser-image-compression";

import "./scss/main.scss";

require('dotenv').config()

const toDataURL = async file => new Promise((resolve, reject) => {
	const reader = new FileReader();

	reader.onload = () => resolve(reader.result);
	reader.onerror = reject;

	reader.readAsDataURL(file);
});

const App = ({history}) => {
	const [preview, setPreview] = useState(null);
	const [fullRes, setFullRes] = useState(null);	  

	const handleFile = async file => {
		// Split file into low-res and high-res copies. Force synchronus

		// Handle exif (rotation problems)
		file = await imageCompression(file, {maxSizeMB: 5});
		const dataURL = await toDataURL(file);

		let fullRes = new Image();

		await new Promise(resolve => {
			fullRes.onload = resolve;
			fullRes.src = dataURL;
		});
		setFullRes(fullRes);

		// Downsize image for preview
		const exp = process.env.REACT_APP_CANVAS_WIDTH / Math.max(fullRes.width, fullRes.height);

		let preview = new Image(fullRes.width * exp, fullRes.height * exp);
		
		await new Promise(resolve => {
			preview.onload = resolve;
			preview.src = dataURL;
		});
		setPreview(preview);

		history.push("/editor");
	}

	return (
		<main id="main">
			<Switch>
				<Route 
					exact path="/" 
					render={
						() => <Welcome onFile={handleFile}/>
					}/>
				<Route
					path="/editor"
					render={
						() => <Editor image={preview}/>
					}/>
			</Switch>
		</main>
	);
}

export default withRouter(App);
