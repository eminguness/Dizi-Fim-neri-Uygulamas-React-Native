import { StyleSheet, Text, View,Image,TouchableWithoutFeedback,TextPropTypes, } from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native";

function MovieItem(props) {
   const navigation=useNavigation();
    return (
    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Film",{item :props.item})}>
        <View style={styles.item}>
        <Image style={styles.poster}
        source={{
            uri: "http://image.tmdb.org/t/p/w342/" + props.item.poster_path,
        }}
        />
        <Text style={{width:171, fontFamily:"Poppins",fontSize:13  }}>{props.item.title}</Text>
        </View>
    </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    item:{
        flexDirection:"column",
        flexWrap:"wrap",
        marginRight:10,
    },
    poster:{
        width:171,
        height:255.5,
        borderRadius:10,
        marginBottom:10,
        
    },
});
export default MovieItem;
