import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const location = useLocation();
  const order = (location.state as any)?.order;

  return (
    <Layout>
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-10 text-center">
          <h1 className="font-display text-3xl lg:text-4xl text-foreground">
            Order Confirmed ✨
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            Thank you for shopping with{" "}
            <span className="text-foreground font-semibold">DWARIKA NAARI</span>.
          </p>

          {order ? (
            <div className="mt-6 text-left space-y-2 font-body text-sm">
              <p><span className="text-muted-foreground">Order ID:</span> {order.orderId}</p>
              <p><span className="text-muted-foreground">Name:</span> {order.customer.fullName}</p>
              <p><span className="text-muted-foreground">Phone:</span> {order.customer.phone}</p>
              {order.customer.email ? (
                <p><span className="text-muted-foreground">Email:</span> {order.customer.email}</p>
              ) : null}
              <p><span className="text-muted-foreground">Payment:</span> {String(order.paymentMethod).toUpperCase()}</p>
              <p><span className="text-muted-foreground">Items:</span> {order.totals.itemCount}</p>
              <p><span className="text-muted-foreground">Total:</span> ₹{order.totals.total}</p>
            </div>
          ) : (
            <p className="mt-6 text-muted-foreground font-body text-sm">
              Your order details are not available (maybe page refreshed).
            </p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="tracking-widest uppercase">
              <Link to="/collections">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="tracking-widest uppercase">
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderSuccess;