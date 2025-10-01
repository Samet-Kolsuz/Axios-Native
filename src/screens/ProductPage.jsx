import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import api from '../utils/api';

const ProductPage = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  useFocusEffect(() => {
    const getProduct = async () => {
      api.get(`/products/${id}`)
        .then(res => {
          setProduct(res.data);
        })
        .catch(err => console.log(err))
    }
    getProduct();

  })

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.image} />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={styles.title} numberOfLines={2} paddingHorizontal={10}>{product?.title}</Text>
        <Text style={styles.description}>{product?.description}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductPage

const styles = StyleSheet.create({
  imageContainer: {
    flex: 2,
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
     fontWeight: 'bold',
      fontSize: 18 ,
      marginTop: 20,
      paddingHorizontal: 10
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 10
  }
})