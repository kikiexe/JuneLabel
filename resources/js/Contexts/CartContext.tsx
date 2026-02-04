import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { Product } from '@/types';

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  weight?: number;
  stock: number;
  name: string;
  image: string;
  slug: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  isLoading: boolean;
  isUpdating: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (clientId: number) => Promise<void>;
  updateQuantity: (clientId: number, newQuantity: number) => Promise<void>;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  refreshCart: () => Promise<void>;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchCart = useCallback(async () => {
    try {
      if (cartItems.length === 0) setIsLoading(true);
      const { data } = await axios.get('/api/cart');
      setCartItems(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product: Product, quantity = 1) => {
    setIsUpdating(true);

    // Optimistic check
    const existingItem = cartItems.find((item) => item.product_id === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;
    const maxStock = product.stock ?? 100;

    if (currentQty + quantity > maxStock) {
      showNotification(`⚠️ Stok tidak cukup! Tersisa ${maxStock}`);
      setIsUpdating(false);
      return;
    }

    try {
      const response = await axios.post('/api/cart/add', {
        product_id: product.id,
        quantity: quantity,
      });

      if (response.data.success) {
        showNotification('Berhasil ditambahkan ke keranjang!');
        await fetchCart(); // Refresh cart from server
        openCart(); // Auto open cart on add
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showNotification(error.response.data.message || 'Gagal menambahkan ke keranjang.');
      } else {
        showNotification('Terjadi kesalahan saat menghubungi server.');
      }
      console.error('Add to cart error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    const originalItems = [...cartItems];
    setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));

    try {
      await axios.post(`/api/cart/remove/${cartItemId}`);
    } catch (error) {
      console.error('Remove cart error:', error);
      showNotification('Gagal menghapus produk.');
      setCartItems(originalItems);
    }
  };

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((i) => i.id === cartItemId);
    if (!item) return;

    if (newQuantity > item.stock) {
      showNotification(`Maksimal stok tersedia hanya ${item.stock}`);
      return;
    }

    if (newQuantity > 10) {
      showNotification('Maksimal 10 item per produk.');
      return;
    }

    const originalItems = [...cartItems];
    setCartItems((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQuantity } : i))
    );

    try {
      await axios.post(`/api/cart/update/${cartItemId}`, { quantity: newQuantity });
    } catch (error) {
      console.error('Update cart error:', error);
      if (axios.isAxiosError(error) && error.response) {
        showNotification(error.response.data.message || 'Gagal update quantity.');
      } else {
        showNotification('Gagal update quantity.');
      }
      setCartItems(originalItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        isUpdating,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        refreshCart: fetchCart,
        isCartOpen,
        openCart,
        closeCart,
        setIsCartOpen,
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
