import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/redux/Store';
import {TabBar} from './src/Tab';

export default function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <PaperProvider>
            <StatusBar style="auto" />
            <TabBar />
          </PaperProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}
