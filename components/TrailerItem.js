import React from "react";
import { View,Text,Image,StyleSheet,Dimensions,TouchableWithoutFeedback } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function TrailerItem(props){
    const deviceWidth= Dimensions.get("window").width;
    var posterWidth=deviceWidth -40-10;
    const marginValue = props.itemIndex %2==0?10:0;
    
    return(
      <TouchableWithoutFeedback
        onPress={props.onPressFunciton}>
          <View style={{marginRight:marginValue,marginTop:10}}>
            <Image style={{position:"absolute",top:40, left:20 , zIndex:1, width:24 , height:24}}
            source={require("../assets/play-button.png")}
            />
            <Image
            resizeMode={"cover"}
            style={styles.poster}
            source={{uri:"http://image.tmdb.org/t/p/w342" +props.poster}}
            />
            <Text style={{flexWrap:"wrap",width:171,fontFamily:"Poppins",fontSize:12,}}> {props.data.name} </Text>
        </View>
      </TouchableWithoutFeedback>
    );
}
const styles= StyleSheet.create({
    poster:{
        width:this.posterWidth,
        height:100,
    }
});
export default TrailerItem;