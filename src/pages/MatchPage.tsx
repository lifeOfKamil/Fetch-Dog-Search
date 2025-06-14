import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { matchDogs, getDogsByIds } from "../api";
import { Dog } from "../interfaces";
import DogCard from "../components/DogCard";
import Navbar from "../components/Navbar";
import "../styles/MatchPage.css";

const MatchPage: React.FC = () => {
	const { favorites } = useFavorites();
	const [match, setMatch] = useState<Dog | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchMatch();
	}, [favorites]);

	const fetchMatch = async () => {
		if (favorites.length === 0) {
			setError("You need to favorite at least one dog to get matched.");
			setLoading(false);
			return;
		}
		try {
			const matchId = await matchDogs(favorites);
			const [dog] = await getDogsByIds([matchId]);
			setMatch(dog);
		} catch (err) {
			console.error("Match error:", err);
			setError("Something went wrong finding your match.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="match-page">
			<Navbar />
			<h2>Your Match</h2>
			<div className="match-container">
				{loading && <p>Finding your perfect dog...</p>}
				{error && <p>{error}</p>}
				{match && <DogCard dog={match} selected={true} onSelect={() => {}} />}
			</div>
			{favorites.length > 0 && (
				<button className="match-button" onClick={fetchMatch}>
					Find New Match
				</button>
			)}
		</div>
	);
};

export default MatchPage;
