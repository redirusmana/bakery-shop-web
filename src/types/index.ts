export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  phone?: string;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface MediaNode {
  id: string;
  mediaContentType:
    | "IMAGE"
    | "VIDEO"
    | "MODEL"
    | (string & Record<never, never>);
  previewImage: Image;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  sku?: string;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
}

export interface ProductSummary {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  createdAt: string;

  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };

  media: {
    nodes: MediaNode[];
  };
  images: {
    nodes: Image[];
  };
  variants: {
    nodes: ProductVariant[];
  };
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  code?: number;
  errors?: ApiErrorDetail[];
}
