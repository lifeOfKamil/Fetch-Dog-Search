import React from "react";
import "../styles/Pagination.css";

interface PaginationProps {
	current: number;
	total: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
	const pages = Array.from({ length: total }, (_, i) => i + 1);

	const handlePrev = () => {
		if (current > 1) {
			onPageChange(current - 1);
		}
	};

	const handleNext = () => {
		if (current < total) {
			onPageChange(current + 1);
		}
	};

	return (
		<nav className="pagination" aria-label="Page navigation">
			<button
				type="button"
				className="pagination__button"
				onClick={() => onPageChange(current - 1)}
				disabled={current === 1}
			>
				Prev
			</button>

			<ul className="pagination__list">
				{pages.map((page) => (
					<li key={page} className="pagination__item">
						<button
							type="button"
							className={`pagination__link ${page === current ? "pagination__link--active" : ""}`}
							onClick={() => onPageChange(page)}
						>
							{page}
						</button>
					</li>
				))}
			</ul>

			<button
				type="button"
				className="pagination__button"
				onClick={() => onPageChange(current + 1)}
				disabled={current === total}
			>
				Next
			</button>
		</nav>
	);
};

export default Pagination;
