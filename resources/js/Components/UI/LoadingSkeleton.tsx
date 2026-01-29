/**
 * Loading Skeleton Components
 * Reusable skeleton loaders for better UX during data fetching
 */

import { HTMLAttributes } from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gray-200 aspect-[3/4] mb-4"></div>

      {/* Category skeleton */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>

      {/* Title skeleton */}
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>

      {/* Price skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="bg-white pt-24 md:pt-32 pb-16 px-4 md:px-8 lg:px-12 animate-pulse">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Image skeleton */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-gray-200 aspect-square"></div>
          </div>

          {/* Content skeleton */}
          <div className="w-full lg:w-[40%] space-y-4">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded mt-8"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderSummarySkeleton = () => {
  return (
    <div className="bg-white p-6 md:p-8 border border-gray-100 rounded-sm shadow-sm animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>

      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="w-16 h-20 bg-gray-200"></div>
            <div className="flex-grow space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded mt-4"></div>
      </div>

      <div className="h-12 bg-gray-200 rounded mt-8"></div>
    </div>
  );
};

interface TableRowProps {
  cols?: number;
}

export const TableRowSkeleton = ({ cols = 4 }: TableRowProps) => {
  return (
    <tr className="animate-pulse">
      {[...Array(cols)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
      ))}
    </tr>
  );
};

export const FormInputSkeleton = () => {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
};

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  height?: string;
}

// Generic skeleton with custom height
export const Skeleton = ({ className = '', height = 'h-4', ...props }: SkeletonProps) => {
  return (
    <div className={`bg-gray-200 rounded animate-pulse ${height} ${className}`} {...props}></div>
  );
};

const LoadingSkeleton = {
  ProductCard: ProductCardSkeleton,
  ProductDetail: ProductDetailSkeleton,
  OrderSummary: OrderSummarySkeleton,
  TableRow: TableRowSkeleton,
  FormInput: FormInputSkeleton,
  Generic: Skeleton,
};

export default LoadingSkeleton;
