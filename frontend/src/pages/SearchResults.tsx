import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

export default function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState<any[]>([]);

  // Extract query params
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  const query = params.get("query");

  // Fetch data when page loads
  useEffect(() => {
    if (query && type) {
      API.get("/search", { params: { type, query } })
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search failed:", err));
    }
  }, [query, type]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">Search Results</h2>
      {results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((item, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              {type === "engineer"
                ? `${item.name} - Skills: ${item.skills.join(", ")}`
                : `${item.name} - Status: ${item.status}`}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
}
