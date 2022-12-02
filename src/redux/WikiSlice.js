import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {wikiService} from '../services/WikiService';
import {Logger} from '../utils/LogUtils';

export const searchWikiAction = createAsyncThunk(
  'wiki/search',
  async ({keyword, offset}) => {
    const pages = await wikiService.search(keyword, offset);
    return pages;
  },
);

// Etat initial
const initialState = {
  searchPending: false,
  searchResult: null,
  error: false,
};

// Création du reducer
const wikiSlice = createSlice({
  name: 'wiki',
  initialState,
  reducers: {
    // les reducers standards
    resetWikiSearchAction(state, action) {
      Logger.debug('Reset wiki search');
      return initialState;
    },
  },
  extraReducers: builder => {
    // les reducers asynchrones ou custom
    builder.addCase(searchWikiAction.pending, (state, action) => {
      Logger.debug('Sending request to wikipedia');
      state.searchPending = true;
      state.error = false;
    });
    builder.addCase(searchWikiAction.rejected, (state, action) => {
      Logger.debug('Error from wikipedia' + JSON.stringify(action.error));
      state.searchPending = false;
      state.error = true;
    });
    builder.addCase(searchWikiAction.fulfilled, (state, action) => {
      Logger.debug(`Result fetched from wikipedia : ${action.payload.length}`);
      state.searchPending = false;
      if (state.searchResult === null) {
        state.searchResult = [];
      }
      state.searchResult = state.searchResult.concat(action.payload);
    });
  },
});

export const {resetWikiSearchAction} = wikiSlice.actions;
export default wikiSlice.reducer;
