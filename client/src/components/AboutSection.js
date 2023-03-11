// AboutSection page is the part of AboutUsCard which holds the content and manage its link

import React from "react";
import { Link } from "react-router-dom";

function AboutSection (props) {
    return (
        <>
            <li className="aboutSections-item">
                <Link className="aboutSections-item-link" to={props.href}>
                    <figure className="aboutSections-item-pic-wrap">
                        <img className="aboutSections-item-img" alt="AboutSection" src={props.src} />
                    </figure>
                    <div className="aboutSections-item-info">
                        <h5 className="aboutSections-item-text">{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default AboutSection;
