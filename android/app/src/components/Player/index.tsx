import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import VolumeControl from '../Volume';

interface Song {
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string; // URL or local file path
}

interface PlayerProps {
  songs: Song[]; // playlist of songs
  onPlayPause?: (isPlaying: boolean) => void;
}

const Player: React.FC<PlayerProps> = ({songs, onPlayPause}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume 100%
  const soundRef = useRef<Sound | null>(null);
  const intervalRef = useRef<number | null>(null);

  const currentSong = songs[currentIndex];

  // Load song
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.release();
      intervalRef.current && clearInterval(intervalRef.current);
    }

    Sound.setCategory('Playback');
    const sound = new Sound(currentSong.audioSrc, undefined, error => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      setDuration(sound.getDuration());
      sound.setVolume(volume); // Set initial volume
    });

    soundRef.current = sound;
    setPosition(0);
    setIsPlaying(false);

    return () => {
      sound.release();
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [currentSong]);

  // Update volume when changed
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setVolume(volume);
    }
  }, [volume]);

  // Play / Pause
  const handlePlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      onPlayPause?.(false);
    } else {
      soundRef.current.play(success => {
        if (success) handleNext();
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        onPlayPause?.(false);
      });
      setIsPlaying(true);

      intervalRef.current = setInterval(() => {
        soundRef.current?.getCurrentTime(seconds => setPosition(seconds));
      }, 500) as unknown as number;
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
  };

  const handleSliderChange = (value: number) => {
    if (soundRef.current) {
      soundRef.current.setCurrentTime(value);
      setPosition(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value); // volume is 0 - 1
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Image source={{uri: currentSong.albumArt}} style={styles.albumArt} />
        <Text style={styles.title}>{currentSong.title}</Text>
        <Text style={styles.artist}>{currentSong.artist}</Text>

        {/* Playback Slider */}
        <Slider
          style={{width: '100%', height: 30}}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#b3b3b3"
          thumbTintColor="#1DB954"
          onValueChange={handleSliderChange}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.controlsBox}>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={handlePrevious}
              style={styles.controlButton}>
              <Text style={styles.icon}>⏮️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.controlButton}>
              <Text style={styles.icon}>{isPlaying ? '⏸️' : '▶️'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
              <Text style={styles.icon}>⏭️</Text>
            </TouchableOpacity>
            {/* Volume Slider */}
          </View>
        </View>
      </View>
      {/* Controls */}
    </View>
  );
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  albumArt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 4,
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
  },
  controlsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
  },

  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  artist: {
    fontSize: 14,
    color: '#b3b3b3',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    maxWidth: 200,
  },
  controlButton: {
    paddingHorizontal: 12,
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Player;
