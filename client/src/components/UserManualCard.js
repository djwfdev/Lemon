import React, { useEffect } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

const UserManualCard = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="cards">
            <h1>User Manuals</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <li className="cards__item">
                            <Link className="cards__item__link" 
                                to={{ pathname: "https://drive.google.com/file/d/1Sb4pYg81K9ObN7_l8URLcmwf_Y1csKbb/view?usp=sharing"}} target="_blank">
                                <figure className="cards__item__pic-wrap">
                                    <img className="cards__item__img" alt="CardItem" src='images/roadsideassistance.jpg' />
                                </figure>
                                <div className="cards__item__info">
                                    <h5 className="cards__item__text">Assistance Professional user manual</h5>
                                </div>
                            </Link>
                        </li>
                        <li className="cards__item">
                            <Link className="cards__item__link" 
                                to={{ pathname: "https://drive.google.com/file/d/1Sb4pYg81K9ObN7_l8URLcmwf_Y1csKbb/view?usp=sharing"}} target="_blank">
                                <figure className="cards__item__pic-wrap">
                                    <img className="cards__item__img" alt="CardItem" src='images/motorist.jpg' />
                                </figure>
                                <div className="cards__item__info">
                                    <h5 className="cards__item__text">Motorist user manual</h5>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserManualCard;
