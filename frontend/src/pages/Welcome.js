import React from "react";

import Container from "../components/Container";
import Button from "../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

const Welcome = ({onFile}) => (
    <Container className="small center">
        <h1 align="center" className="sans-serif text-light text-large thin">Welcome to <b>Negatives</b></h1>
        <p style={{margin: "-15px 0 50px"}} align="center" className="sans-serif text-light text-normal thin">An image manipulation tool</p>

        <Button className="center large">
            Upload image <FontAwesomeIcon icon={faUpload}/>
            <input 
                type="file" title="Upload an image" accept="image/*"
                onChange={({target: {files: [file]}}) => onFile(file)}/>
        </Button>
    </Container>
);

export default Welcome;