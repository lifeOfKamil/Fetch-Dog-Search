import React, { useEffect, useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { getDogsByIds } from "../api";
import { Dog } from "../interfaces";
import DogCard from "../components/DogCard";
import Navbar from "../components/Navbar";
import "../styles/FavoriteDogs.css";

const FavoriteDogs: React.FC = () => {
	const { favorites } = useFavorites();
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (favorites.length === 0) {
			setDogs([]);
			setLoading(false);
			return;
		}
		(async () => {
			try {
				const fetched = await getDogsByIds(favorites);
				setDogs(fetched);
				console.log("fetched favorite dogs:", fetched);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		})();
	}, [favorites]);

	let message: string | null = null;
	if (loading) {
		message = "Loading your favorites…";
	} else if (dogs.length === 0) {
		message = "You have no favorite dogs.";
	}

	return (
		<div className="favorites-page">
			<Navbar />
			<h2 className="favorites-page__title">Your Favorites</h2>
			{message && <p className="favorites-page__message">{message}</p>}
			<div className="favorites-page__grid">
				{dogs.map((dog) => (
					<DogCard key={dog.id} dog={dog} onClick={() => {}} />
				))}
			</div>
		</div>
	);
};

export default FavoriteDogs;
