import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainPage = ({ navigation }) => {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getData = async () => {
            await api
                .get('/products')
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        getData();
    }, [])

    if (loading) return <View style={styles.loadingIndicator}><ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
    </View>
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text1}>Product List</Text>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={products}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                    onPress={()=> navigation.navigate('ProductPage',{id: item.id, setProducts, products})}
                    >
                        <View style={styles.card}>
                        <View style={styles.imgBg}>
                            <Image source={{ uri: item?.image }} style={styles.img} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{width:'100%'}}>{item?.title}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />

        </SafeAreaView>

    )
}

export default MainPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0, // Üst boşluğu kaldır
    },
    listContainer: {
        paddingHorizontal: '5%', // Yatay padding ile genişlik ayarı
        paddingTop: 5, // Hafif üst padding
    },
    imgBg: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    img: {
        width: '100%',
        height: '100%',
        padding: 10,
        resizeMode: 'contain'
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '500',
        color: 'gray'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
        width:'100%',
        margin:"auto",
        borderWidth:1,
        padding:5,
        borderRadius:5,
        marginVertical:10,
        
    },
    textContainer:{
        flexShrink:1,
        padding:5,
        width:'100%'
    },
    text1: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        marginVertical: 10,
    }
})