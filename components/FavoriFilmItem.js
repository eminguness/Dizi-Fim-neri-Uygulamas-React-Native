import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const FavoriFilmItem = ({ film }) => {
    const navigation = useNavigation();
    const formattedVoteAverage = film.vote_average.toFixed(1);

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Film", { item: film })}>
            <View style={styles.itemContainer}>
                <Image
                    style={styles.poster}
                    source={{ uri: `http://image.tmdb.org/t/p/w342/${film.poster_path}` }}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{film.title}</Text>
                    <Text style={styles.genres}>{film.genres.join(', ')}</Text>
                    <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" color={"#FE6D8E"} size={20} />
                        <Text style={styles.rating}>{formattedVoteAverage}</Text>
                        <Text style={styles.rating}>{"/10"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    title: {
        fontFamily: "Poppins",
        fontSize: 16,
        marginBottom: 5,
    },
    genres: {
        fontFamily: "PoppinsLight",
        fontSize: 14,
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rating: {
        fontFamily: "PoppinsSBold",
        fontSize: 16,
        marginLeft: 5,
    },
});

export default FavoriFilmItem;
