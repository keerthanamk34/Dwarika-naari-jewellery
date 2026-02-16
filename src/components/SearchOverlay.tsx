import { useState } from "react";
import { X } from "lucide-react";
import { products } from "@/config";
import { Link } from "react-router-dom";

interface Props {
  onClose: () => void;
}

const SearchOverlay = ({ onClose }: Props) => {
  const [query, setQuery] = useState("");

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center pt-24 px-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X size={20} />
        </button>

        <input
          type="text"
          autoFocus
          placeholder="Search jewelry..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border px-4 py-3 mb-4"
        />

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {query &&
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={onClose}
                className="block border p-3 hover:bg-gray-100"
              >
                <p>{product.name}</p>
                <p className="text-sm text-gray-500">₹{product.price}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
