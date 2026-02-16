import { Link } from "react-router-dom";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/jewelry-hero-1.jpg";
import hero2 from "@/assets/jewelry-hero-2.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionEveryday from "@/assets/collection-everyday.jpg";
import collectionFestive from "@/assets/collection-festive.jpg";
import collectionContemporary from "@/assets/collection-contemporary.jpg";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import { useState, useEffect, useRef } from "react";

const heroSlides = [
  { image: hero1, subtitle: "New Arrivals 2026", title: "Where Tradition Meets\nRoyal Elegance", cta: "Shop Now" },
  { image: hero2, subtitle: "Bridal Collection", title: "Adorn Your\nMost Beautiful Moments", cta: "Shop Now" },
];

const collections = [
  { title: "Bridal Jewelry", desc: "For your most precious day", image: collectionBridal },
  { title: "Everyday Elegance", desc: "Subtle beauty, daily wear", image: collectionEveryday },
  { title: "Festive Wear", desc: "Celebrate in splendor", image: collectionFestive },
  { title: "Contemporary Designs", desc: "Modern meets traditional", image: collectionContemporary },
];

const testimonials = [
  { name: "Priya Sharma", text: "The bridal set I received was beyond my expectations. The craftsmanship is exquisite and the gold quality is unmatched.", rating: 5 },
  { name: "Anita Desai", text: "I've been wearing their everyday collection for months. Elegant, lightweight, and the rose gold finish is absolutely stunning.", rating: 5 },
  { name: "Kavya Reddy", text: "The temple choker was the highlight of my wedding. Everyone complimented the intricate ruby work. Truly a masterpiece.", rating: 5 },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const bestsellers = products.filter((p) => p.bestseller);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[75vh] lg:h-[90vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8 animate-fade-in">
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-light mb-4">
              {heroSlides[currentSlide].subtitle}
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-8 whitespace-pre-line leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase bg-gold text-primary-foreground px-8 py-3.5 hover:bg-gold-light transition-all duration-300"
              >
                {heroSlides[currentSlide].cta} <ArrowRight size={14} />
              </Link>
             
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`w-10 h-0.5 transition-all duration-300 ${i === currentSlide ? "bg-gold" : "bg-primary-foreground/30"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-2">Curated For You</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">Our Collections</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((col) => (
            <Link key={col.title} to="/collections" className="group relative aspect-[3/4] overflow-hidden">
              <img src={col.image} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl text-primary-foreground mb-1">{col.title}</h3>
                <p className="font-body text-xs text-primary-foreground/60 mb-3">{col.desc}</p>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold-light group-hover:text-gold transition-colors inline-flex items-center gap-2">
                  Explore <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-2">Most Loved</p>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">Best Sellers</h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => scroll("left")} className="w-10 h-10 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Scroll left">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll("right")} className="w-10 h-10 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Scroll right">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {bestsellers.map((product) => (
              <div key={product.id} className="min-w-[260px] md:min-w-[300px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-2">What Our Customers Say</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">Testimonials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-border p-8 text-center">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
              <p className="font-display text-base font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-foreground py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-light mb-2">Stay Connected</p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-primary-foreground mb-3">Subscribe to Our Newsletter</h2>
          <p className="font-body text-sm text-primary-foreground/50 mb-8 max-w-md mx-auto">
            Be the first to know about new collections, exclusive offers, and styling inspiration.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold transition-colors"
              required
            />
            <button type="submit" className="bg-gold text-primary-foreground font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-light transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
