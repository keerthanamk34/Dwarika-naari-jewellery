import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchOverlay from "@/components/SearchOverlay"; // ✅ FIXED PATH

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Dwarika Naari"
                className="h-12 lg:h-14 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl lg:text-2xl font-bold text-gold">
                  DWARIKA NAARI
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
                  Echoes of Royal Elegance
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm uppercase hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 hover:text-gold transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 hover:text-gold transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white text-[10px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

            </div>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="lg:hidden border-t border-border py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-sm uppercase hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
