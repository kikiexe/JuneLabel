import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Product } from '@/types';

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number | string;
  weight?: number;
  product?: Product;
  stock?: number;
  max_stock?: number;
  name?: string;
  image?: string;
  slug?: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Fetch cart data from server
  const fetchCart = async () => {
    try {
      // setIsLoading(true); // Jangan set loading true di sini biar gak flicker
      const { data } = await axios.get('/api/cart');
      setCartItems(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = async (product: Product, quantity = 1) => {
    // Validasi Stock Awal (Client Side)
    const maxStock = product.stock || 100; // Fallback jika stock tidak ada di props

    // Cek current quantity di cart
    const existingItem = cartItems.find((item) => item.product_id === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty + quantity > maxStock) {
      showNotification(`⚠️ Stock tidak cukup! Tersisa ${maxStock}`);
      return;
    }

    try {
      const response = await axios.post('/api/cart/add', {
        product_id: product.id,
        quantity: quantity,
      });

      if (response.data.success) {
        showNotification('Berhasil ditambahkan ke keranjang!');
        fetchCart(); // Refresh cart from server
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      showNotification('Gagal menambahkan ke keranjang.');
    }
  };

  const removeFromCart = async (productId: number) => {
    // Cari Item ID berdasarkan Product ID atau Item ID (flexible logic from original code)
    const item = cartItems.find((i) => i.product_id === productId || i.id === productId);
    if (!item) return;

    try {
      // Optimistic update
      setCartItems((prev) => prev.filter((i) => i.id !== item.id));
      await axios.post(`/api/cart/remove/${item.id}`);
      fetchCart(); // Sync to be sure
    } catch (error) {
      console.error('Remove cart error:', error);
      fetchCart(); // Revert
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Cari Item ID berdasarkan Product ID atau Item ID
    const item = cartItems.find((i) => i.product_id === productId || i.id === productId);
    if (!item) return;

    // Validasi Stock
    const maxStock = item.stock || item.max_stock || 100;
    if (newQuantity > maxStock) {
      showNotification(`⚠️ Stock mentok! Tersisa ${maxStock}`);
      return;
    }

    try {
      // Optimistic update
      setCartItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: newQuantity } : i))
      );

      await axios.post(`/api/cart/update/${item.id}`, { quantity: newQuantity });
    } catch (error) {
      console.error('Update cart error:', error);
      fetchCart(); // Revert
    }
  };

  const clearCart = () => {
    setCartItems([]);
    // Idealnya ada API endpoint untuk delete all, sementara manual reload/client clear
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (typeof item.price === 'string' ? parseInt(item.price) : item.price) * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
      {notification && (
        <div className="fixed bottom-5 right-5 z-[100] bg-[#7C634D] text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
};
