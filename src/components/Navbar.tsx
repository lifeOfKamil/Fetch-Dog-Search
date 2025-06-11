import React, { useState } from "react";
import { logout } from "../api";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="navbar">
			<div className="logo">
				{/* Replace with your logo or text */}
				<a href="/">PupMatch</a>
			</div>

			<nav className={`nav ${isOpen ? "nav--open" : ""}`}>
				<ul className="nav__list">
					<li className="nav__item">
						<a href="/search">Browse</a>
					</li>
					<li className="nav__item">
						<a href="/favorites">Favorites</a>
					</li>
					<li className="nav__item">
						<a href="/match">Your Match</a>
					</li>
					<li className="nav__item">
						<a href="/login" onClick={handleLogout}>
							Logout
						</a>
					</li>
				</ul>
			</nav>

			<button
				className={`hamburger ${isOpen ? "is-active" : ""}`}
				onClick={toggleMenu}
				aria-label="Toggle menu"
				aria-expanded={isOpen}
			>
				<span className="hamburger__line" />
				<span className="hamburger__line" />
				<span className="hamburger__line" />
			</button>
		</div>
	);
};

export default Navbar;
