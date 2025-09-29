declare module 'react-native-push-notification' {
  type PushNotificationObject = {
    id?: string;
    channelId?: string;
    title?: string;
    message: string;
    bigText?: string;
    playSound?: boolean;
    soundName?: string;
    vibrate?: boolean;
    vibration?: number;
    smallIcon?: string;
    largeIcon?: string;
    [key: string]: any;
  };

  export function configure(options: {
    onNotification?: (notification: any) => void;
    requestPermissions?: boolean;
  }): void;

  export function createChannel(
    channel: {
      channelId: string;
      channelName: string;
      importance?: number;
      vibrate?: boolean;
    },
    callback?: (created: boolean) => void,
  ): void;

  export function localNotification(notification: PushNotificationObject): void;
  export function localNotificationSchedule(
    notification: PushNotificationObject & {date: Date},
  ): void;
}
