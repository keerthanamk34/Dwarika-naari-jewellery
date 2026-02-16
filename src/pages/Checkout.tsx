import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

type PaymentMethod = "cod" | "upi" | "card";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  // Customer + Address
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const { subtotal, shipping, total, itemCount } = useMemo(() => {
    const sub = totalPrice;
    const ship = sub >= 4999 || sub === 0 ? 0 : 99; // free above 4999
    const count = items.reduce((acc, it) => acc + it.quantity, 0);
    return { subtotal: sub, shipping: ship, total: sub + ship, itemCount: count };
  }, [items, totalPrice]);

  const validate = () => {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return false;
    }
    if (!fullName.trim()) return toast.error("Enter your full name."), false;
    if (!/^\d{10}$/.test(phone.trim()))
      return toast.error("Enter a valid 10-digit phone number."), false;
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim()))
      return toast.error("Enter a valid email."), false;

    if (!addressLine1.trim()) return toast.error("Enter address line 1."), false;
    if (!city.trim()) return toast.error("Enter city."), false;
    if (!state.trim()) return toast.error("Enter state."), false;
    if (!/^\d{6}$/.test(pincode.trim()))
      return toast.error("Enter a valid 6-digit pincode."), false;

    return true;
  };

  const placeOrder = () => {
    if (!validate()) return;

    // In real app: send order to backend here
    toast.success("Order placed successfully!");

    const orderData = {
      customer: { fullName, phone, email },
      address: { addressLine1, addressLine2, city, state, pincode },
      paymentMethod,
      totals: { subtotal, shipping, total, itemCount },
      items: items.map((it) => ({
        id: it.product.id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.quantity,
        image: it.product.image,
      })),
      createdAt: new Date().toISOString(),
      orderId: `DNJ-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    clearCart();

    navigate("/order-success", { state: { order: orderData } });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14 text-center">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-muted-foreground">
            Home / Checkout
          </p>
          <h1 className="mt-4 font-display text-4xl lg:text-6xl font-semibold text-foreground">
            Secure Checkout
          </h1>
          <p className="mt-3 font-body text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
            Complete your details and confirm your order.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        {!items.length ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <h2 className="font-display text-2xl text-foreground">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground font-body text-sm">
              Add items before checkout.
            </p>
            <div className="mt-6">
              <Button asChild className="tracking-widest uppercase">
                <Link to="/collections">Explore Collections</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left Forms */}
            <div className="space-y-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email (optional)</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Address Line 1 *</Label>
                    <Input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Address Line 2 (optional)</Label>
                    <Input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>City *</Label>
                      <Input value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>State *</Label>
                      <Input value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Pincode *</Label>
                      <Input value={pincode} onChange={(e) => setPincode(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between rounded-xl border border-border p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                      </div>
                      <span className="text-xs text-muted-foreground tracking-widest uppercase">COD</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-border p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="cursor-pointer">UPI (GPay / PhonePe)</Label>
                      </div>
                      <span className="text-xs text-muted-foreground tracking-widest uppercase">UPI</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-border p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="cursor-pointer">Card (Credit / Debit)</Label>
                      </div>
                      <span className="text-xs text-muted-foreground tracking-widest uppercase">CARD</span>
                    </div>
                  </RadioGroup>

                  <p className="text-xs text-muted-foreground">
                    Payment gateway can be integrated later (Razorpay/Stripe). This checkout is ready for it.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Summary */}
            <div className="space-y-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-[320px] overflow-auto pr-1">
                    {items.map((it) => (
                      <div key={it.product.id} className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-background border border-border shrink-0">
                          <img
                            src={it.product.image}
                            alt={it.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-body text-sm text-foreground truncate">
                            {it.product.name}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            Qty: {it.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-body text-sm font-semibold text-foreground">
                            {formatINR(it.product.price * it.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2 font-body text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">{formatINR(subtotal)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-semibold">Total</span>
                      <span className="text-foreground font-semibold">{formatINR(total)}</span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      Items: {itemCount}
                    </p>
                  </div>

                  <Button onClick={placeOrder} className="w-full tracking-widest uppercase">
                    Place Order
                  </Button>

                  <Button asChild variant="outline" className="w-full tracking-widest uppercase">
                    <Link to="/cart">Back to Cart</Link>
                  </Button>

                  <p className="text-[11px] text-muted-foreground">
                    By placing your order, you agree to our store policies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Checkout;