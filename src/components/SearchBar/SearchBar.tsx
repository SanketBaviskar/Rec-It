import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, X } from "lucide-react";
import { searchUsers } from "@/services/Api/User/searchUser";

interface UserSearchProps {
	onSelect: (user: any) => void;
	onClear: () => void;
	onResults?: (results: any[]) => void;
	placeholder?: string;
	className?: string;
	variant?: "popup" | "inline";
	triggerSearchOnClick?: boolean;
	initialValue?: string; // New prop
}

export function SearchBar({
	onSelect,
	onClear,
	onResults,
	placeholder = "Search customers or orders...",
	className = "",
	variant = "popup",
	initialValue = "", // Default value
}: UserSearchProps) {
	const [query, setQuery] = useState(initialValue); // Initialize with initialValue
	const [results, setResults] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSelection, setIsSelection] = useState(false);

	useEffect(() => {
		setQuery(initialValue);
		setIsSelection(true);
	}, [initialValue]);

	// Debounce logic
	useEffect(() => {
		const timer = setTimeout(() => {
			if (query.trim().length > 1 && !isSelection) {
				performSearch(query);
			} else {
				setResults([]);
				setIsOpen(false);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [query, isSelection]);

	// Keyboard navigation state
	const [activeIndex, setActiveIndex] = useState(-1);

	const performSearch = async (searchQuery: string) => {
		setLoading(true);
		setError(null);
		try {
			const users = await searchUsers(searchQuery);
			// Limit to top 20 results
			setResults(users.slice(0, 20));
			setIsOpen(true);
			setActiveIndex(-1); // Reset selection
			if (onResults) {
				onResults(users);
			}
		} catch (err: any) {
			setError(err.message || "Something went wrong.");
			setResults([]);
		} finally {
			setLoading(false);
		}
	};

	const clearResults = () => {
		setResults([]);
		setIsOpen(false);
		setActiveIndex(-1);
		if (onResults) {
			onResults([]);
		}
	};

	const handleSelect = (user: any) => {
		setIsSelection(true);
		onSelect(user);
		setQuery(`${user.firstName} ${user.lastName}`);
		clearResults();
	};

	const handleClear = () => {
		setQuery("");
		onClear();
		clearResults();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen || results.length === 0) return;

		if (event.key === "ArrowDown") {
			event.preventDefault();
			setActiveIndex((prev) =>
				prev < results.length - 1 ? prev + 1 : prev
			);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
		} else if (event.key === "Enter") {
			event.preventDefault();
			if (activeIndex >= 0 && activeIndex < results.length) {
				handleSelect(results[activeIndex]);
			}
		} else if (event.key === "Escape") {
			setIsOpen(false);
		}
	};

	return (
		<div className={`relative ${className}`}>
			<div className="flex items-center">
				<div className="relative flex-grow">
					{/* Search Icon */}
					<Search
						aria-label="Search"
						className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
					/>
					{/* Input Field */}
					<Input
						type="text"
						placeholder={placeholder}
						value={query}
						onChange={(e) => {
							setIsSelection(false);
							setQuery(e.target.value);
						}}
						onKeyDown={handleKeyDown}
						className="pl-10 pr-8"
						aria-label="Search Input"
						onFocus={() => {
							if (query.trim().length > 1 && results.length > 0) {
								setIsOpen(true);
							}
						}}
					/>
					{/* Clear Button */}
					{query && (
						<Button
							variant="ghost"
							size="sm"
							className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3"
							onClick={handleClear}
							aria-label="Clear Search"
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
			</div>

			{/* Popup Results */}
			{variant === "popup" && isOpen && query.trim().length > 1 && (
				<div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-2 shadow-md">
					<ScrollArea>
						{loading ? (
							<div className="text-center text-muted-foreground py-2">
								Loading...
							</div>
						) : error ? (
							<div className="text-center text-red-500 py-2">
								{error}
							</div>
						) : results.length > 0 ? (
							results.map((user: any, index: number) => (
								<div
									key={user.id}
									className={`flex items-center gap-2 rounded-sm px-2 py-1.5 cursor-pointer ${
										index === activeIndex
											? "bg-accent text-accent-foreground"
											: "hover:bg-accent hover:text-accent-foreground"
									}`}
									onClick={() => handleSelect(user)}
									onMouseEnter={() => setActiveIndex(index)}
								>
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={user.avatarUrl}
											alt={`${user.firstName} ${user.lastName}`}
										/>
										<AvatarFallback>
											{user.firstName.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<div className="text-sm font-medium">
											{user.firstName} {user.lastName}
										</div>
										<div className="text-xs text-muted-foreground">
											{user.email}
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-center text-muted-foreground py-2">
								No users found
							</div>
						)}
					</ScrollArea>
				</div>
			)}
		</div>
	);
}
