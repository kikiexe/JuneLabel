import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    
    // State untuk notifikasi popup sederhana
    const [notification, setNotification] = useState(null); 

    // Ambil data keranjang dari Local Storage saat aplikasi dimuat
    useEffect(() => {
        const storedCart = localStorage.getItem('junelabel_cart');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Gagal mem parsing cart dari local storage", error);
                localStorage.removeItem('junelabel_cart');
            }
        }
    }, []);

    // Simpan data ke Local Storage setiap kali cartItems berubah
    useEffect(() => {
        localStorage.setItem('junelabel_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Fungsi menambah produk ke keranjang
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Cek apakah produk sudah ada di keranjang
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
            
            if (existingItemIndex > -1) {
                // Jika sudah ada, update quantity-nya saja
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                // Jika belum ada, tambahkan sebagai item baru
                // Simpan data penting saja untuk menghemat storage
                return [...prevItems, { 
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity 
                }];
            }
        });
        showNotification("Berhasil ditambahkan ke keranjang!");
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Menghitung total harga belanjaan di sisi client (frontend display only)
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            getCartTotal, 
            getCartCount 
        }}>
            {children}
            {/* Tampilkan notifikasi jika ada pesan */}
            {notification && (
                <div className="fixed bottom-5 right-5 z-[100] bg-[#7C634D] text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
                    {notification}
                </div>
            )}
        </CartContext.Provider>
    );
};
