// App.js
import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import store from './src/redux/store';
import {
  FETCH_PRODUCTS,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from './src/redux/action';
import ProductList from './src/components/ProductList';
import ProductModal from './src/components/ProductModal';
import Cart from './src/components/Cart';

const AppContent = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      dispatch({type: FETCH_PRODUCTS, payload: data});
    };
    fetchData();
  }, [dispatch]);

  const handleAddToCart = product => {
    dispatch(addToCart(product));
    setSelectedProduct(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          width: width,
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Text
          style={{
            color: '#000',
            fontWeight: '500',
            fontSize: 18,
            letterSpacing: 2,
          }}>
          Spaarks Shopping
        </Text>
        <Icon name="basket-outline" style={{color: '#000', fontSize: 20}} />
      </View>
      <ProductList products={products} onProductPress={setSelectedProduct} />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isVisible={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      {/* <Cart
        cart={cart}
        onIncrement={id => dispatch(incrementQuantity(id))}
        onDecrement={id => dispatch(decrementQuantity(id))}
      /> */}
    </SafeAreaView>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
