import {View, Text, Image, StyleSheet, Pressable, FlatList} from 'react-native';
import CustomButton from '../../components/CustomButton';

import {useDispatch, useSelector} from 'react-redux';
import {removeFromFavorites, removeAllFavorites} from '../../redux/actions';
import {useNavigation} from '@react-navigation/core';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onHomePress = () => {
    navigation.navigate('Home');
  };

  const onItemDetailsPress = () => {
    navigation.navigate('ItemDetails');
  };

  const onRemoveAllPress = () => {
    dispatch(removeAllFavorites());
  };

  const renderItem = ({item}) => {
    const handleToggleFavorite = () => {
      dispatch(removeFromFavorites(item));
    };

    const onItemDetailsPress = () => {
      navigation.navigate('ItemDetails', {item});
    };

    return (
      <Pressable onPress={onItemDetailsPress} style={styles.itemContainer}>
        <Image
          source={{uri: item.images.original_still.url}}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.slug}</Text>
        <CustomButton
          text="Remove from favorite"
          onPress={handleToggleFavorite}
          type="SECONDARY"
        />
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <CustomButton text="Home" onPress={onHomePress} type="TERTIARY" />
      <CustomButton
        text="Remove All"
        onPress={onRemoveAllPress}
        type="TERTIARY"
      />
      <Text style={styles.heading}>Favorites count: {favorites.length}</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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

export default FavoritesScreen;
