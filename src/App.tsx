import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import { login, fetchDogs } from "./api";
import { Dog } from "./interfaces";
import "./App.css";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
				<Route path="/search" element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" replace />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
