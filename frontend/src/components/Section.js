import React from "react";

const Section = ({title, children}) => (
    <section className="section">
        <h4 className="caps thick sans-serif text-light">{title}</h4>
        <hr/>
        {children}
    </section>
)

export default Section;