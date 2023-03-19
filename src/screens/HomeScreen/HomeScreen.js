import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites} from '../../redux/actions';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

import CustomButton from '../../components/CustomButton';

const itemsPerPage = 20;

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  const onFavoritesPress = () => {
    navigation.navigate('Favorites');
  };

  const [page, setPage] = useState(0);
  const [pageItems, setPageItems] = useState([]);

  useEffect(() => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    setPageItems(items.slice(start, end));
  }, [page]);

  const handleNextPage = () => {
    setPage(page => page + 1);
  };

  const handlePrevPage = () => {
    setPage(page => page - 1);
  };

  const renderItem = ({item}) => {
    const handleToggleFavorite = () => {
      dispatch(addToFavorites(item));
    };

    const onItemDetailsPress = () => {
      navigation.navigate('ItemDetails', {item});
    };
    return (
      <Pressable onPress={onItemDetailsPress} style={styles.itemContainer}>
        <Image
          source={{uri: item.images.downsized.url}}
          style={styles.itemImage}
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.slug}</Text>
        <CustomButton
          text="Add to favorite"
          onPress={handleToggleFavorite}
          type="SECONDARY"
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Screen</Text>
      <CustomButton
        text="Favorites"
        onPress={onFavoritesPress}
        type="TERTIARY"
      />
      <FlatList
        data={pageItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevPage} disabled={page === 0}>
          <Text style={[styles.paginationButton, {marginRight: 10}]}>
            {'Prev'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPage}>
          <Text style={styles.paginationButton}>{'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
  },
  itemImage: {
    width: '100%',
    height: 300,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemDescription: {},
  paginationContainer: {
    flexDirection: 'row',
  },
  paginationButton: {
    fontSize: 20,
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default HomeScreen;
