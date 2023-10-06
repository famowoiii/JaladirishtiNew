import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari Daerahmu"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={() => handleSearch(searchTerm)}>Cari</button>
    </div>
  );
};

export default SearchBar;
