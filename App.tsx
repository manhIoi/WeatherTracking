/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Root from './src/navigation/Root';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default App;
