import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("movie.db");

class FavoriteSayfasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteMovies();
  }

  fetchFavoriteMovies = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Favorites",
        [],
        (_, { rows: { _array } }) => {
          this.setState({ favoriteMovies: _array }, () => {
            // Favori filmlerin her biri için detayları al
            this.state.favoriteMovies.forEach(movie => {
              fetch(`http://api.themoviedb.org/3/movie/${movie.movie_id}?api_key=802b2c4b88ea1183e50e6b285a27696e`)
                .then(response => response.json())
                .then(responseJson => {
                  // Her film için poster yolu, overview ve türleri güncelleniyor
                  const updatedMovie = {
                    ...movie,
                    poster_path: responseJson.poster_path,
                    overview: responseJson.overview,
                    vote_average:responseJson.vote_average,
                    genres: responseJson.genres.map(genre => genre.name)
                  };
                  // Güncellenmiş film verisini favori filmler listesine ekleyin
                  this.setState(prevState => ({
                    favoriteMovies: prevState.favoriteMovies.map(item => item.movie_id === updatedMovie.movie_id ? updatedMovie : item)
                  }));
                })
                .catch(error => console.error(error));
            });
          });
        },
        (txObj, error) => console.error("Veritabanından filmleri getirirken hata oluştu", error)
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Favori Filmler</Text>
        <FlatList
          data={this.state.favoriteMovies}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                style={styles.poster}
                source={{ uri: `http://image.tmdb.org/t/p/w342/${item.poster_path}` }}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieOverview}>{item.overview}</Text>
                <Text style={styles.movieGenres}>Türler: {item.genres ? item.genres.join(', ') : 'Tür bilgisi yok'}</Text>
                <Text>{item.vote_average}/10</Text>
                

              </View>
            </View>
          )}
          keyExtractor={(item) => item.movie_id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  movieDetails: {
    marginLeft: 10,
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieOverview: {
    fontSize: 16,
  },
  movieGenres: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
});

export default FavoriteSayfasi;
