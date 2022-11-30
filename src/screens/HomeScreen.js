import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {Colors, Theme} from '../Theme';
import {
  ActivityIndicator,
  Searchbar,
  Card,
  IconButton,
} from 'react-native-paper';
import {wikiService} from '../services/WikiService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {addFavoriteAction, removeFavoriteAction} from '../redux/FavoritesSlice';
import {connect} from 'react-redux';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'react native',
      searchPending: false,
    };
  }
  // --------------------------------------------------- render methods
  render() {
    const {searchQuery, searchPending, errorMsg, searchResultPages} =
      this.state;

    const {favoritePageIds} = this.props;
    const resultWithFavorites =
      searchResultPages &&
      searchResultPages.map(page => {
        const newPage = {...page};
        newPage.isFavorite = favoritePageIds.indexOf(page.pageid) >= 0;
        return newPage;
      });

    return (
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Rechercher"
          onChangeText={this.onChangeText}
          onIconPress={this.onSearch}
          value={searchQuery}
        />

        <View style={styles.searchResultsContainer}>
          {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          {searchResultPages &&
            (searchResultPages.length === 0 ? (
              <Text>Aucun résultat trouvé :-( </Text>
            ) : (
              <FlatList
                data={resultWithFavorites}
                renderItem={this.renderPageCard}
                keyExtractor={this._keyExtractor}
                onEndReached={this.onLoadMore}
              />
            ))}
          {searchPending && <ActivityIndicator />}
        </View>
      </SafeAreaView>
    );
  }
  // --------------------------------------------------- handlers
  renderPageCard = ({item, index}) => {
    return (
      <Card style={styles.card}>
        <Card.Title
          title={item.title}
          subtitle={item.description}
          left={props => (
            <Image
              {...props}
              source={{uri: item.thumbnail && item.thumbnail.source}}
              style={{height: 45, width: 45, backgroundColor: '#ddd'}}
            />
          )}
          right={props => (
            <IconButton
              icon={item.isFavorite ? 'heart' : 'heart-outline'}
              color={Colors.gray}
              size={30}
              onPress={() => this.onToggleFavorite(item)}
            />
          )}
        />
      </Card>
    );
  };

  onChangeText = query => {
    if (!query || query.length === 0) {
      this.setState({searchResultPages: false, errorMsg: false});
    }
    this.setState({searchQuery: query});
  };

  onSearch = async () => {
    const {searchQuery} = this.state;
    if (!searchQuery || searchQuery.trim().length === 0) {
      this.setState({searchResultPages: false, errorMsg: false});
      return;
    }

    this.setState({
      searchPending: true,
      searchResultPages: false,
      errorMsg: false,
    });

    try {
      const searchResultPages = await wikiService.search(searchQuery.trim());
      this.setState({searchPending: false, searchResultPages});
    } catch (error) {
      console.error('Error while searching wikipedia', error);
      this.setState({
        searchPending: false,
        errorMsg:
          "Une erreur s'est produite lors de la recherche.\nMerci de bien vouloir réessayer ultérieurement !",
      });
    }
  };

  onLoadMore = async () => {
    let {searchResultPages, searchQuery} = this.state;
    this.setState({errorMsg: false});

    try {
      const moreResultPages = await wikiService.search(
        searchQuery.trim(),
        searchResultPages.length,
      );
      searchResultPages = searchResultPages.concat(moreResultPages);
      this.setState({searchResultPages});
    } catch (error) {
      console.error('Error while searching wikipedia', error);
      this.setState({
        errorMsg:
          "Une erreur s'est produite lors de la recherche.\nMerci de bien vouloir réessayer ultérieurement !",
      });
    }
  };

  onToggleFavorite = page => {
    if (page.isFavorite) {
      this.props.removeFavoriteAction(page);
    } else {
      this.props.addFavoriteAction(page);
    }
  };

  // --------------------------------------------------- privates
  /**
   * to make each component unique
   */
  _keyExtractor = (item, index) => item.pageid.toString() + '_' + index;
}

const styles = StyleSheet.create({
  container: {
    ...Theme.centerCenter,
    padding: 10,
    paddingTop: 50,
  },
  searchResultsContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  errorMsg: {
    color: Colors.error,
  },
  card: {
    margin: 5,
    backgroundColor: '#f9f9f9',
  },
});

const mapStateToProps = state => {
  return {
    favoritePageIds: state.favorites.pages.map(p => p.pageid),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFavoriteAction: payload => {
      dispatch(addFavoriteAction(payload));
    },
    removeFavoriteAction: payload => {
      dispatch(removeFavoriteAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
