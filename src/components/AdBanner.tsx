import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    subtitle: "Bridal Season",
    title: "Upto 40% Off on Bridal Sets",
    desc: "Make your special day unforgettable with our handcrafted bridal collection.",
    cta: "Shop Bridal",
    bg: "from-[hsl(25,40%,18%)] via-[hsl(35,50%,22%)] to-[hsl(42,60%,28%)]",
  },
  {
    subtitle: "Diwali Collection",
    title: "Festive Glow – New Arrivals",
    desc: "Light up every celebration with our exclusive festive jewelry pieces.",
    cta: "Explore Now",
    bg: "from-[hsl(350,35%,20%)] via-[hsl(0,30%,25%)] to-[hsl(42,50%,30%)]",
  },
  {
    subtitle: "Limited Time Offer",
    title: "Flat ₹500 Off on Orders Above ₹2,999",
    desc: "Use code NAARI500 at checkout. Hurry, offer ends soon!",
    cta: "Shop Now",
    bg: "from-[hsl(270,25%,18%)] via-[hsl(300,20%,22%)] to-[hsl(42,55%,30%)]",
  },
];

const AdBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`transition-all duration-700 ${
            i === current
              ? "opacity-100 relative"
              : "opacity-0 absolute inset-0"
          } bg-gradient-to-r ${banner.bg}`}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,hsl(42_75%_55%/0.08)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer" />

          <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold-light mb-1">
                  ✦ {banner.subtitle} ✦
                </p>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-primary-foreground mb-2">
                  {banner.title}
                </h3>
                <p className="font-body text-sm text-primary-foreground/60 max-w-md">
                  {banner.desc}
                </p>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase border border-gold text-gold px-6 py-3 hover:bg-gold hover:text-primary-foreground transition-all duration-300 shrink-0"
              >
                {banner.cta} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-6 h-0.5 transition-all duration-300 ${
              i === current ? "bg-gold" : "bg-primary-foreground/20"
            }`}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AdBanner;
