"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getMarketingBanners } from "@/lib/strapi";

interface MarketingBanner {
  id: string;
  documentId: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta?: string;
  ctaLink?: string;
  badge?: string;
  image?: {
    url?: string;
  };
}

const defaultBanners: MarketingBanner[] = [
  {
    id: "1",
    documentId: "1",
    title: "Spring Hair Revival",
    subtitle: "Revitalize Your Hair",
    description:
      "Get up to 40% off on our complete hair care collection. Limited time only!",
    cta: "Shop Now",
    ctaLink: "/collections",
    badge: "New",
  },
];

export default function MarketingBanner() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [banners, setBanners] = useState<MarketingBanner[]>(defaultBanners);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getMarketingBanners();
        const bannerList = data.data;
        if (bannerList && bannerList.length > 0) {
          setBanners(bannerList);
        }
      } catch (error) {
        console.error("Failed to fetch marketing banners:", error);
        setBanners(defaultBanners);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (!autoPlay || banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, banners.length]);

  const next = () => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev + 1) % banners.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prev = () => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  if (loading || banners.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden shadow-lg group">
          {/* Carousel */}
          <div className="relative w-full h-full">
            {banners.map((banner, idx) => {
              const bannerImageUrl = banner?.image?.url
                ? banner.image.url.startsWith("http")
                  ? banner.image.url
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${banner.image.url}`
                : null;
              const isBannerLocalStrapiImage =
                bannerImageUrl?.startsWith("http://localhost") ||
                bannerImageUrl?.startsWith("http://127.0.0.1");
              console.log(banner.image);
              return (
                <div
                  key={banner.documentId}
                  className={`absolute w-full h-full transition-opacity duration-1000 ${
                    idx === current
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Image Background */}
                  {bannerImageUrl ? (
                    <div className="absolute inset-0">
                      <Image
                        src={bannerImageUrl}
                        alt={banner.title}
                        fill
                        className="object-cover"
                        priority={idx === current}
                        unoptimized={isBannerLocalStrapiImage}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/90 to-primary/80" />
                  )}

                  {/* Content Overlay */}
                  <div className="relative w-full h-full flex flex-col justify-center px-6 sm:px-8 md:px-12 py-6">
                    {/* Left Content */}
                    <div className="flex-1 space-y-2 sm:space-y-3 max-w-sm md:max-w-lg flex flex-col justify-center">
                      {/* Badge */}
                      {banner.badge && (
                        <div className="inline-block w-fit">
                          <span className="px-3 py-1 bg-white/20 text-primary-foreground text-xs font-semibold rounded-full">
                            {banner.badge}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground leading-tight line-clamp-2">
                        {banner.title}
                      </h2>

                      {/* Subtitle */}
                      {banner.subtitle && (
                        <p className="text-sm sm:text-base text-primary-foreground/90 font-medium">
                          {banner.subtitle}
                        </p>
                      )}

                      {/* Description */}
                      {banner.description && (
                        <p className="text-xs sm:text-sm md:text-base text-primary-foreground/80 leading-relaxed line-clamp-2">
                          {banner.description}
                        </p>
                      )}

                      {/* CTA Button */}
                      {banner.cta && banner.ctaLink && (
                        <div className="pt-2">
                          <a
                            href={banner.ctaLink}
                            className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-white text-primary font-semibold rounded-lg hover:bg-primary-foreground transition-all duration-300 hover:shadow-lg text-xs sm:text-sm md:text-base"
                          >
                            {banner.cta}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all duration-300 z-10 group opacity-0 sm:opacity-100 group-hover:opacity-100"
            aria-label="Previous campaign"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover:scale-125 transition-transform" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all duration-300 z-10 group opacity-0 sm:opacity-100 group-hover:opacity-100"
            aria-label="Next campaign"
          >
            <ChevronRight className="w-5 h-5 text-white group-hover:scale-125 transition-transform" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrent(idx);
                  setAutoPlay(false);
                  setTimeout(() => setAutoPlay(true), 10000);
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
