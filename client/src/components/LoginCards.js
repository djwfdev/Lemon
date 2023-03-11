import React, { useEffect } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import { Button } from "../components/Button";

const LoginCards = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="cards">
            <h1>Log in</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src="images/roadsideassistance.jpg"
                            text="Login as Assistance Professional"
                            path="/login-ap"
                        />
                        <CardItem
                            src="images/motorist.jpg"
                            text="Login as Motorist"
                            path="/login-motorist"
                        />
                    </ul>
                </div>
                <Button
                    linkto="/signup"
                    buttonStyle="btn--filled"
                    buttonSize="btn--large"
                >
                    Don't have an account? Sign Up
                </Button>
            </div>
        </div>
    );
};

export default LoginCards;
