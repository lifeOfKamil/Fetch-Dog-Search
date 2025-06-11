import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { fetchBreeds, searchDogs } from "../api";
import { DogSearch } from "../interfaces";
import "../styles/DogSearchFilter.css";

export interface DogSearchFilterProps {
	onSearch: (params: {
		breeds?: string[];
		zipCodes?: string[];
		ageMin?: number;
		ageMax?: number;
		size?: number;
		from?: string;
		sort?: string;
	}) => void;
}

export const DogSearchFilter: React.FC<DogSearchFilterProps> = ({ onSearch }) => {
	const [allBreeds, setAllBreeds] = useState<string[]>([]);
	const [breeds, setBreeds] = useState<string[]>([]);
	const [zipCodesText, setZipCodesText] = useState<string>("");
	const [ageMin, setAgeMin] = useState<number | "">("");
	const [ageMax, setAgeMax] = useState<number | "">("");
	const [size, setSize] = useState<number>(25);
	const [from, setFrom] = useState<string>("");
	const [sort, setSort] = useState<string>("breed:asc");

	useEffect(() => {
		fetchBreeds().then(setAllBreeds).catch(console.error);
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const zipCodes = zipCodesText
			.split(/[,\s]+/)
			.map((z) => z.trim())
			.filter(Boolean);

		const params = {
			breeds: breeds.length ? breeds : undefined,
			zipCodes: zipCodes.length ? zipCodes : undefined,
			ageMin: typeof ageMin === "number" ? ageMin : undefined,
			ageMax: typeof ageMax === "number" ? ageMax : undefined,
			size,
			from: from || undefined,
			sort,
		};

		onSearch(params);
	};

	const resetForm = () => {
		setBreeds([]); // reset selected breeds to empty array
		setZipCodesText(""); // reset zip codes to empty string
		setAgeMin(""); // reset age min to empty string
		setAgeMax(""); // reset age max to empty string
		setSize(25); // reset size to 25
		setFrom(""); // reset from to empty string
		setSort("breed:asc"); // reset sort to "breed:asc"
	};

	const handleMultiSelect = (
		e: ChangeEvent<HTMLSelectElement>,
		setter: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		const selected = Array.from(e.target.selectedOptions, (o) => o.value);
		setter(selected);
	};

	return (
		<form className="dog-search-filter" onSubmit={handleSubmit}>
			<label className="text-dark">
				Breeds:
				<select multiple value={breeds} onChange={(e) => handleMultiSelect(e, setBreeds)} size={5}>
					{allBreeds.map((b) => (
						<option key={b} value={b}>
							{b}
						</option>
					))}
				</select>
			</label>

			{/* Zip codes (comma- or space-separated) */}
			<label className="text-dark">
				Zip Codes:
				<input
					type="text"
					placeholder="e.g. 60616, 90210"
					value={zipCodesText}
					onChange={(e) => setZipCodesText(e.target.value)}
				/>
			</label>

			{/* Age range */}
			<label className="text-dark">
				Min Age:
				<input
					type="number"
					min={0}
					value={ageMin}
					onChange={(e) => setAgeMin(e.target.value === "" ? "" : +e.target.value)}
				/>
			</label>
			<label className="text-dark">
				Max Age:
				<input
					type="number"
					min={0}
					value={ageMax}
					onChange={(e) => setAgeMax(e.target.value === "" ? "" : +e.target.value)}
				/>
			</label>

			{/* Page size */}
			<label className="text-dark">
				Page Size:
				<input type="number" min={1} max={100} value={size} onChange={(e) => setSize(+e.target.value)} />
			</label>

			{/* Cursor */}
			<label className="text-dark">
				From Cursor:
				<input type="text" placeholder="opaque cursor" value={from} onChange={(e) => setFrom(e.target.value)} />
			</label>

			{/* Sort options */}
			<label className="text-dark">
				Sort By:
				<select value={sort} onChange={(e) => setSort(e.target.value)}>
					<option value="breed:asc">Breed ▲</option>
					<option value="breed:desc">Breed ▼</option>
					<option value="name:asc">Name ▲</option>
					<option value="name:desc">Name ▼</option>
					<option value="age:asc">Age ▲</option>
					<option value="age:desc">Age ▼</option>
				</select>
			</label>

			<button type="submit">Search Dogs</button>
			<button type="reset" onClick={resetForm}>
				Reset
			</button>
		</form>
	);
};

export default DogSearchFilter;
