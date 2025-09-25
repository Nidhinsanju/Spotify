import React from 'react';
import {useColorScheme, View, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppNavigator} from './android/app/src/navigation/AppNavigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.lighter,
    flex: 1,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppNavigator />
    </View>
  );
}

export default App;
