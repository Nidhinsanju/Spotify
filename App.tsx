import React, {useEffect} from 'react';
import {useColorScheme, View, StatusBar, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppNavigator} from './android/app/src/navigation/AppNavigator';
import PushNotification from 'react-native-push-notification';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    // Create channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id',
          channelName: 'Default Channel',
          importance: 4,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }

    // Configure push notifications
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // Send a local notification
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: 'Hello',
      message: 'This is a local notification',
    });
  }, []); // empty dependency array = run once on mount

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
