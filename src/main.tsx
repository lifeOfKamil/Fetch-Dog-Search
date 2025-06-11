import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<FavoritesProvider>
			<App />
		</FavoritesProvider>
	</StrictMode>
);
