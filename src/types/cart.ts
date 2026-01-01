export interface Cart {
  id: string;
  lines: { nodes: CartLine[] };
  cost: { subtotalAmount: { amount: string } };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    product: { title: string };
    title: string;
    image: { url: string };
    price: { amount: string };
    selectedOptions: { name: string; value: string }[];
  };
  attributes: { key: string; value: string }[];
}

export interface CartApiResponse {
  cart: Cart;
}

export interface AddToCartPayload {
  variantId: string;
  quantity: number;
  cakeWording?: string;
  greetingWording?: string;

  productTitle?: string;
  varitanTitle?: string;
}

export interface UpdateItemPayload {
  lineId: string;
  quantity: number;
  cakeWording?: string;
  greetingWording?: string;
}

export interface CheckoutPayload {
  cartId: string;
  phone: string;
  deliveryDate: string;
  deliveryTime: string;
}

export interface SavedCheckoutData {
  phone: string;
  deliveryDate: string;
  deliveryTime: string;
}
