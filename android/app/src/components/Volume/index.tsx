import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const VolumeControl = ({
  volume,
  onVolumeChange,
}: {
  volume: number;
  onVolumeChange: (value: number) => void;
}) => {
  return (
    <View style={styles.volumeContainer}>
      {/* <Ionicons name="volume-high" size={24} color="#fff" style={styles.icon} /> */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#b3b3b3"
        thumbTintColor="#1DB954"
        onValueChange={onVolumeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 150, // vertical slider height
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  slider: {
    flex: 1,
    height: 150,
    transform: [{rotate: '-90deg'}], // rotate horizontal slider to vertical
  },
});

export default VolumeControl;
