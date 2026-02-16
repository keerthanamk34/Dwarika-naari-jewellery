import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Product } from "@/config";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-card aspect-square">

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={16}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-foreground"
            }
          />
        </button>

        {/* Sale Tag */}
        {product.originalPrice ? (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground font-body text-[10px] tracking-wider uppercase px-2 py-1">
            Sale
          </span>
        ) : null}

        {/* Bestseller Tag */}
        {product.bestseller && !product.originalPrice ? (
          <span className="absolute top-3 left-3 bg-gold text-primary-foreground font-body text-[10px] tracking-wider uppercase px-2 py-1">
            Bestseller
          </span>
        ) : null}

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 space-y-2">
          <span className="block w-full text-center py-2.5 bg-foreground text-primary-foreground font-body text-xs tracking-widest uppercase">
            View Details
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full text-center py-2 bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={10}
              className={
                i < Math.floor(rating)
                  ? "fill-gold text-gold"
                  : "text-border"
              }
            />
          ))}
          <span className="font-body text-[10px] text-muted-foreground ml-1">
            ({reviews})
          </span>
        </div>

        {/* Name */}
        <h3 className="font-body text-sm font-medium text-foreground">
          {product.name}
        </h3>

        {/* Material */}
        {product.material && (
          <p className="font-body text-[11px] text-muted-foreground">
            {product.material}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-body text-sm font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="font-body text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
