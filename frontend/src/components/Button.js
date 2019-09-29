import React from "react";

const Button = ({className, style = {}, children}) => 
    <button className={`button ${className}`} style={style}>{children}</button>

export default Button;