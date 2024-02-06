import React from "react"

interface SearchProps {
  searchTerm: string;
  handleChange: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  handleClick: () => void;
}

const Search = ({ searchTerm, handleChange, handleClick }: SearchProps) => {
  return (
    <div className="py-4">
      <input
        className="border rounded-2xl mr-2 pl-4 mb-2"
        name="searchTerm"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        className="border rounded-2xl px-8 hover:bg-gray-200"
        onClick={handleClick}
      >
        Search
      </button>
      <hr className="mt-6" />
    </div>
  );
};

export default Search;
