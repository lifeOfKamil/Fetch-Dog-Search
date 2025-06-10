import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

interface LoginPageProps {
	onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
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
			<h1 className="login__title">Log in</h1>
			<form onSubmit={onSubmit} className="login__form">
				<input className="login__input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
				<input
					className="login__input"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button className="login__button">Log in</button>
			</form>
		</div>
	);
}

export { LoginPage };
