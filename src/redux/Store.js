import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './FavoritesSlice';
import wikiReducer from './WikiSlice';
import {combineReducers} from 'redux';
import storage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  wiki: wikiReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['wiki'], // wiki will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
