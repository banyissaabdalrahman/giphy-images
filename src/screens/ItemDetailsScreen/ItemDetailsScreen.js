import {Image, Text, StyleSheet, ScrollView, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {addToFavorites, removeFromFavorites} from '../../redux/actions';

const ItemDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;
  const onHomePress = () => {
    navigation.navigate('Home');
  };

  const onFavoritePress = () => {
    navigation.navigate('Favorites');
  };

  const handleAddFavorite = () => {
    dispatch(addToFavorites(item));
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFromFavorites(item));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Image
        source={{uri: item.images.downsized.url}}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.type}</Text>
      <Text style={styles.title}>{item.Slug}</Text>
      <Text style={styles.title}>{item.url}</Text>
      <CustomButton text="Back to Home" onPress={onHomePress} type="TERTIARY" />
      <CustomButton
        text="Favorites"
        onPress={onFavoritePress}
        type="TERTIARY"
      />
      <CustomButton
        text="Add to favorite"
        onPress={handleAddFavorite}
        type="TERTIARY"
      />
      <CustomButton
        text="Remove from favorate"
        onPress={handleRemoveFavorite}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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

export default ItemDetailsScreen;
