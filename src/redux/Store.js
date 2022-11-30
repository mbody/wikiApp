import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './FavoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
