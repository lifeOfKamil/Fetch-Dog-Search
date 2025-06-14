import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/pupmatch_logo.jpg";
import "../styles/LoginPage.css";

interface LoginPageProps {
	onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login(name, email);
		onLogin();
		navigate("/search");
	};

	return (
		<div className="login">
			<h1 className="login__brand">PupMatch</h1>
			<img src={logo} alt="PupMatch Logo" className="login__logo" />
			<h2 className="login__title">Log in</h2>
			<form onSubmit={onSubmit} className="login__form">
				<input
					className="login__input text-light"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="login__input text-light"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button className="login__button">Log in</button>
			</form>
		</div>
	);
};

export default LoginPage;
