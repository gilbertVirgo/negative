import React from "react";

const Icon = props => 
    <img alt="Icon" {...props} className={"icon " + (props.className || "")} />

export default Icon;