import { useState, useMemo } from "react";
import { products } from "@/config";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import { SlidersHorizontal, X } from "lucide-react";

const categories = ["All", "Necklaces", "Earrings", "Bangles", "Rings"];
const occasions = ["All", "Bridal", "Festive", "Everyday"];
const priceRanges = ["All", "Under ₹5,000", "₹5,000 - ₹15,000", "Over ₹15,000"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"];

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory !== "All") filtered = filtered.filter((p) => p.category === selectedCategory);
    if (selectedOccasion !== "All") filtered = filtered.filter((p) => p.occasion === selectedOccasion);
    if (selectedPrice !== "All") {
      if (selectedPrice === "Under ₹5,000") filtered = filtered.filter((p) => p.price < 5000);
      else if (selectedPrice === "₹5,000 - ₹15,000") filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 15000);
      else filtered = filtered.filter((p) => p.price > 15000);
    }
    if (sortBy === "Price: Low to High") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "Most Popular") filtered.sort((a, b) => b.reviews - a.reviews);
    return filtered;
  }, [selectedCategory, selectedOccasion, selectedPrice, sortBy]);

  const FilterButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`font-body text-xs px-3 py-1.5 border transition-all duration-200 ${
        active ? "bg-gold text-primary-foreground border-gold" : "border-border text-foreground hover:border-gold hover:text-gold"
      }`}
    >
      {label}
    </button>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-2">Explore Our</p>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">Shop Collection</h1>
        </div>

        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <p className="font-body text-xs text-muted-foreground">{filteredProducts.length} pieces</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="font-body text-xs bg-transparent border-none outline-none text-foreground cursor-pointer">
            {sortOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
          </select>
        </div>

        {showFilters && (
          <div className="border border-border p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-body text-xs tracking-widest uppercase text-foreground">Refine By</h3>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={16} className="text-muted-foreground" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Type</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (<FilterButton key={cat} label={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} />))}
                </div>
              </div>
              <div>
                <h4 className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Occasion</h4>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((occ) => (<FilterButton key={occ} label={occ} active={selectedOccasion === occ} onClick={() => setSelectedOccasion(occ)} />))}
                </div>
              </div>
              <div>
                <h4 className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Price</h4>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (<FilterButton key={range} label={range} active={selectedPrice === range} onClick={() => setSelectedPrice(range)} />))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">No pieces match your filters.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Collections;
