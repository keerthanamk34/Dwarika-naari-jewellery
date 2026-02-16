import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Star, ArrowLeft, ShoppingBag, Truck, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<"description" | "details" | "care">("description");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="font-body text-muted-foreground">Product not found.</p>
          <Link to="/collections" className="inline-flex items-center gap-2 mt-4 font-body text-xs tracking-widest uppercase text-foreground hover:text-gold">
            <ArrowLeft size={14} /> Back to Collections
          </Link>
        </div>
      </Layout>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Link to="/collections" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-card group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {product.originalPrice && (
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground font-body text-[10px] tracking-wider uppercase px-3 py-1">Sale</span>
            )}
            {product.bestseller && !product.originalPrice && (
              <span className="absolute top-4 left-4 bg-gold text-primary-foreground font-body text-[10px] tracking-wider uppercase px-3 py-1">Bestseller</span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">{product.category} · {product.occasion}</p>

            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"} />
              ))}
              <span className="font-body text-xs text-muted-foreground ml-2">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-bold text-gold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="font-body text-sm text-muted-foreground mb-3">{product.material}</p>

            {/* Tabs */}
            <div className="border-b border-border mb-4">
              <div className="flex gap-6">
                {(["description", "details", "care"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-body text-xs tracking-widest uppercase pb-3 border-b-2 transition-colors ${
                      activeTab === tab ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8 min-h-[80px]">
              {activeTab === "description" && <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>}
              {activeTab === "details" && <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.details}</p>}
              {activeTab === "care" && (
                <ul className="font-body text-sm text-muted-foreground space-y-2">
                  <li>• Store in the provided jewelry box when not wearing</li>
                  <li>• Avoid contact with perfumes and chemicals</li>
                  <li>• Clean gently with a soft dry cloth</li>
                  <li>• Remove before swimming or bathing</li>
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase py-4 hover:bg-gold-light transition-colors"
              >
                <ShoppingBag size={14} /> Add to Cart
              </button>
              <button
              onClick={() => {
                if (isWishlisted) { removeFromWishlist(product.id); toast.success("Removed from wishlist"); }
                else { addToWishlist(product); toast.success("Added to wishlist"); }
              }}
                className="p-4 border border-border hover:border-gold transition-colors"
                aria-label="Toggle wishlist"
              >
                <Heart size={16} className={isWishlisted ? "fill-accent text-accent" : "text-foreground"} />
              </button>
            </div>

            {/* Info badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over ₹10,000" },
                { icon: Shield, label: "Certified", sub: "BIS Hallmarked" },
                { icon: Sparkles, label: "Handcrafted", sub: "By master artisans" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center p-3 border border-border">
                  <Icon size={16} className="mx-auto text-gold mb-1.5" />
                  <p className="font-body text-[10px] font-semibold text-foreground">{label}</p>
                  <p className="font-body text-[9px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
