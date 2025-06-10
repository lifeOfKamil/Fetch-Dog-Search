import { useEffect, useState, useMemo } from "react";
import { fetchBreeds } from "../api";
import { Dog } from "../interfaces";
import DogCard from "../components/DogCard";
import Pagination from "../components/Pagination";
import BreedFilter from "../components/BreedFilter";
import "../styles/SearchPage.css";

export default function SearchPage() {
	const [availableBreeds, setAvailableBreeds] = useState<string[]>([]);
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [filtered, setFiltered] = useState<Dog[]>([]);
	const [breed, setBreed] = useState("all");
	const [sortAsc, setSortAsc] = useState(true);
	const [breedFilter, setBreedFilter] = useState<string>("all");
	const [page, setPage] = useState(1);
	const perPage = 10;
	const paged = filtered.slice((page - 1) * perPage, page * perPage);

	useEffect(() => {
		fetchBreeds().then((all) => {
			setDogs(all);
			setFiltered(all);
		});
	}, []);

	const breeds = useMemo(() => {
		const names = Array.from(new Set(dogs.map((d) => d.breed)));
		return ["all", ...names].sort();
	}, [dogs]);

	return (
		<div className="search-page">
			<header className="search-page__controls">
				<BreedFilter breeds={dogs} value={breed} onChange={setBreed} />
				<button onClick={() => setSortAsc(!sortAsc)}>Sort: {sortAsc ? "A→Z" : "Z→A"}</button>
			</header>

			<section className="search-page__results">
				{paged.map((d) => (
					<DogCard key={d.id} dog={d} selected={false} onSelect={() => {}} />
				))}
			</section>
			<Pagination page={page} total={Math.ceil(filtered.length / perPage)} onPageChange={setPage} />
		</div>
	);
}

export { SearchPage };
