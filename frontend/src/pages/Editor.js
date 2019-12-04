import React, {useRef, useState, useEffect} from "react";
import {withRouter} from "react-router-dom";

import Container from "../components/Container";

import "../functions";
import FilterControls from "../components/FilterControls";
import RotateControls from "../components/RotateControls";

const Editor = ({image, history}) => {
    const canvas = useRef(null);

    const [context, setContext] = useState(null);
    const [filter, setFilter] = useState("");
    const [rotate, setRotate] = useState(0);
    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Send home if no image
        if(!image) history.push("/");
    }, [image, history]);

    useEffect(() => {
        // On canvas load
        if(canvas.current !== null) {
            setContext(canvas.current.getContext("2d"));
        }
    }, [canvas]);

    useEffect(() => {
        // On context set
        if(context !== null) {
            context.renderPreview({image, filter, rotate, events});
            setLoaded(true);
        }
    }, [context, image, filter, rotate, events]);

    const handleEvent = (name, value) => {
        let temp = [...events];

        const current = temp.find(prop => prop[0] === name);

        if(current) current[1] = value; 
        else temp.push([name, value]);

        setEvents(temp);
    }

    return (
        <Container>
            <RotateControls onChange={value => setRotate(value)}/>
            <section className="margin-large" className="container small">
                <canvas className="preview" ref={canvas}/>
            </section>
            {loaded && <FilterControls onChange={value => setFilter(value)} onEvent={handleEvent}/>}
        </Container>
    )
}

export default withRouter(Editor);