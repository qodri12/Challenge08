import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { pokeball } from '../../assets/icon';

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('MainApp');
        }, 2500)
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground source={pokeball} style={styles.logo}></ImageBackground>
            <Text style={styles.text}>My Pokemon</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F5F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 8
    },
    text: {
        fontSize: 17,
        color: 'black',
        marginBottom: 70
    }
})