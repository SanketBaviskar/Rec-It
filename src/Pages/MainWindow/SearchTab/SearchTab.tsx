import { SearchBar } from '../../../components/Searchbar';
export default function SearchTab() {
  const handleUserSelect = (user) => {
    console.log("Selected user:", user);
    // Handle the selected user
  };

  const handleClear = () => {
    console.log("Search cleared");
    // Handle clearing the search
  };
  return (
    <div>
      <h2>User Search</h2>
      <SearchBar
        onSelect={handleUserSelect}
        onClear={handleClear}
        placeholder="Find a user..."
        className="w-full max-w-sm"
      />
      {/* Rest of your component */}
    </div>
  );
}
