import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import api from '../utils/api'
import { FlatList } from 'react-native-gesture-handler'
import axios from 'axios'

const CartPage = () => {

    const [ids, setIDs] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const getCart = async () => {
            api
                .get('/carts')
                .then(res => setIDs(res.data[0].products.map((item) => item.productId)))
                .catch(err => console.log(err))
        }
        getCart();
    }, [])

    useEffect(() => {
        if (ids && ids.length > 0) {
            const getAllItems = async () => {
                try {
                    const requests = ids.map((id) => api.get(`/products/${id}`));
                    const responses = await Promise.all(requests);
                    const data = responses.map((res) => res.data);
                    setCartItems(data);
                } catch (err) {
                    console.log(err);
                }
            }
            getAllItems();
        }
    }, [ids])

    return (
        <View>
            <FlatList
                data={cartItems}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item?.image }} style={styles.image} />
                        <Text style={styles.title}>{item?.title}</Text>
                        <Text style={styles.price}>${item?.price}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default CartPage

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5
    },
    price: {
        fontSize: 14,
        color: 'green',
        marginTop: 5
    }
})