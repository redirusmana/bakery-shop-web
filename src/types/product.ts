export interface ProductPrice {
  amount: string;
  currencyCode: string;
}

export interface ProductMedia {
  id: string;
  previewImage: {
    url: string;
    altText?: string;
    width: number;
    height: number;
  };
}

export interface ProductImages {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ProductPrice;
  selectedOptions: { name: string; value: string }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  descriptionHtml?: string;

  priceRange: {
    maxVariantPrice: ProductPrice;
    minVariantPrice?: ProductPrice;
  };

  media: {
    nodes: ProductMedia[];
  };

  images: {
    nodes: ProductImages[];
  };

  variants: {
    nodes: ProductVariant[];
  };
}
