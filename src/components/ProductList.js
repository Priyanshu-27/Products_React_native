// src/components/ProductList.js
import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
 
} from 'react-native';
import StarRating from './StarRating';

const ProductList = ({products, onProductPress}) => (
    
   <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onProductPress(item)}
          style={styles.productContainer}>
          <Image source={{uri: item.image}} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <View style={styles.ratingContainer}>
              <StarRating rating={item.rating.rate} />
              <Text style={styles.ratingCount}>({item.rating.count})</Text>
            </View>
            <Text style={styles.productPrice}>₹ {item.price}</Text>
            <Text style={styles.productCategory}>
              Category: {item.category}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  
);

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 20,
    marginRight:20 ,
    marginTop:20 ,
    borderColor: '#9e9e9e',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    gap: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCount: {
    marginLeft: 5,
    fontSize: 12,
    color: '#888',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 12,
    color: '#888',
  },
  productRating: {
    fontSize: 12,
    color: '#888',
  },
});

export default ProductList;
