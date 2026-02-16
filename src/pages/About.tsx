import Layout from "@/components/Layout";
import hero2 from "@/assets/jewelry-hero-2.jpg";
import hero1 from "@/assets/jewelry-hero-1.jpg";
import { Gem, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-2">Our Heritage</p>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-foreground">The Story of Dwarika Naari</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={hero2} alt="Dwarika Naari Heritage" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-semibold text-foreground">Rooted in Indian Heritage</h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Dwarika Naari was born from a deep reverence for India's centuries-old jewelry-making traditions. Founded by women, for women, our brand celebrates the artistry of master craftsmen who have passed their skills through generations.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Every piece in our collection is handcrafted with meticulous attention to detail, using ethically sourced materials and time-honored techniques like kundan, meenakari, and temple jewelry making.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              From bridal trousseau pieces that become family heirlooms to contemporary designs for the modern Indian woman, Dwarika Naari bridges the gap between tradition and today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="font-display text-3xl font-semibold text-foreground">Empowering Women Through Craft</h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              At the heart of Dwarika Naari is a commitment to women empowerment. We employ and train women artisans across India, providing them with sustainable livelihoods and preserving traditional crafts that might otherwise be lost.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              When you wear a Dwarika Naari piece, you carry forward the story of the woman who crafted it — her skill, her heritage, and her pride in creating something beautiful.
            </p>
          </div>
          <div className="order-1 lg:order-2 aspect-[4/5] overflow-hidden">
            <img src={hero1} alt="Handcrafted Jewelry" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Gem, title: "Handcrafted Excellence", desc: "Every piece is meticulously handcrafted by master artisans using traditional Indian techniques passed down through generations." },
            { icon: Heart, title: "Ethically Made", desc: "We source our materials responsibly and ensure fair wages and safe working conditions for all our artisans." },
            { icon: Users, title: "Women Empowerment", desc: "Founded by women, for women. We employ and train women artisans across India, preserving craft traditions." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-8 border border-border">
              <Icon size={28} className="mx-auto text-gold mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
