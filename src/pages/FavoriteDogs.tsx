import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { getDogsByIds } from "../api";
import { Dog } from "../interfaces";
import { BiCarousel } from "react-icons/bi";
import { IoGrid } from "react-icons/io5";
import DogCard from "../components/DogCard";
import Navbar from "../components/Navbar";
import "../styles/FavoriteDogs.css";

const FavoriteDogs: React.FC = () => {
	const { favorites, toggleFavorite } = useFavorites();
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [loading, setLoading] = useState(true);
	const [carouselView, setCarouselView] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const navigate = useNavigate();

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

	const goNext = () => {
		setCurrentIndex((prev) => (prev + 1) % dogs.length);
	};

	const goPrev = () => {
		setCurrentIndex((prev) => (prev - 1 + dogs.length) % dogs.length);
	};

	return (
		<div className="favorites-page">
			<Navbar />
			<h2 className="favorites-page__title">Your Favorites</h2>

			{!carouselView && favorites.length > 0 && (
				<button className="match-button" onClick={() => navigate("/match")}>
					Find Your Match
				</button>
			)}

			{message && <p className="favorites-page__message">{message}</p>}

			<div className="favorites-page__actions">
				{favorites.length > 0 && (
					<div className="view-toggle-buttons">
						<button
							className={`view-button ${!carouselView ? "active" : ""}`}
							onClick={() => setCarouselView(false)}
							aria-label="Grid View"
						>
							<IoGrid />
						</button>
						<button
							className={`view-button ${carouselView ? "active" : ""}`}
							onClick={() => setCarouselView(true)}
							aria-label="Carousel View"
						>
							<BiCarousel />
						</button>
					</div>
				)}
			</div>

			<div className={`favorites-page__grid ${carouselView ? "carousel-view" : "grid-view"}`}>
				{carouselView
					? dogs.length > 0 && (
							<>
								<DogCard
									key={dogs[currentIndex].id}
									dog={dogs[currentIndex]}
									selected={favorites.includes(dogs[currentIndex].id)}
									onSelect={() => toggleFavorite(dogs[currentIndex].id)}
									onClickCard={() => navigate(`/dogs/${dogs[currentIndex].id}`)}
								/>
								<div className="carousel-controls">
									<button onClick={goPrev}>⟵ Previous</button>
									<button onClick={goNext}>Next ⟶</button>
								</div>
							</>
					  )
					: dogs.map((dog) => (
							<DogCard
								key={dog.id}
								dog={dog}
								selected={favorites.includes(dog.id)}
								onSelect={() => toggleFavorite(dog.id)}
								onClickCard={() => navigate(`/dogs/${dog.id}`)}
							/>
					  ))}
			</div>

			{carouselView && favorites.length > 0 && (
				<div className="carousel-match-button-wrapper">
					<button className="match-button" onClick={() => navigate("/match")}>
						Find Your Match
					</button>
				</div>
			)}
		</div>
	);
};

export default FavoriteDogs;
