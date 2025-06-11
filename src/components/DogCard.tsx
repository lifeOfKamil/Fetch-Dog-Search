import React, { useEffect } from "react";
import { Dog } from "../interfaces";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useFavorites } from "../contexts/FavoritesContext";
import "../styles/DogCard.css";

interface DogCardProps {
	dog: Dog;
	selected: boolean;
	onSelect: () => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onSelect, selected }) => {
	return (
		<div className="dog-card" onClick={onSelect}>
			<div className="dog-card__img-wrapper">
				<img src={dog.img} alt={`Photo of ${dog.name}`} className="dog-card__img" />
			</div>

			<div className="dog-card__info">
				<h3 className="dog-card__name">
					{dog.name}{" "}
					<span
						onClick={(e) => {
							e.stopPropagation();
							onSelect();
						}}
						className={`dog-card__heart ${selected ? "dog-card__heart--active" : ""}`}
					>
						{selected ? <FaHeart /> : <FaRegHeart />}
					</span>
				</h3>
				<p className="dog-card__breed">{dog.breed}</p>
				<p className="dog-card__age">{dog.age} years</p>
				<p className="dog-card__zip">
					<FaLocationDot />
					{dog.zip_code}
				</p>
			</div>
		</div>
	);
};

export default DogCard;
