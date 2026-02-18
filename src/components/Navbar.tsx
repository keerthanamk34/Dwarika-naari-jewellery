import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchOverlay from "@/components/SearchOverlay";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b border-border transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl shadow-md"
            : "bg-gradient-to-b from-[hsl(40_50%_96%)] to-[hsl(38_35%_94%)]"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/logo.jpg"
                alt="Dwarika Naari"
                className="h-14 lg:h-16 w-auto object-contain drop-shadow-md"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl lg:text-2xl font-bold text-gold-deep drop-shadow-sm">
                  DWARIKA NAARI
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
                  Echoes of Royal Elegance
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-link-luxury text-sm font-medium tracking-wider uppercase text-foreground hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={2} />
              </button>

              <Link
                to="/wishlist"
                className="relative p-2 hover:text-gold transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={2} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 gradient-gold text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative p-2 hover:text-gold transition-colors duration-300"
                aria-label="Cart"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 gradient-gold text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="lg:hidden border-t border-border py-4 animate-fade-in">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-sm font-medium tracking-wider uppercase hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
