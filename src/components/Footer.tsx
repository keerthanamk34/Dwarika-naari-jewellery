import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <h3 className="font-display text-2xl font-bold text-gold-light mb-2">
              DWARIKA NAARI
            </h3>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase opacity-40 mb-4">
              ECHOES OF ROYAL ELEGANCE
            </p>
            <p className="font-body text-sm opacity-60 leading-relaxed">
              Celebrating the beauty of Indian craftsmanship. Every piece tells
              a story of tradition, heritage, and timeless elegance.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 opacity-40">
              Shop
            </h4>
            <div className="space-y-2">
              {["Necklaces", "Earrings", "Bangles", "Rings"].map((item) => (
                <Link
                  key={item}
                  to="/collections"
                  className="block font-body text-sm opacity-60 hover:opacity-100 hover:text-gold-light transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 opacity-40">
              Company
            </h4>
            <div className="space-y-2">
              {[
                { label: "Our Story", to: "/about" },
                { label: "Contact Us", to: "/contact" },
                { label: "Store Locator", to: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block font-body text-sm opacity-60 hover:opacity-100 hover:text-gold-light transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 opacity-40">
              Follow Us
            </h4>

            <div className="flex gap-4">

              {/* Instagram */}
              <a
                href="https://instagram.com/dwarika_naari"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 hover:text-pink-400 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@DwarikaNari"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 hover:text-red-500 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>

              {/* Email */}
              <a
                href="mailto:hello@dwarikanaari.com"
                className="opacity-60 hover:opacity-100 hover:text-gold-light transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>

            </div>

            <p className="mt-6 font-body text-xs opacity-40">
              Subscribe for exclusive offers & new arrivals.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="font-body text-xs opacity-30">
            © 2026 Dwarika Naari. All rights reserved. Handcrafted in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
