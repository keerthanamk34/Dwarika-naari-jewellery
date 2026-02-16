import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/config";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    toast.success("Proceeding to checkout");
    navigate("/checkout");
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-14">
          <div className="text-center">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-muted-foreground">
              Home / Wishlist
            </p>

            <h1 className="mt-4 font-display text-4xl lg:text-6xl font-semibold text-foreground">
              My Wishlist Collections
            </h1>

            <p className="mt-3 font-body text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
              Handpicked treasures waiting to become yours.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 lg:px-8 py-14">
        {wishlist.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-2xl bg-card">
            <Heart size={40} className="mx-auto text-gold" />
            <h2 className="mt-6 font-display text-2xl text-foreground">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 text-muted-foreground font-body text-sm">
              Explore our collections and add your favorite pieces.
            </p>

            <div className="mt-6">
              <Button asChild className="tracking-widest uppercase">
                <Link to="/collections">
                  Explore Collections <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group border border-border rounded-2xl bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeFromWishlist(product.id);
                      toast.success("Removed from wishlist");
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border hover:scale-110 transition"
                  >
                    <Trash2
                      size={16}
                      className="text-foreground hover:text-red-500 transition-colors"
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="font-display text-lg text-foreground">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-muted-foreground text-sm">
                    ₹{product.price}
                  </p>

                  {/* Buttons */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="tracking-widest uppercase"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      Add to Cart
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => handleBuyNow(product)}
                      className="tracking-widest uppercase"
                    >
                      Buy Now
                    </Button>
                  </div>

                  {/* View Details */}
                  <div className="mt-4 text-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Wishlist;
