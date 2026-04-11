"use client";
import { Skeleton } from "./Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Skeleton */}
          <div className="relative h-96 md:h-full bg-muted rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Details Skeleton */}
          <div className="space-y-6">
            {/* Title and SKU */}
            <div>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Price */}
            <Skeleton className="h-8 w-40" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="flex-1 h-12" />
                <Skeleton className="h-12 w-12" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
