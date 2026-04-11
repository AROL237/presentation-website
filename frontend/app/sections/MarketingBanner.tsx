"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Campaign {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  badge?: string;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Spring Hair Revival",
    subtitle: "Revitalize Your Hair",
    description:
      "Get up to 40% off on our complete hair care collection. Limited time only!",
    cta: "Shop Now",
    ctaLink: "/collections",
    badge: "New",
  },
  {
    id: 2,
    title: "Exclusive Member Offer",
    subtitle: "Premium Benefits",
    description:
      "Join our loyalty program and get 25% off your next purchase plus free shipping",
    cta: "Learn More",
    ctaLink: "/about",
    badge: "Limited",
  },
  {
    id: 3,
    title: "Bundle & Save",
    subtitle: "Buy More, Save More",
    description:
      "Buy any 3 products and save 20%. Perfect for your complete hair care routine",
    cta: "Explore Bundles",
    ctaLink: "/collections",
    badge: "Trending",
  },
];

export default function MarketingBanner() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % campaigns.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % campaigns.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + campaigns.length) % campaigns.length);
    setAutoPlay(false);
  };

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg">
          {/* Carousel */}
          <div className="relative w-full h-full">
            {campaigns.map((campaign, idx) => (
              <div
                key={campaign.id}
                className={`absolute w-full h-full transition-opacity duration-1000 ${
                  idx === current ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Gradient - Using brand primary brown with complementary tones */}
                <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/90 to-primary/80" />

                {/* Content Overlay */}
                <div className="relative w-full h-full flex items-center justify-between px-8 md:px-12">
                  {/* Left Content */}
                  <div className="flex-1 space-y-3 max-w-lg">
                    {/* Badge */}
                    {campaign.badge && (
                      <div className="inline-block">
                        <span className="px-3 py-1 bg-white/20 text-primary-foreground text-xs font-semibold rounded-full">
                          {campaign.badge}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
                      {campaign.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-sm md:text-base text-primary-foreground/90 font-medium">
                      {campaign.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                      {campaign.description}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <a
                        href={campaign.ctaLink}
                        className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-white text-primary font-semibold rounded-lg hover:bg-primary-foreground transition-all duration-300 hover:shadow-lg"
                      >
                        {campaign.cta}
                      </a>
                    </div>
                  </div>

                  {/* Right Visual - Icon/Decoration */}
                  <div className="hidden md:flex flex-1 items-center justify-end">
                    <div className="relative w-40 h-40 rounded-full bg-white/5 flex items-center justify-center">
                      <div className="text-6xl animate-pulse">
                        {campaign.id === 1 && "💐"}
                        {campaign.id === 2 && "⭐"}
                        {campaign.id === 3 && "🎁"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all duration-300 z-10 group"
            aria-label="Previous campaign"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover:scale-125 transition-transform" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all duration-300 z-10 group"
            aria-label="Next campaign"
          >
            <ChevronRight className="w-5 h-5 text-white group-hover:scale-125 transition-transform" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {campaigns.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrent(idx);
                  setAutoPlay(false);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === current
                    ? "bg-white w-8 h-2"
                    : "bg-white/40 w-2 h-2 hover:bg-white/60"
                }`}
                aria-label={`Go to campaign ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
