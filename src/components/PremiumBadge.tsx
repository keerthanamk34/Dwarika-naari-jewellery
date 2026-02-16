import { Gem, Shield, Sparkles, Crown } from "lucide-react";

const features = [
  { icon: Crown, title: "22K Gold Plated", desc: "Luxurious fine gold appearance" },
  { icon: Shield, title: "Durable Brass", desc: "Long-lasting wear & shine" },
  { icon: Sparkles, title: "Versatile Style", desc: "Traditional & modern pairing" },
  { icon: Gem, title: "Everyday Elegance", desc: "Weddings, engagements & daily" },
];

const PremiumBadge = () => (
  <div className="relative overflow-hidden border border-gold/30 bg-gradient-to-br from-gold/5 via-background to-gold/10 p-6 lg:p-8 mt-10">
    {/* Shimmer overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-shimmer pointer-events-none" />

    <div className="relative z-10">
      <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-1 text-center">
        ✦ Craftsmanship Promise ✦
      </p>
      <h3 className="font-display text-lg lg:text-xl font-semibold text-foreground text-center mb-2">
        Simple & Elegant · Premium Quality
      </h3>
      <p className="font-body text-xs text-muted-foreground text-center max-w-md mx-auto mb-6 leading-relaxed">
        Discover the perfect blend of elegance and simplicity. Made from durable brass and plated with 22K gold, offering a luxurious appearance ideal for any occasion.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group text-center p-3 border border-gold/20 bg-background/50 hover:bg-gold/5 hover:border-gold/40 transition-all duration-300"
          >
            <Icon size={18} className="mx-auto text-gold mb-2 group-hover:scale-110 transition-transform duration-300" />
            <p className="font-body text-[11px] font-semibold text-foreground">{title}</p>
            <p className="font-body text-[9px] text-muted-foreground mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PremiumBadge;
