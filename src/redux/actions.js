export const login = () => ({
  type: 'LOGIN',
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const setItems = items => ({
  type: 'SET_ITEMS',
  payload: items,
});

export const addToFavorites = item => ({
  type: 'ADD_TO_FAVORITES',
  payload: item,
});

export const removeFromFavorites = item => ({
  type: 'REMOVE_FROM_FAVORITES',
  payload: item,
});

export const removeAllFavorites = () => ({
  type: 'REMOVE_ALL_FAVORITES',
});
