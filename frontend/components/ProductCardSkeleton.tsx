"use client";
import { Skeleton } from "./Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden bg-card border border-border">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-72" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col p-4 space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />

        {/* Description Skeleton */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />

        {/* Stock Status Skeleton */}
        <Skeleton className="h-4 w-20" />

        {/* Price and SKU Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full mt-auto" />
      </div>
    </div>
  );
}
