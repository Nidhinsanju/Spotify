import PushNotification from 'react-native-push-notification';

export const Notification = (
  channelId: string,
  title: string,
  message: string,
) => {
  PushNotification.localNotification({
    channelId: channelId,
    title: title,
    message: message,
  });
};
