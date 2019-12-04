import React, {useRef, useState, useEffect} from "react";

import _ from "lodash";

// Not a stateful component

const toPercent = (pixel, length) => Math.round((pixel / length) * 100);
const toPixel = (perc, length) => Math.round((perc * length) / 100);

const getBounds = (bar, control) => ({
    barBounds: bar.getBoundingClientRect(),
    controlBounds: control.getBoundingClientRect()
});

const Range = ({className = "", label, defaultValue, onChange}) => {
    const bar = useRef(null);
    const control = useRef(null);

    const [pos, setPos] = useState(defaultValue);

    const renderControl = () => {
        const {barBounds, controlBounds} = getBounds(bar.current, control.current);

        let ext = barBounds.height - controlBounds.height,
            y = toPixel(pos, ext);

        control.current.style.transform = `translate3d(0, ${ext - y}px, 0)`;
    }

    useEffect(() => {
        if(bar.current && control.current) {
            const main = document.getElementById("main");
            let pointerDown = null;

            const onPointerMove = ({clientY}) => {
                const {barBounds, controlBounds} = getBounds(bar.current, control.current);
                const ext = barBounds.height - controlBounds.height;
                const value = _.clamp((barBounds.top + barBounds.height) - clientY, 0, ext);

                if(pointerDown) {
                    let newPos = toPercent(value, ext);

                    setPos(newPos);
                }
            };
            const onPointerUp = () => {
                main.classList.remove("dragging");
                pointerDown = false;
            }
            const onPointerDown = () => {
                main.classList.add("dragging");
                pointerDown = true;
            }

            // Requested by lint
            const cont = control.current;

            main.addEventListener("pointermove", onPointerMove);
            main.addEventListener("pointerup", onPointerUp);
            cont.addEventListener("pointerdown", onPointerDown);

            return () => {
                // Listener cleanup
                main.removeEventListener("pointermove", onPointerMove);
                main.removeEventListener("pointerup", onPointerUp);
                cont.removeEventListener("pointerdown", onPointerDown);
            }
        }
    }, [bar, control]);

    useEffect(() => {
        onChange(pos)
    }, [pos]);

    // Render control every time the component renders.
    // Works when listening for resize doesn't.
    if(bar.current && control.current) renderControl();

    return (
        <div className="range-outer" label={label}>
            <div 
                ref={bar} 
                className={`range-bar ${className}`}/>
            <div 
                ref={control}
                className="range-control"/>
        </div>
    );
}

export default Range;