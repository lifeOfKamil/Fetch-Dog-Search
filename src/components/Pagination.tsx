import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Pagination.css";

interface PaginationProps {
	current: number;
	total: number;
	onPageChange: (page: number) => void;
	windowSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange, windowSize = 1 }) => {
	let start = current - windowSize;
	let end = current + windowSize;

	if (start < 1) {
		start = 1;
		end = Math.min(total, windowSize * 2 + 1);
	}

	if (end > total) {
		end = total;
		start = Math.max(1, total - windowSize * 2);
	}

	const pages: (number | string)[] = [];
	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	if (end < total) {
		pages.push("...");
		pages.push(total);
	}

	return (
		<nav className="pagination" aria-label="Page navigation">
			<button
				type="button"
				className="pagination__button"
				onClick={() => onPageChange(current - 1)}
				disabled={current === 1}
			>
				<IoIosArrowBack />
			</button>

			<ul className="pagination__list">
				{pages.map((page, idx) =>
					typeof page === "number" ? (
						<li key={idx} className="pagination__item">
							<button
								className={"pagination__link" + (page === current ? " pagination__link--active" : "")}
								onClick={() => onPageChange(page)}
							>
								{page}
							</button>
						</li>
					) : (
						<li key={idx} className="pagination__item">
							<span className="pagination__ellipsis">{page}</span>
						</li>
					)
				)}
			</ul>

			<button
				type="button"
				className="pagination__button"
				onClick={() => onPageChange(Math.min(total, current + 1))}
				disabled={current === total}
			>
				<IoIosArrowForward />
			</button>
		</nav>
	);
};

export default Pagination;
