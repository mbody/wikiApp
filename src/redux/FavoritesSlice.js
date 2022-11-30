//redux/favoritesSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {Logger} from '../utils/LogUtils';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    pages: [],
  },
  reducers: {
    addFavoriteAction(state, action) {
      const page = action.payload;
      Logger.debug(`Adding page ${page.pageid} to favorites`);
      // TODO : ajouter au state la page passée dans l'action
    },
    removeFavoriteAction(state, action) {
      const page = action.payload;
      Logger.debug(`Removing page ${page.pageid} from favorite`);
      // TODO : retirer du state la page passée dans l'action
    },
  },
});

export const {addFavoriteAction, removeFavoriteAction} = favoritesSlice.actions;
export default favoritesSlice.reducer;
