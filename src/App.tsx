import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import DogDetailPage from "./pages/DogDetailPage";
import FavoriteDogs from "./pages/FavoriteDogs";
import { fetchBreeds } from "./api"; // any protected endpoint works
import "./App.css";

function App() {
	// undefined = still checking, true/false = known auth state
	const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

	// on mount, hit a protected endpoint
	useEffect(() => {
		fetchBreeds()
			.then(() => setIsAuth(true))
			.catch(() => setIsAuth(false));
	}, []);

	// while we don’t know yet, render nothing (or a spinner)
	if (isAuth === undefined) {
		return <div className="loading">Loading…</div>;
	}

	return (
		<Router>
			<Routes>
				{/* if already authed, redirect /login → /search */}
				<Route
					path="/login"
					element={isAuth ? <Navigate to="/search" replace /> : <LoginPage onLogin={() => setIsAuth(true)} />}
				/>

				{/* protect /search */}
				<Route path="/search" element={isAuth ? <SearchPage /> : <Navigate to="/login" replace />} />

				{/* Dog Detail route */}
				<Route path="/dog/:id" element={isAuth ? <DogDetailPage /> : <Navigate to="/login" replace />} />

				{/* Favorites route */}
				<Route path="/favorites" element={isAuth ? <FavoriteDogs /> : <Navigate to="/login" replace />} />

				{/* catch-all: send them to wherever makes sense */}
				<Route path="*" element={isAuth ? <Navigate to="/search" replace /> : <Navigate to="/login" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
