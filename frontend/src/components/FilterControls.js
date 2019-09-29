import React, {useEffect, useState} from "react";

import Range from "./Range";
import Container from "./Container";

const defaults = {
    brightness: 50,
    contrast: 50,
    saturation: 50
}

const FilterControls = ({onChange, onEvent}) => {
    const [brightness, setBrightness] = useState(defaults.brightness);
    const [contrast, setContrast] = useState(defaults.contrast);
    const [saturation, setSaturation] = useState(defaults.saturation);

    useEffect(() => {
        const filter = `brightness(${brightness * 2}%)
            contrast(${contrast * 2}%)
            saturate(${saturation * 2}%)`.replace(/\n/g, " ");

        onChange(filter);
    }, [brightness, contrast, saturation]);

    return (
        <Container>
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
                defaultValue={defaults.warmth}
                onChange={warmth => onEvent("setWarmth", warmth)}/>
        </Container>
    );
}

export default FilterControls;