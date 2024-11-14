import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Customers , Ordedrs , Orgnizations..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} className="search-button">
        <SearchIcon
          sx={{
            color: "black",
            border: "none",
            outline: "none",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          {" "}
        </SearchIcon>
      </button>
    </div>
  );
};

export default SearchBar;
