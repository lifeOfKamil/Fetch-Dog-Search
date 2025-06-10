import React from "react";

interface BreedFilterProps {
	breeds: string[];
	value: string;
	onChange: (breed: string) => void;
}

const BreedFilter: React.FC<BreedFilterProps> = ({ breeds, value, onChange }) => {
	return (
		<div className="breed-filter">
			<label htmlFor="breed-select" className="breed-filter__label">
				Filter by breed:
			</label>
			<select
				id="breed-select"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="breed-filter__select"
			>
				{breeds.map((breed) => (
					<option key={breed} value={breed}>
						{breed}
					</option>
				))}
			</select>
		</div>
	);
};

export default BreedFilter;
