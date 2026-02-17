import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/Layout";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag size={48} className="mx-auto text-gold/30 mb-6" />
          <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
            Your Cart is Empty
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Discover our exquisite jewelry collection.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase bg-gold text-primary-foreground px-8 py-3.5 hover:bg-gold-light transition-colors"
          >
            Explore Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const subtotal = totalPrice;
  const shipping = subtotal > 10000 ? 0 : 499;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        <h1 className="font-display text-4xl  font-semibold mb-10">
            Jewelry Basket
          </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 border-b border-border pb-6"
              >
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-24 h-28 flex-shrink-0 bg-card overflow-hidden"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-body text-sm font-medium text-foreground hover:text-gold transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      {item.product.material}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-2 hover:bg-card transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>

                      <span className="font-body text-xs w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="p-2 hover:bg-card transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-body text-sm font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                        toast.success("Item removed from cart");
                      }}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Order Summary */}
          <div className="bg-card p-8">
            <h2 className="font-body text-xs tracking-widest uppercase text-foreground mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>

              {shipping > 0 && (
                <p className="font-body text-[10px] text-gold">
                  Free shipping on orders over ₹10,000
                </p>
              )}
            </div>

            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between font-body text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* ✅ FIXED Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase py-4 hover:bg-gold-light transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
