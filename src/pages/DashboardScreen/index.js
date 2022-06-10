import React, { useEffect } from "react"
import { Text, View, Button, FlatList, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styles from "../../assets/styles"
import { fetchPokemons } from "../../store/action"
import PokemonCard from "../../component/reusable/card"
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'

export default function Home({ navigation }) {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    const loading = useSelector(state => state.loading)
    const next = useSelector(state => state.next)

    useEffect(async () => {
        await dispatch(fetchPokemons(next))
        return
    }, [])

    const logout = () => {
        auth()
            .signOut()
            .then(() => {navigation.replace('MainApp')})
            alert("sukses")
    }

    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={styles.text__title}>Pokedex</Text>
                <TouchableOpacity onPress={logout}>
                    <Icon style={styles.icon} name='power-off' size={32} color="black"></Icon>
                </TouchableOpacity>
            </View>
            <FlatList
                data={pokemons}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(pokemon) => String(pokemon.id)}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                contentContainerStyle={styles.flatListContentContainer}
            />

            <View style={{ padding: 5, marginTop: 10 }}>
                <Button title="Show More" color={"gray"} onPress={() => dispatch(fetchPokemons(next))} />
            </View>
        </View>
    )
}