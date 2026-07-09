import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { Cart } from './components/Cart/Cart';
import { Loader } from './components/Loader/Loader';
import { fetchProducts } from './api/products';
import type { Product, CartItem } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    if (quantity === 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    setQuantities((prev) => ({
      ...prev,
      [product.id]: 0,
    }));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header
          cartItemsCount={cartItemsCount}
          cartTotalPrice={cartTotalPrice}
          onCartClick={() => setCartOpened(true)}
        />
      </div>

      <ProductList
        products={products}
        quantities={quantities}
        onAddToCart={handleAddToCart}
        onQuantityChange={handleQuantityChange}
      />

      <Cart
        opened={cartOpened}
        onClose={() => setCartOpened(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
      />
    </>
  );
}

export default App;