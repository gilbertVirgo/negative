import React, {useRef, useEffect, useState} from "react";

import Range from "./Range";
import Container from "./Container";
import Section from "./Section";

const FilterControls = ({onChange, onEvent}) => {
    const [height, setHeight] = useState(0);

    const container = useRef(null);

    const getBounds = () => 
        container.current.getBoundingClientRect();

    const [brightness, setBrightness] = useState(50);
    const [contrast, setContrast] = useState(50);
    const [saturation, setSaturation] = useState(50);

    useEffect(() => {
        if(container.current) {
            setHeight((window.innerHeight - getBounds().y) + "px");

            const handleResize = () => 
                setHeight((window.innerHeight - getBounds().y) + "px");

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            }
        }
    }, [container]);    

    useEffect(() => {
        const filter = `brightness(${brightness * 2}%) contrast(${contrast * 2}%) saturate(${saturation * 2}%)`;

        onChange(filter);
    }, [brightness, contrast, saturation]);

    return (
        <section ref={container} 
            align="center" 
            style={{
            height, 
            overflowX: "scroll", 
            overflowY: "hidden", 
            whiteSpace: "nowrap", 
            width: "100%"}}>
            {height && (<>
                <Range 
                    label="Brightness" 
                    defaultValue={brightness} 
                    onChange={value => setBrightness(value)}/>
                <Range
                    label="Contrast"
                    defaultValue={contrast}
                    onChange={value => setContrast(value)}/>
                <Range 
                    label="Saturation" 
                    defaultValue={saturation}
                    onChange={value => setSaturation(value)}/>
                <Range
                    className="warmth"
                    label="Warmth"
                    defaultValue={50}
                    onChange={temp => onEvent("setTemperature", temp)}/>
                <Range
                    label="Highlights"
                    defaultValue={50}
                    onChange={highlights => onEvent("setHighlights", highlights)}/>
                <Range
                    label="Midtones"
                    defaultValue={50}
                    onChange={midtones => onEvent("setMidtones", midtones)}/>
                <Range
                    label="Shadows"
                    defaultValue={50}
                    onChange={shadows => onEvent("setShadows", shadows)}/>
            </>)}
        </section>
    );
}

export default FilterControls;