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
      // Ajouter au state la page passée dans l'action
      state.pages.push(page);
    },
    removeFavoriteAction(state, action) {
      const page = action.payload;
      Logger.debug(`Removing page ${page.pageid} from favorite`);
      // Retirer du state la page passée dans l'action
      state.pages = state.pages.filter(p => p.pageid !== page.pageid);
    },
  },
});

export const {addFavoriteAction, removeFavoriteAction} = favoritesSlice.actions;
export default favoritesSlice.reducer;
