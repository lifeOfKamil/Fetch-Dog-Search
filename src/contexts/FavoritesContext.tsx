import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoritesContextType {
	favorites: string[];
	toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [favorites, setFavorites] = useState<string[]>(() => {
		const stored = localStorage.getItem("favorites");
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = (id: string) => {
		setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
	};

	return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
};

export function useFavorites(): FavoritesContextType {
	const ctx = useContext(FavoritesContext);
	if (!ctx) {
		throw new Error("useFavorites must be used within FavoritesProvider");
	}
	return ctx;
}
