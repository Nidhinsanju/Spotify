import React, {useEffect} from 'react';
import {useColorScheme, View, StatusBar, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PushNotification from 'react-native-push-notification';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './android/app/src/navigation/AppNavigator';
import {AuthProvider} from './android/app/src/navigation/AppContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    console.log(Platform.OS, 'this is os');
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id',
          channelName: 'Default Channel',
          importance: 4,
          vibrate: true,
        },
        created => {
          console.log(`createChannel returned '${created}'`);

          // ✅ send local notification after channel is ready
          PushNotification.localNotification({
            channelId: 'default-channel-id',
            title: 'Hello',
            message: 'This is a local notification',
            playSound: true,
            soundName: 'default',
            importance: 4,
            vibrate: true,
          });
        },
      );
    } else {
      // iOS: just send notification
      PushNotification.localNotification({
        title: 'Hello',
        message: 'This is a local notification',
      });
    }

    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}

export default App;
