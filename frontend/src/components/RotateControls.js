import React, {useEffect, useState} from "react";
import Icon from "./Icon";
import Container from "./Container";

const RotateControls = ({onChange, defaultValue}) => {
    const [rotate, setRotate] = useState(defaultValue);

    useEffect(() => {
        if(onChange) onChange(rotate);
    }, [rotate]);

    return (
        <Container>
            <Icon onClick={() => setRotate(rotate + 90)} className="rotate-right" align="right" src={require("../assets/rotate-right.svg")}/>
            <Icon onClick={() => setRotate(rotate - 90)} className="rotate-left" align="right" style={{marginRight: "10px"}}src={require("../assets/rotate-left.svg")}/>
        </Container>
    );
}

export default RotateControls;