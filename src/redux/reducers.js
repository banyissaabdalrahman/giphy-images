const initialState = {
  isLoggedIn: false,
  items: [],
  favorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, isLoggedIn: true};
    case 'LOGOUT':
      return {...state, isLoggedIn: false};
    case 'SET_ITEMS':
      return {...state, items: action.payload};
    case 'ADD_TO_FAVORITES':
      return {...state, favorites: [...state.favorites, action.payload]};
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(
          item => item.id !== action.payload.id,
        ),
      };
    case 'REMOVE_ALL_FAVORITES':
      return {...state, favorites: []};
    default:
      return state;
  }
};

export default rootReducer;
