import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback ,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FilmSayfasi from '../pages/FilmSayfasi';


const RecentMovieItem = (props) => {
    const navigation = useNavigation();
    const formattedVoteAverage = props.item.vote_average.toFixed(1);
    const devicewidth=Dimensions.get('window').width;
    const _width= (devicewidth -50 -171)

    // State tanımla
    const [genres, setGenres] = useState([]);

    // Veriyi çek
    useEffect(() => {
        // Veriyi çekmek için fetch kullan
        fetch("http://api.themoviedb.org/3/movie/" + props.item.id + "?api_key=802b2c4b88ea1183e50e6b285a27696e")
            .then(response => response.json())
            .then(responseJson => {
                // genres içindeki türleri al
                const fetchedGenres = responseJson.genres.map(genre => genre.name);
                // Bileşenin durumunu güncelle
                setGenres(fetchedGenres);
            })
            .catch(error => console.error(error));
    }, []); // Bu etkileşim sadece bir kere çalışsın diye boş bağımlılık dizisi verildi

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Film", { item: props.item })}>
            <View style={styles.item}>
                <Image
                    style={styles.poster}
                    source={{ uri: `http://image.tmdb.org/t/p/w342/${props.item.poster_path}` }}
                />
                <View style={{marginLeft:10,width:_width}}>
                    <Text style={{ width: 171, fontFamily: "Poppins", fontSize: 13 }}>{props.item.title}</Text>
                    {/* Türleri gösterme */}
                    <Text style={{fontFamily:"PoppinsLight",fontSize:12}}>{genres.join(', ')}</Text>
                    <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                        <MaterialCommunityIcons name="star" color={"#FE6D8E"} size={20}/>
                        <Text style={{fontFamily:"PoppinsSBold",alignSelf:"center"}}>{formattedVoteAverage}</Text>
                        <Text style={{fontSize:10,fontFamily:"PoppinsLight",alignSelf:"flex-end"}}>{""}/10</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    poster: {
        width: 171,
        height: 255.5,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default RecentMovieItem;
