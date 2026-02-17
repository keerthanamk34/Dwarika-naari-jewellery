import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG, products } from "@/config";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const location = useLocation();

  const handleClick = () => {
    let message = "Hi Dwarika Naari, I'm interested in your jewelry collection!";

    // Check if on a product page and include product name
    const match = location.pathname.match(/^\/product\/(\d+)$/);
    if (match) {
      const productId = parseInt(match[1]);
      const product = products.find((p) => p.id === productId);
      if (product) {
        message = `Hi Dwarika Naari, I'm interested in this product:\n${product.name} - ₹${product.price}`;
      }
    }

    window.open(
      `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,40%)] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
      <span className="absolute right-16 bg-foreground text-primary-foreground text-xs font-body px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
