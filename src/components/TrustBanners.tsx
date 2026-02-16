import { ShieldCheck, Truck, RotateCcw, Lock, Award } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "100% Certified Jewelry" },
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: Lock, label: "Secure Payments" },
  { icon: Award, label: "Handcrafted Quality" },
];

const TrustBanners = () => (
  <section className="border-y border-border bg-card py-10">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {badges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
              <Icon size={20} className="text-gold" />
            </div>
            <span className="font-body text-xs tracking-wide text-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBanners;
