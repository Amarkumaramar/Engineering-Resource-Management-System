import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchFilter() {
  const navigate = useNavigate();

  // 🔹 States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("engineer");

  // 🔹 Handle search navigation
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search-results?type=${filterType}&query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // ✅ Trigger search on "Enter" key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ✅ Navigate back to Team Overview if search input is cleared
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      navigate("/team-overview");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        className="text-black bg-gray-200 px-2 py-1 rounded-md"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="engineer">Engineer Skills</option>
        <option value="project">Project Status</option>
      </select>

      <input
        type="text"
        placeholder={`Search ${filterType === "engineer" ? "skills" : "projects"}...`}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-gray-200 px-2 py-1 rounded-md text-black w-40"
      />

      <button
        onClick={handleSearch}
        className="bg-gray-200 text-black px-3 py-1 rounded-md hover:bg-gray-300"
      >
        Search
      </button>
    </div>
  );
}
