import {
  OrderEntity,
  Orders,
  ProductEntity,
  Products,
  User,
} from "@/types/MyType.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  shoppingList: Array<ProductEntity>;
  user: User | null;
  navigationTab: Array<{ name: string; link: string; active: boolean }>;
  products: Products | null;
  orders: Orders | null;
  showShoppingList: boolean;
  productDetails: { status: boolean; product: ProductEntity | null };
  setProducts: (payload: any) => void;
  setOrders: (payload: Array<OrderEntity>) => void;
  addItem: (payload: any) => void;
  setUser: (payload: any) => void;
  setShowShoppingList: (payload: boolean) => void;
  addItemQuantity: (payload: ProductEntity) => void;
  reduceItemQuantity: (payload: ProductEntity) => void;
  setItemQuantity: (payload: ProductEntity, quantity: number) => void;
  totalAmountToPay: () => number;
  removeItemFromCard: (payload: ProductEntity) => void;
  removeLoginUser: () => void;
  setProductDetail: (payload: {
    status: boolean;
    product: ProductEntity | null;
  }) => void;
}

export const useGlobalStore = create<State>()(
  persist(
    (set) => ({
      shoppingList: [],
      user: null,
      orders: null,
      navigationTab: [
        { name: "home", link: "/", active: true },
        { name: "order", link: "/orders", active: false },
        { name: "cantact", link: "/contact", active: false },
      ],
      products: null,
      showShoppingList: false,
      productDetails: { status: false, product: null },
      setProductDetail(payload: {
        status: boolean;
        product: ProductEntity | null;
      }) {
        set((state) => {
          return {
            ...state,
            productDetails: payload,
          };
        });
      },
      removeLoginUser() {
        set((state) => {
          return {
            ...state,
            user: null,
          };
        });
      },
      setOrders: (payload: any) =>
        set((state) => {
          return {
            ...state,
            orders: payload,
          };
        }),

      addItem: (payload: any) =>
        set((state: any) => {
          return {
            ...state,
            shoppingList: [
              ...state.shoppingList.filter(
                (pred: any) => pred.id !== payload.id,
              ),
              payload,
            ],
          };
        }),
      setUser: (payload: User | any) =>
        set((state: Partial<State> | State) => {
          return {
            ...state,
            user: { ...payload },
          };
        }),
      setShowShoppingList: (payload: boolean) =>
        set((state: Partial<State> | State) => {
          return {
            ...state,
            showShoppingList: payload,
          };
        }),
      setProducts: (payload: any) =>
        set((state: Partial<State> | State) => {
          return {
            ...state,
            products: { ...payload },
          };
        }),
      addItemQuantity: (payload: ProductEntity) =>
        set((state: Partial<State> | State) => ({
          ...state,
          shoppingList: state.shoppingList?.map((item) => {
            if (item.id === payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        })),
      reduceItemQuantity: (payload: ProductEntity) =>
        set((state: Partial<State> | State) => ({
          ...state,
          shoppingList: state.shoppingList?.map((item) => {
            if (item.id === payload.id && item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
        })),
      setItemQuantity: (payload: ProductEntity, qty: number) =>
        set((state: Partial<State> | State) => ({
          ...state,
          shoppingList: state.shoppingList?.map((item) => {
            if (item.id === payload.id) {
              return { ...item, quantity: qty };
            }
            return item;
          }),
        })),
      removeItemFromCard: (payload: ProductEntity) =>
        set((state: Partial<State> | State) => {
          return {
            ...state,
            shoppingList: state.shoppingList?.filter(
              (pred) => pred.id !== payload.id,
            ),
          };
        }),
      totalAmountToPay: () => {
        let totalPrice = 0;
        set((state: Partial<State> | State) => {
          state.shoppingList?.map((item) => {
            const amountPerItem = item.price * item.quantity;
            totalPrice = totalPrice + amountPerItem;
          });
          return state;
        });

        return totalPrice;
      },
    }),
    { name: "e-commerce store" },
  ),
);
