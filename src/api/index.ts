import axios from "axios";
import { Dog, Location, DogSearch, Match, LocationSearch } from "../interfaces";

const api = axios.create({ baseURL: "https://frontend-take-home-service.fetch.com", withCredentials: true });

// Authentication
export function login(name: string, email: string) {
	return api.post("/auth/login", { name, email });
}

export function logout() {
	return api.post("/auth/logout");
}

// Fetch all dogs
export async function fetchDogs(size = 100): Promise<Dog[]> {
	const { resultIds } = await searchDogs({ size, sort: "breed:asc" });

	if (!resultIds.length) {
		console.warn("⚠️ no resultIds returned from /dogs/search");
		return [];
	}

	const dogs = await getDogsByIds(resultIds);
	return dogs;
}

// Fetch list of all breeds
export async function fetchBreeds(): Promise<string[]> {
	const { data } = await api.get<string[]>("/dogs/breeds");
	return data;
}

// Search for dogs with filters
export async function searchDogs(params: {
	breeds?: string[];
	zipCodes?: string[];
	ageMin?: number;
	ageMax?: number;
	size?: number;
	from?: string;
	sort?: string;
}): Promise<DogSearch> {
	const searchParams = new URLSearchParams();

	if (params.breeds) {
		params.breeds.forEach((breed) => searchParams.append("breeds", breed));
	}

	if (params.zipCodes) {
		params.zipCodes.forEach((zipCode) => searchParams.append("zipCodes", zipCode));
	}
	if (params.ageMin !== undefined) searchParams.set("ageMin", String(params.ageMin));
	if (params.ageMax !== undefined) searchParams.set("ageMax", String(params.ageMax));
	if (params.size !== undefined) searchParams.set("size", String(params.size));
	if (params.from !== undefined) searchParams.set("from", params.from);
	if (params.sort !== undefined) searchParams.set("sort", params.sort);

	const { data } = await api.get<DogSearch>(`/dogs/search?${searchParams.toString()}`);
	return data;
}

// Fetch dogs by IDs
export async function getDogsByIds(ids: string[]): Promise<Dog[]> {
	const response = await api.post<Dog[]>(
		"/dogs",
		// ensure this is _exactly_ the array
		JSON.stringify(ids),
		{ headers: { "Content-Type": "application/json" } }
	);
	return response.data;
}

// Match dog given array of dog IDs
export async function matchDogs(ids: string[]): Promise<string> {
	const { data } = await api.post<Match>("/dogs/match", ids);
	return data.match;
}

// Fetch all locations
export async function fetchLocations(): Promise<Location[]> {
	const { data } = await api.post<Location[]>("/locations", []);
	return data;
}

// Search location by city, state, or geoBoundingBox
export async function searchLocations(body: {
	city?: string;
	states?: string[];
	geoBoundingBox?:
		| { top: number; left: number; bottom: number; right: number }
		| {
				bottom_left: { lat: number; lon: number };
				top_right: { lat: number; lon: number };
		  };
	size?: number;
	from?: number;
}): Promise<LocationSearch> {
	const { data } = await api.post<LocationSearch>("/locations/search", body, {
		headers: { "Content-Type": "application/json" },
	});
	return data;
}
