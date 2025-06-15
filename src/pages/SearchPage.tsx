import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchDogs, getDogsByIds, searchDogs } from "../api";
import { useNavigate } from "react-router-dom";
import { Dog } from "../interfaces";
import { useFavorites } from "../contexts/FavoritesContext";
import Navbar from "../components/Navbar";
import DogCard from "../components/DogCard";
import Pagination from "../components/Pagination";
import { FaFilter } from "react-icons/fa";
import { DogSearchFilter } from "../components/DogSearchFilter";
import "../styles/SearchPage.css";

const SearchPage: React.FC = () => {
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [filtered, setFiltered] = useState<Dog[]>([]);
	const [sortAsc, setSortAsc] = useState(true);
	const [breedFilter, setBreedFilter] = useState<string>("All");
	const [page, setPage] = useState(1);
	const [showFilter, setShowFilter] = useState(false);
	const filterRef = useRef<HTMLDivElement>(null);
	const { favorites, toggleFavorite } = useFavorites();
	const [loading, setLoading] = useState(true);
	const perPage = 10;
	const navigate = useNavigate();

	// Load all dogs on mount
	useEffect(() => {
		fetchDogs()
			.then((allDogs) => {
				console.log("loaded dogs:", allDogs.length);
				setDogs(allDogs);
				setFiltered(allDogs);
				setLoading(false);
			})
			.catch(console.error);
	}, []);

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (showFilter && filterRef.current && !filterRef.current.contains(e.target as Node)) {
				setShowFilter(false);
			}
		},
		[showFilter]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	// Filter and set pages when filting or sorting dogs
	useEffect(() => {
		let list = [...dogs];
		if (breedFilter !== "All") {
			list = list.filter((d) => d.breed === breedFilter);
		}
		list.sort((a, b) => (sortAsc ? a.breed.localeCompare(b.breed) : b.breed.localeCompare(a.breed)));
		setFiltered(list);
		setPage(1);
	}, [dogs, breedFilter, sortAsc]);

	const handleSearch = async (params: Parameters<typeof searchDogs>[0]) => {
		try {
			const { resultIds } = await searchDogs(params);
			const resultDogs = await getDogsByIds(resultIds);
			setDogs(resultDogs);
			setFiltered(resultDogs);
			setPage(1);
			setShowFilter(false);
		} catch (err) {
			console.error("Dog search failed:", err);
		}
	};

	//const breeds = useMemo(() => ["All", ...Array.from(new Set(dogs.map((d) => d.breed))).sort()], [dogs]);

	const totalPages = Math.ceil(filtered.length / perPage);
	const paged = filtered.slice((page - 1) * perPage, page * perPage);

	return (
		<div className="search-page text-light">
			<Navbar />
			<header className="search-page__controls">
				{loading && <p>Finding your perfect dog...</p>}
				<div className="filter-wrapper" ref={filterRef}>
					<button
						className="filter-toggle"
						onClick={() => setShowFilter((v) => !v)}
						aria-expanded={showFilter}
						aria-label="Toggle filters"
					>
						Filter <FaFilter />
					</button>
					{showFilter && (
						<div className="filter-dropdown">
							<DogSearchFilter onSearch={handleSearch} />
						</div>
					)}
				</div>
			</header>

			<section className="search-page__results text-dark">
				{paged.map((dog) => (
					<DogCard
						key={dog.id}
						dog={dog}
						selected={favorites.includes(dog.id)}
						onSelect={() => toggleFavorite(dog.id)}
						onClickCard={() => {
							console.log("clicked: ", dog.id);
							navigate(`/dog/${dog.id}`);
						}}
					/>
				))}
			</section>
			<Pagination current={page} total={totalPages} onPageChange={setPage} />
		</div>
	);
};

export default SearchPage;
