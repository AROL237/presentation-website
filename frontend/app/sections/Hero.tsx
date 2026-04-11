export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-muted to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Order now and get deliver in few hours
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover our carefully curated collection of hair care products
              designed to nourish, strengthen, and enhance your natural beauty.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/collections"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Shop Collections
              </a>
              <a
                href="/about"
                className="px-8 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors border border-border"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-96 md:h-full bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Featured Product Image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
