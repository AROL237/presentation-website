export interface ProductEntity {
  name: string;
  description: string;
  price: number;
  in_stock: number;
  imageUrl: string;
  id?: string;
  quantity: number;
}

export type OrderEntity = {
  userId: number;
  id: number;
  total: number;
  status: OrderStatus;
  payPrice: number;
  orderItems: Array<OrderItems>;
};

export type OrderStatus = {
  IN_PROGRESS: "IN PROGRESS";
  DELIVERED: "DELIVERED";
  CANCELLED: "CANCELLED";
};

export type OrderItems = {
  orderId: number;
  id: number;
  productId: number;
  quantity: number;
};

export type User = {
  email: string;
  name: string;
  id?: number;
  orders?: Array<OrderEntity>;
  isEnabled?: boolean;
  access_token: string;
  refresh_token: string;
};

export type Filter = {
  page: number;
  limit: number;
  orderBy: any;

  previous: number;
  total: number;
  next: number;
  size: number;
  sort: any;
};

export type Products = Filter & {
  list: Array<ProductEntity>;
};

export type Orders = Filter & {
  list: Array<OrderEntity>;
};

export interface AppStore {
  product?: Products;
  user: User | null | any;
  activeNav: string;
  error: any;
  setUser: (payload: any) => void;
  getProducts: (payload: any) => void;
  setError: (payload: any) => void;
  setProducts: (payload: Products | any) => void;
}
