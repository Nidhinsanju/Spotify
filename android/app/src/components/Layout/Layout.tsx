import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

interface LayoutProps {
  children: React.ReactNode;
}

const profileImage =
  'https://www.cielhr.com/wp-content/uploads/2020/10/dummy-image.jpg'; // Placeholder

const Layout: React.FC<LayoutProps> = ({children}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-MENU_WIDTH)).current;

  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -MENU_WIDTH,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setMenuOpen(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hamburger & Profile */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu} style={styles.profileButton}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Hamburger Menu */}
      {menuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeMenu}>
          <Animated.View style={[styles.menu, {left: slideAnim}]}>
            <View style={styles.menuHeader}>
              <Image
                source={{uri: profileImage}}
                style={styles.menuProfileImage}
              />
              <Text style={styles.menuProfileName}>User Name</Text>
            </View>
            <View style={styles.menuItems}>
              <Text style={styles.menuItem}>Home</Text>
              <Text style={styles.menuItem}>Your Library</Text>
              <Text style={styles.menuItem}>Settings</Text>
              <Text style={styles.menuItem}>Log out</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}

      {/* Main Content */}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#121212',
    marginTop: 50,
  },
  profileButton: {
    marginRight: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#1DB954',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: '#181818',
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 11,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  menuProfileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#1DB954',
    marginBottom: 10,
  },
  menuProfileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  menuItems: {
    marginTop: 10,
  },
  menuItem: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  content: {
    flex: 1,
  },
});

export default Layout;
