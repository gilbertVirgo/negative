import React, {useRef, useState, useEffect} from "react";

import _ from "lodash";

// Not a stateful component

const toPercent = (pixel, width) => Math.round((pixel / width) * 100);
const toPixel = (perc, width) => Math.round((perc * width) / 100);

const getBounds = (bar, control) => ({
    barBounds: bar.getBoundingClientRect(),
    controlBounds: control.getBoundingClientRect()
});

const Range = ({className = "", label, defaultValue, onChange}) => {
    const bar = useRef(null);
    const control = useRef(null);

    const [rotate, setRotate] = useState(0);
    const [barBounds, setBarBounds] = useState(null);
    const [controlBounds, setControlBounds] = useState(null);

    const [pos, setPos] = useState();

    const resetBounds = () => {
        const {barBounds, controlBounds} = getBounds(bar.current, control.current);

        setBarBounds(barBounds);
        setControlBounds(controlBounds);
    }

    useEffect(() => {
        if(bar.current && control.current) {
            resetBounds();
        }
    }, [bar, control]);

    useEffect(() => {
        if(barBounds && controlBounds) {
            // First time round
            if(!pos) setPos(
                toPixel(
                    defaultValue, 
                    barBounds.width - controlBounds.width
                )
            );

            let mouseDown = null;

            const onPointerMove = ({clientX}) => {
                const ext = barBounds.width - controlBounds.width;

                const x = _.clamp(clientX - barBounds.x - (controlBounds.width / 2), 0, ext);

                if(mouseDown) {
                    setPos(x);
                    onChange(toPercent(x, ext));
                }
            };
            const onPointerUp = () => {mouseDown = false}
            const onPointerDown = () => {mouseDown = true}

            window.addEventListener("resize", resetBounds);
            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
            control.current.addEventListener("pointerdown", onPointerDown);

            return () => {
                // Listener cleanup
                window.removeEventListener("resize", resetBounds);
                window.removeEventListener("pointermove", onPointerMove);
                window.removeEventListener("pointerup", onPointerUp);
                control.current.removeEventListener("pointerdown", onPointerDown);
            }
        }
    }, [barBounds, controlBounds]);

    return (
        <section>
            <label>{label}</label>
            <div className="range-outer">
                <div 
                    ref={bar} 
                    className={`range-bar ${className}`}/>
                <div 
                    ref={control}
                    style={{transform: `translateX(${pos}px)`}}
                    className="range-control"/>
            </div>
        </section>
    );
}

export default Range;