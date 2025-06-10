import { useEffect, useState } from "react";
import { fetchDogs } from "../api";
import { Dog } from "../interfaces";
import "../styles/SearchPage.css";

export default function SearchPage() {
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [filtered, setFiltered] = useState<Dog[]>([]);

	useEffect(() => {
		fetchDogs().then((all) => {
			setDogs(all);
			setFiltered(all);
		});
	}, []);

	return (
		<div className="search-page">
			<h1 className="search-page__title">Search</h1>
		</div>
	);
}

export { SearchPage };
