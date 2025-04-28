import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonCard = ({ name }) => {
    console.log("name",name);
    
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) {
      setError("Pokemon name is required");
      setLoading(false);
      return;
    }

    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemonData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching Pokemon data");
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  const {
    id,
    name: pokemonName,
    height,
    weight,
    types,
    abilities,
    stats,
  } = pokemonData;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="min-w-96 mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:scale-100 transition-transform ease-in-out duration-300">
      <h2 className="text-2xl font-bold text-center text-gray-800 capitalize mb-2">
        {pokemonName}
      </h2>
      <img
        src={image}
        alt={pokemonName}
        className="w-64 h-64 object-contain rounded-full  mb-4"
      />

      <div className="w-full mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Types:</h3>
        <ul className="list-disc pl-5">
          {types.map((type, index) => (
            <li key={index} className="text-gray-600 capitalize">
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
