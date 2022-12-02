import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {Colors, Theme} from '../Theme';
import {
  ActivityIndicator,
  Searchbar,
  Card,
  IconButton,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {addFavoriteAction, removeFavoriteAction} from '../redux/FavoritesSlice';
import {connect} from 'react-redux';
import {resetWikiSearchAction, searchWikiAction} from '../redux/WikiSlice';

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
    const {searchQuery} = this.state;
    const {searchPending, pages, errorMsg} = this.props;

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
          {pages &&
            (pages.length === 0 ? (
              <Text>Aucun résultat trouvé :-( </Text>
            ) : (
              <FlatList
                data={pages}
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
              style={styles.image}
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
      this.props.resetWikiSearchAction();
    }
    this.setState({searchQuery: query});
  };

  onSearch = async () => {
    const {searchQuery} = this.state;

    if (!searchQuery || searchQuery.trim().length === 0) {
      this.props.resetWikiSearchAction();
      return;
    }

    this.props.searchWikiAction(searchQuery.trim(), 0);
  };

  onLoadMore = async () => {
    let {searchQuery} = this.state;
    this.props.searchWikiAction(searchQuery.trim(), this.props.pages.length);
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
  image: {
    height: 45,
    width: 45,
    backgroundColor: '#ddd',
  },
});

const mapStateToProps = state => {
  const favorifavoritePageIds = state?.favorites?.pages?.map(p => p.pageid);
  const {error, searchPending, searchResult} = state?.wiki;
  const pages = searchResult?.map(p => ({
    ...p,
    isFavorite: favorifavoritePageIds.indexOf(p.pageid) >= 0,
  }));
  return {
    pages,
    searchPending,
    errorMsg:
      error &&
      "Une erreur s'est produite lors de la recherche.\nMerci de bien vouloir réessayer ultérieurement !",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchWikiAction: (keyword, offset) => {
      dispatch(searchWikiAction({keyword, offset}));
    },
    resetWikiSearchAction: () => {
      dispatch(resetWikiSearchAction());
    },
    addFavoriteAction: payload => {
      dispatch(addFavoriteAction(payload));
    },
    removeFavoriteAction: payload => {
      dispatch(removeFavoriteAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
