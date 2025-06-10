import React from "react";
import { Dog } from "../interfaces";
import "../styles/DogCard.css";

interface DogCardProps {
	dog: Dog;
	selected: boolean;
	onSelect: (id: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, selected, onSelect }) => {
	const handleSeelect = () => {
		onSelect(dog.id);
	};

	return (
		<div
			className={`dog-card ${selected ? "selected" : ""}`}
			onClick={handleSeelect}
			aria-pressed={selected}
			role="button"
			tabIndex={0}
			onKeyPress={(e) => e.key === "Enter" && handleSelect()}
		>
			<div className="dog-card__info">
				<h3>Breed: {dog}</h3>
			</div>
		</div>
	);
};

export default DogCard;
