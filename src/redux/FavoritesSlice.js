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
      Logger.debug(`Adding page ${action.page.pageid} to favorites`);
      // TODO : ajouter au state la page passée dans l'action
    },
    removeFavoriteAction(state, action) {
      Logger.debug(`Removing page ${action.page.pageid} from favorite`);
      // TODO : retirer du state la page passée dans l'action
    },
  },
});

export const {addFavoriteAction, removeFavoriteAction} = favoritesSlice.actions;
export default favoritesSlice.reducer;
