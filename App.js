import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Button,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import store from './src/redux/store';
import {
  FETCH_PRODUCTS,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from './src/redux/action';

// Direct data fetching within component
const ProductList = ({products, onProductPress}) => (
  <FlatList
    data={products}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <TouchableOpacity onPress={() => onProductPress(item)}>
        <View style={styles.product}>
          <Text>{item.title}</Text>
          <Text>${item.price}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

const ProductModal = ({product, isVisible, onClose, onAddToCart}) => (
  <Modal visible={isVisible} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Image source={{uri: product?.image}} style={styles.image} />
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.price}>${product?.price}</Text>
        <Button title="Add to Cart" onPress={() => onAddToCart(product)} />
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

const Cart = ({cart, onIncrement, onDecrement}) => (
  <View style={styles.cart}>
    {cart.map(item => (
      <View key={item.id} style={styles.cartItem}>
        <Text>{item.title}</Text>
        <View style={styles.cartControls}>
          <Button title="-" onPress={() => onDecrement(item.id)} />
          <Text>{item.quantity}</Text>
          <Button title="+" onPress={() => onIncrement(item.id)} />
        </View>
      </View>
    ))}
  </View>
);

const AppContent = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      dispatch({type: FETCH_PRODUCTS, payload: data});
    };
    fetchData();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ProductList products={products} onProductPress={setSelectedProduct} />
      <ProductModal
        product={selectedProduct}
        isVisible={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={product => {
          dispatch(addToCart(product));
          setSelectedProduct(null);
        }}
      />
      <Cart
        cart={cart}
        onIncrement={id => dispatch(incrementQuantity(id))}
        onDecrement={id => dispatch(decrementQuantity(id))}
      />
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
    padding: 16,
  },
  product: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    marginVertical: 10,
  },
  cart: {
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
