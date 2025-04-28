import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Pokémon data on component mount
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const detailedPokemon = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              types: pokemonDetails.data.types.map(typeInfo => typeInfo.type.name), // Get types
              url: pokemon.url
            };
          })
        );
        setPokemonList(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  // Handle search term change
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterPokemon(term, selectedType);
  };

  // Handle filter dropdown change
  const handleFilter = (type) => {
    setSelectedType(type);
    filterPokemon(searchTerm, type);
  };

  // Filter Pokémon based on name and type
  const filterPokemon = (term, type) => {
    const filtered = pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(term.toLowerCase());
      const matchesType = type ? pokemon.types.includes(type) : true;
      return matchesSearch && matchesType;
    });
    setFilteredPokemon(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-w-full container">
     
      {/* Search Bar and Filter Dropdown are placed in App.js */}
      <div className=" h-14 bg-blue-500 text-white flex justify-center items-center gap-4 text-2xl sticky top-0">
        <SearchBar onSearch={handleSearch} />
        <FilterDropdown onFilter={handleFilter} />
      </div>

      <div className="pokemon-list grid grid-cols-1 md:grid-cols-3 gap-4 z-10">
        {filteredPokemon.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
