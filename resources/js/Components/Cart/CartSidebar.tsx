import { Fragment } from 'react';
import { useCart } from '@/Contexts/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CartSidebar() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      ></div>

      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out font-inter text-[#7C634D] animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-[#7C634D]/10 flex items-center justify-between bg-[#FFF6EC]">
          <h2 className="text-xl font-serif font-bold uppercase tracking-wider">Shopping Cart</h2>
          <button onClick={closeCart} className="hover:opacity-70 transition-opacity">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag size={48} strokeWidth={1.5} className="mb-4" />
              <p className="font-medium mb-1">Your cart is empty</p>
              <p className="text-sm">Start adding some items!</p>
              <button
                onClick={closeCart}
                className="mt-6 text-sm underline underline-offset-4 hover:opacity-80"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => {
                const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                const itemSlug = item.product?.slug || (item as any).slug;
                const itemName = item.product?.name || (item as any).name;
                const itemImage = item.product?.image || (item as any).image;

                return (
                  <div key={item.id} className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-24 bg-gray-100 flex-shrink-0 relative overflow-hidden">
                      <img
                        src={`/storage/${itemImage}`}
                        alt={itemName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${itemSlug}`}
                          className="font-serif font-bold text-sm line-clamp-2 hover:underline decoration-[#7C634D]/30 underline-offset-2 mb-1"
                          onClick={closeCart}
                        >
                          {itemName}
                        </Link>
                        <p className="text-sm font-medium">{formatPrice(price)}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Control */}
                        <div className="flex items-center border border-[#7C634D]/20 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-[#7C634D]/5 transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-[#7C634D]/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#c45e5e] hover:opacity-70 transition-opacity p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#7C634D]/10 bg-white">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="font-medium opacity-70">Subtotal</span>
              <span className="font-bold text-lg">{formatPrice(getCartTotal())}</span>
            </div>

            <p className="text-[10px] text-center text-gray-400 mb-4 opacity-80">
              Shipping & taxes calculated at checkout
            </p>

            <Link
              href={route('checkout.index')}
              onClick={closeCart}
              className="block w-full bg-[#7C634D] text-[#FFF6EC] py-3.5 text-center text-sm font-bold uppercase tracking-widest hover:bg-[#65503D] transition-colors"
            >
              Checkout Now
            </Link>

            <button
              onClick={clearCart}
              className="block w-full mt-3 text-center text-xs text-red-400 hover:text-red-600 underline"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
