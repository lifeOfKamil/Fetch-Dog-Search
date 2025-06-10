import axios from "axios";
import { Dog, Location } from "../interfaces";

const api = axios.create({ baseURL: "https://frontend-take-home-service.fetch.com", withCredentials: true });

export function login(name: string, email: string) {
	return api.post("/auth/login", { name, email });
}

export async function fetchBreeds(): Promise<string[]> {
	const response = await api.get<string[]>("/dogs/breeds");
	console.log("Fetched dogs:", response.data);
	return response.data;
}

export function fetchLocations(): Promise<Location[]> {
	return api.get("/locations").then((response) => response.data);
}

export function matchDogs(ids: string[]): Promise<Dog[]> {
	return api.post("/dogs/match", { ids }).then((response) => response.data);
}
