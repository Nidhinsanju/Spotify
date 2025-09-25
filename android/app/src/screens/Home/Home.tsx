import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';

const mockPlaylists = [
  {
    id: '1',
    name: 'Top Hits',
    image:
      'https://i.pinimg.com/736x/33/7d/c1/337dc1ab1b75679af5d780604328751a.jpg',
  },
  {
    id: '2',
    name: 'Chill Vibes',
    image:
      'https://i.pinimg.com/236x/22/08/18/2208185ccbc9e39a6662607e0c65a0b6.jpg',
  },
  {
    id: '3',
    name: 'Workout',
    image:
      'https://i.pinimg.com/736x/2f/a5/21/2fa521841c87838ec6005b2df0a485b5.jpg',
  },
  {
    id: '4',
    name: 'Discover Weekly',
    image: 'https://i.scdn.co/image/ab67616d00001e02f06fc429c88fd58835de00ec',
  },
  {
    id: '5',
    name: 'Release Radar',
    image: 'https://i.scdn.co/image/ab67706f0000000299116de269ab3537fd1fd1c3',
  },
];

const mockRecentlyPlayed = [
  {
    id: '1',
    name: 'Daily Mix 1',
    image:
      'https://wallpapers.com/images/thumbnail/compact-cassette-music-aesthetic-d9cca07ejzpawq1x.webp',
  },
  {
    id: '2',
    name: 'Pop Remix',
    image: 'https://i.scdn.co/image/ab67616d00001e02aac384b0f557c3d2734d2ff2',
  },
];

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <FlatList
            data={mockPlaylists}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.playlistCard}>
                <Image
                  source={{uri: item.image}}
                  style={styles.playlistImage}
                />
                <Text style={styles.playlistName} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <FlatList
            data={mockRecentlyPlayed}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.playlistCard}>
                <Image
                  source={{uri: item.image}}
                  style={styles.playlistImage}
                />
                <Text style={styles.playlistName} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
    tintColor: '#fff',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  playlistCard: {
    marginRight: 16,
    width: 120,
    alignItems: 'center',
  },
  playlistImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistName: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Home;
