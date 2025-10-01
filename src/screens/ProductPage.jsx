import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import api from '../utils/api';

const ProductPage = ({ navigation, route }) => {
  const { id, setProducts, products } = route.params;
  const [product, setProduct] = useState(null);

  const handleDelete = async () => {
    api.delete(`/products/${id}`)
      .then(res => {
        setProducts(products.filter(item => item.id !== id));
        navigation.goBack();
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    const getProduct = async () => {
      api.get(`/products/${id}`)
        .then(res => {
          setProduct(res.data);
        })
        .catch(err => console.log(err))
    }
    getProduct();

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.image} />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={styles.title} numberOfLines={2} paddingHorizontal={10}>{product?.title}</Text>
        <Text style={styles.description}>{product?.description}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => handleDelete()}>
          <Text style={styles.addToCartButtonText}>Delete</Text>
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
  },
  addToCartButton: {
    backgroundColor:"rgb(253,80,80)",
    margin:"auto",
    padding:15,
    borderRadius:10

  },
  addToCartButtonText:{
    color:"white",
    fontWeight:"600",
    fontSize:16
  }
})