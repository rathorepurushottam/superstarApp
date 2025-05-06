import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { reel1, reel2, reel3, reel4 } from '../helper/videos';

const { height, width } = Dimensions.get('window');

const videoList = [
  {
    id: '1',
    uri: reel1,
    user: 'john_doe',
    caption: 'City Lights Vibes',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    uri: reel2,
    user: 'jane_smith',
    caption: 'Nature is healing 🌿',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    uri: reel3,
    user: 'jane_smith',
    caption: 'Nature is healing 🌿',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '4',
    uri: reel4,
    user: 'jane_smith',
    caption: 'Nature is healing 🌿',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

const ReelsScreen = () => {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    !focused ? setIsPaused(true) : setIsPaused(false); 
  }, [focused]);

  

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
      setIsPaused(false); // Auto-play on scroll
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 90 });

  const togglePause = (index) => {
    if (index === currentVisibleIndex) {
      setIsPaused((prev) => !prev);
    }
  };

  const renderItem = ({ item, index }) => (
    <SafeAreaView style={styles.videoContainer}>
      <TouchableWithoutFeedback onPress={() => togglePause(index)}>
        <Video
          source={item.uri}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          repeat
          paused={index !== currentVisibleIndex || isPaused}
        />
      </TouchableWithoutFeedback>

      <View style={styles.overlay}>
        <View style={styles.leftText}>
          <Text style={styles.username}>@{item.user}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        <View style={styles.rightButtons}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Icon name="heart-outline" size={30} color="#fff" style={styles.icon} />
          <Icon name="chatbubble-outline" size={30} color="#fff" style={styles.icon} />
          <Icon name="arrow-redo-outline" size={30} color="#fff" style={styles.icon} />
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <FlatList
      data={videoList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef.current}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    width,
    backgroundColor: 'black',
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 80, // visible above tab bar
    alignItems: 'flex-end',
  },
  leftText: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  rightButtons: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  caption: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
  },
  icon: {
    marginVertical: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 12,
  },
});

export default ReelsScreen;
