/* Simple footer */ 

import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join the Lemon Newsletter to Receive Our Latest Updates
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input
                            className="footer-input"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                        />
                        <Button linkto="/" buttonStyle="btn--outline">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to="/how-it-works">How it works</Link>
                        <Link to="/aboutus">User manual</Link>
                        <Link to="/meet-the-team">Meet the team</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Contact Us</h2>
                        <a href="/">
                            <i className="fas fa-phone" /> (+61) 415 670 342
                        </a>
                        <a href="mailto:lemon@gmail.com">
                            <i className="fas fa-envelope"></i> lemon@gmail.com
                        </a>
                        <a href="https://faxauthority.com/glossary/fax-machine/">
                            <i className="fas fa-fax"></i> (+61) 456 789 012
                        </a>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Reviews</h2>
                        <a href="https://www.rottentomatoes.com/m/morbius">Customers</a>
                        <a href="https://www.rottentomatoes.com/m/morbius">Members</a>
                        <a href="https://www.rottentomatoes.com/m/morbius">
                            Assistance Pros.
                        </a>
                    </div>
                    <div className="footer-link-items">
                        <h2>Social Media</h2>
                        <a href="http://www.facebook.com/">Facebook</a>
                        <a href="http://www.instagram.com/">Instagram</a>
                        <a href="http://www.youtube.com/">Youtube</a>
                        <a href="http://www.twitter.com/">Twitter</a>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            <img src={"images/logo.png"} alt="logo" />
                        </Link>
                    </div>
                    <small className="website-rights">LEMON © 2022</small>
                    <div className="social-icons">
                        <Link
                            className="social-icon-link facebook"
                            to="/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i className="fab fa-facebook-f" />
                        </Link>
                        <Link
                            className="social-icon-link instagram"
                            to="/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram" />
                        </Link>
                        <Link
                            className="social-icon-link youtube"
                            to="/"
                            target="_blank"
                            aria-label="Youtube"
                        >
                            <i className="fab fa-youtube" />
                        </Link>
                        <Link
                            className="social-icon-link twitter"
                            to="/"
                            target="_blank"
                            aria-label="Twitter"
                        >
                            <i className="fab fa-twitter" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;
