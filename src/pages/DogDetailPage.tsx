import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDogsByIds } from "../api";
import type { Dog } from "../interfaces";
import "../styles/DogDetailPage.css";

const DogDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [dog, setDog] = useState<Dog | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;
		(async () => {
			try {
				const fetched = await getDogsByIds([id]);
				setDog(fetched[0] || null);
			} catch (err) {
				console.error("Failed to load dog:", err);
				setDog(null);
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	if (loading) {
		return <div className="dog-detail__loading">Loading…</div>;
	}
	if (!dog) {
		return <div className="dog-detail__error">Dog not found.</div>;
	}

	return (
		<div className="dog-detail">
			<button className="dog-detail__back" onClick={() => navigate(-1)}>
				← Back
			</button>

			<div className="dog-detail__card">
				<img src={dog.img} alt={`Photo of ${dog.name}`} className="dog-detail__img" />

				<div className="dog-detail__info">
					<h2 className="dog-detail__name">{dog.name}</h2>

					<ul className="dog-detail__list">
						<li>
							<strong>ID:</strong> {dog.id}
						</li>
						<li>
							<strong>Breed:</strong> {dog.breed}
						</li>
						<li>
							<strong>Age:</strong> {dog.age} year{dog.age !== 1 && "s"}
						</li>
						<li>
							<strong>ZIP Code:</strong> {dog.zip_code}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DogDetailPage;
