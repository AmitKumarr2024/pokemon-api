const SearchBar = ({ onSearch }) => {
    const handleChange = (e) => {
      onSearch(e.target.value);
    };
  
    return (
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          onChange={handleChange}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>
    );
  };
  
  export default SearchBar;
  