import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Constants from "expo-constants";
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrailerItem from '../components/TrailerItem';
import ChipGroup from '../components/ChipGroup';
import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';

// SQLite veritabanını aç
const db = SQLite.openDatabase("movie.db");

class FilmSayfasi extends Component {
  constructor(props) {
    super(props);
    const { route } = props;
    this.movieItem = route.params.item; // movieItem'i tanımla
    this.readMovieData(this.movieItem)
    
    this.state = {
      teaserTrailers: [],
      modalVisible: false,
      activeMovieTrailerKey: "",
      genres: [],  // Genres bilgisi için state ekliyoruz
      isFavorite:false,
    };
  }

  readMovieData(data){
    db.transaction((tx)=> {
      tx.executeSql(
        "SELECT * FROM Favorites WHERE movie_id=?",
        [data.id],
        (txObj,{rows:{_array}})=>{
          if(_array.length !=0){
            this.setState({isFavorite:true});
          }
          else{
            console.log("data yok");
          }
        },
        (txObj,error)=> console.error(error)
      );
    });
  }

  // İndirme işlemi
  downloadFile = async (data, size) => {
    // İndirme dizini oluştur
    const movieDir = FileSystem.documentDirectory + "/" + data.id + "/";
    const dirInfo = await FileSystem.getInfoAsync(movieDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(movieDir, { intermediates: true });
    }

    const fileUri = movieDir + (size == 342 ? "poster_path.jpg" : "backdrop_path.jpg");

    const uri = "http://image.tmdb.org/t/p/w" +
      size +
      "/" +
      (size == 342 ? data.poster_path : data.backdrop_path);

    let downloadObject = FileSystem.createDownloadResumable(uri, fileUri);
    let response = await downloadObject.downloadAsync();
    return response;
  };

  // Favori silme işlemi
  deleteItem = async (data) => {
    const movieDir = FileSystem.documentDirectory + "/" + data.id + "/";
    await FileSystem.deleteAsync(movieDir);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Favorites WHERE movie_id = ?",
        [data.id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            // Favori silindiğinde state'i güncelle
            
            this.setState({ isFavorite: false });
          }
        },
        (txObj, error) => console.error(error)
      );
    });
  };

  addItem = async (data) => {
    await this.downloadFile(data, 342).then((response) => {
      if (response.status == 200) {
        this.downloadFile(data, 500).then((response) => {
          if (response.status == 200) {
            if (data.genresString == undefined) {
              data.genresString = "";
              data.genresString += data.genres.map((item, index) => item);
            }
            db.transaction((tx) => {
              tx.executeSql(
                "INSERT INTO Favorites (movie_id, title, genres, overview, popularity, release_date, vote_average, vote_count) values (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  data.id,
                  data.title,
                  data.genresString,
                  data.overview,
                  data.popularity,
                  data.release_date,
                  data.vote_average,
                  data.vote_count,
                ],
                (txObj, resultSet) => {
                  // Favori eklendiğinde state'i güncelle
                  this.setState({ isFavorite: true });
                  console.log("Başarı ile eklendi");
                },
                (txObj, error) => {
                  console.error("Veritabanına ekleme başarısız", error);
                }
              );
            });
          }
        });
      }
    });
  };

  favoriteProcess(data) {
    if (this.state.isFavorite) {
      this.deleteItem(data);
    } else {
      this.addItem(data);
    }
  }
  

  // Sayfa yüklendiğinde
  componentDidMount() {
    const { route } = this.props;
    const film = route.params.item;

    // Filmin fragmanlarını çekiyoruz
    fetch('http://api.themoviedb.org/3/movie/' + film.id + '/videos?api_key=802b2c4b88ea1183e50e6b285a27696e')
      .then(response => response.json())
      .then(responseJson => {
        const teaserTrailers = responseJson.results.map(movie => (
          { 
            key: movie.key,  // Assuming `key` is the YouTube video ID
            name: movie.name, 
            type: movie.type 
          }
        ));
        this.setState({ teaserTrailers });
      }).catch(error => console.error(error));

    // Filmin detaylarını ve türlerini çekiyoruz
    fetch('http://api.themoviedb.org/3/movie/' + film.id + '?api_key=802b2c4b88ea1183e50e6b285a27696e')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ genres: responseJson.genres });
      }).catch(error => console.error(error));
  }
 
  render() {
    const { navigation, route } = this.props;
    const film = route.params.item;

    const formattedVoteAverage = film.vote_average.toFixed(1);

    return (
      <View style={styles.container}>
        <Modal 
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible:false});
          }}
        >
          <View style={{flex:1, alignItems:"center", justifyContent:"center", height:120, backgroundColor:"#000"}}>
            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible:false})}>
              <View style={{
                backgroundColor: "#222",
                width:48,
                height:48,
                position:"absolute",
                top:Constants.statusBarHeight+10,
                justifyContent:"center",
                alignItems:"center",
                left:20,
                borderRadius:10,
              }}>
                <MaterialCommunityIcons name="close" size={20} color={"white"}/>
              </View>
            </TouchableWithoutFeedback>
            <View style={{width:"100%"}}>
              <YoutubePlayer 
                play={true}
                height={240}
                videoId={this.state.activeMovieTrailerKey}
              />
            </View>
          </View>
        </Modal>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => navigation.pop()}>
            <MaterialCommunityIcons
              style={{ position: "absolute", top: Constants.statusBarHeight + 10, left: 10, zIndex: 1, paddingRight: 20, paddingBottom: 20 }}
              name='chevron-left' size={24} color={"#fff"}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.favoriteProcess(film, 342)}
          >
            <MaterialCommunityIcons
              style={{
                position:"absolute",
                top: Constants.statusBarHeight+10,
                right:10,
                zIndex:1,
                paddingLeft:20,
                paddingBottom:20,
              }}
              name={this.state.isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={"#fff"}
            />
          </TouchableWithoutFeedback>
          <Image style={styles.poster} resizeMode={'contain'} source={{ uri: "http://image.tmdb.org/t/p/w500/" + film.backdrop_path }} />
          <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
                <Text style={styles.title}>{film.title}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.rating}>{formattedVoteAverage}</Text>
              </View>
            </View>
            <ChipGroup data={this.state.genres.map(genre => genre.name)} />
            <Text style={styles.header}>Overview</Text>
            <Text style={{fontFamily:"PoppinsLight"}}>{film.overview}</Text>
            <Text style={styles.header}>Fragmanlar</Text>
            <View style={{flexWrap:"wrap", flexDirection:"row"}}>
              {this.state.teaserTrailers.map((item, index) => {
                return (
                  <TrailerItem
                    poster={film.backdrop_path}
                    key={item.key}
                    onPressFunciton={() => {
                      this.setState({
                        modalVisible: true,
                        activeMovieTrailerKey: item.key, // Correct video ID
                      });
                    }}
                    data={item}
                    modalVisible={this.state.modalVisible}
                    itemIndex={index}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor:"white"
  },
  poster: {
    height: 281,
  },
  title: {
    fontSize: 17,
    fontFamily:"Poppins",
  },
  ratingBadge:{
    width: 48,
    height: 48,
    backgroundColor: "#FE6D8E",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  rating:{
    fontFamily:"PoppinsSBold",
  },
  genres: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  header: {
    fontSize: 20,
    fontFamily:"PoppinsSBold",
    marginTop: 10,
  }
});

export default FilmSayfasi;