const FilterDropdown = ({ onFilter }) => {
    const types = ['fire', 'water', 'grass', 'electric', 'bug', 'normal']; // Add more types as needed
  
  return (
    <select onChange={(e) => onFilter(e.target.value)}>
      <option className="bg-amber-200 text-black" value="">All Types</option>
      {types.map((type, index) => (
        <option className="bg-amber-200 text-black" key={index} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
  };
  
  export default FilterDropdown;
  