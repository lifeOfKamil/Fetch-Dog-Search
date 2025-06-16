import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { fetchBreeds, searchLocations } from "../api";
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

	const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");

	const [ageMin, setAgeMin] = useState<number | "">("");
	const [ageMax, setAgeMax] = useState<number | "">("");
	const [size, setSize] = useState<number | "">(100);
	const [from, setFrom] = useState<string>("");
	const [sort, setSort] = useState<string>("breed:asc");

	useEffect(() => {
		fetchBreeds().then(setAllBreeds).catch(console.error);
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		let zipCodes = zipCodesText
			.split(/[,\s]+/)
			.map((z) => z.trim())
			.filter(Boolean);

		if (city || state) {
			try {
				const locationResults = await searchLocations({
					city: city || undefined,
					states: state ? [state] : undefined,
					size: 100,
				});
				const locationZips = locationResults.results.map((loc) => loc.zip_code);
				zipCodes = [...new Set([...zipCodes, ...locationZips])];
			} catch (err) {
				console.error("Error fetching lcoations:", err);
			}
		}

		const params = {
			breeds: breeds.length ? breeds : undefined,
			zipCodes: zipCodes.length ? zipCodes : undefined,
			ageMin: typeof ageMin === "number" ? ageMin : undefined,
			ageMax: typeof ageMax === "number" ? ageMax : undefined,
			size: typeof size === "number" ? size : undefined,
			from: from || undefined,
			sort,
		};

		onSearch(params);
	};

	const resetForm = () => {
		setBreeds([]); // reset selected breeds to empty array
		setZipCodesText(""); // reset zip codes to empty string
		setCity("");
		setState("");
		setAgeMin(""); // reset age min to empty string
		setAgeMax(""); // reset age max to empty string
		setSize(100); // reset size to 25
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

	const handleCityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		setCity(input);

		if (input.length >= 2) {
			try {
				const response = await searchLocations({ city: input, size: 10 });

				const uniqueCities = Array.from(new Set(response.results.map((loc) => `${loc.city}, ${loc.state}`)));
				setCitySuggestions(uniqueCities);
				setShowSuggestions(true);
			} catch (err) {
				console.error("Error searching for city:", err);
				setCitySuggestions([]);
			}
		} else {
			setShowSuggestions(false);
			setCitySuggestions([]);
		}
	};

	const handleCitySelect = (suggestion: string) => {
		const [selectedCity, selectedState] = suggestion.split(", ");
		setCity(selectedCity);
		setState(selectedState);
		setShowSuggestions(false);
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

			<label className="text-dark" style={{ position: "relative" }}>
				City:
				<input
					type="text"
					placeholder="e.g. Chicago"
					value={city}
					onChange={handleCityChange}
					onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
					onFocus={() => citySuggestions.length > 0 && setShowSuggestions(true)}
				/>
				{showSuggestions && (
					<ul className="autocomplete-dropdown">
						{citySuggestions.map((suggestion) => (
							<li key={suggestion} onClick={() => handleCitySelect(suggestion)}>
								{suggestion}
							</li>
						))}
					</ul>
				)}
			</label>

			<label className="text-dark">
				State:
				<select value={state} onChange={(e) => setState(e.target.value)}>
					<option value="">Select a state</option>
					{[
						"AL",
						"AK",
						"AZ",
						"AR",
						"CA",
						"CO",
						"CT",
						"DE",
						"FL",
						"GA",
						"HI",
						"ID",
						"IL",
						"IN",
						"IA",
						"KS",
						"KY",
						"LA",
						"ME",
						"MD",
						"MA",
						"MI",
						"MN",
						"MS",
						"MO",
						"MT",
						"NE",
						"NV",
						"NH",
						"NJ",
						"NM",
						"NY",
						"NC",
						"ND",
						"OH",
						"OK",
						"OR",
						"PA",
						"RI",
						"SC",
						"SD",
						"TN",
						"TX",
						"UT",
						"VT",
						"VA",
						"WA",
						"WV",
						"WI",
						"WY",
					].map((st) => (
						<option key={st} value={st}>
							{st}
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
				<input
					type="number"
					min={1}
					max={100}
					value={size}
					onChange={(e) => {
						const val = e.target.value;
						setSize(val === "" ? "" : Math.max(1, Math.min(100, +val)));
					}}
				/>
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
			<div className="buttons-container">
				<button type="submit">Search Dogs</button>
				<button type="reset" onClick={resetForm}>
					Reset
				</button>
			</div>
		</form>
	);
};

export default DogSearchFilter;
