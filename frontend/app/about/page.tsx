import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-muted to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About Spare Care
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe every person deserves access to premium, effective hair
            care products. Our mission is to provide high-quality solutions that
            celebrate and enhance natural beauty.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2024, Spare Care emerged from a passion for creating
                exceptional hair care products that respect and enhance all hair
                types and textures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We partner with premium ingredient suppliers and use only the
                finest formulations to ensure every product delivers visible,
                lasting results.
              </p>
            </div>
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center text-muted-foreground">
              Story Image
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Quality",
                description: "Premium ingredients and rigorous testing",
              },
              {
                title: "Inclusivity",
                description: "Products for all hair types and textures",
              },
              {
                title: "Sustainability",
                description: "Eco-friendly packaging and practices",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our collection and find your perfect product match.
          </p>
          <a href="/collections">
            <Button className="px-8 py-3">Shop Now</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
