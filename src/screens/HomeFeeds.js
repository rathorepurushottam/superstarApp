import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import { AppText } from "../common/AppText";
import {
  likeIcon,
  heartIcon,
  commentIcon,
  optionIcon,
  user1Icon,
} from "../helper/images";
import { BASE_URL, IMAGE_BASE_URL } from "../helper/utility";
import { useDispatch } from "react-redux";
import { toggleLike } from "../actions/profileAction";
import NavigationService from "../navigation/NavigationService";
import { VIEW_POST_SCREEN } from "../navigation/routes";
import { useIsFocused } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeFeeds = ({ homePosts, openCommentBox }) => {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const listRef = useRef(null);
  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100,
    waitForInteraction: false,
  });

  const VIDEO_HEIGHT = (SCREEN_WIDTH * 9) / 16; // 16:9 aspect ratio

  // Stop all videos when screen loses focus
  useEffect(() => {
    if (!isFocused) {
      setActiveVideoId(null);
    }
  }, [isFocused]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setActiveVideoId(null);
      setLoadedVideos(new Set());
    };
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visiblePost = viewableItems[0]?.item;
      if (visiblePost?._id) {
        setActiveVideoId(visiblePost._id);
      }
    } else {
      setActiveVideoId(null);
    }
  }).current;

  const handleVideoLoad = useCallback((videoId) => {
    setLoadedVideos((prev) => new Set([...prev, videoId]));
  }, []);

  const handleLikePress = useCallback((postId) => {
    dispatch(toggleLike(postId));
  }, [dispatch]);

  const handleCommentPress = useCallback((item) => {
    openCommentBox(item);
  }, [openCommentBox]);

  const handlePostPress = useCallback((post) => {
    NavigationService.navigate(VIEW_POST_SCREEN, { post });
  }, []);

  const renderPostItem = useCallback(({ item }) => {
    const isActive = isFocused && activeVideoId === item._id;
    const isVideoLoaded = loadedVideos.has(item._id);
    const videoUrl = `${BASE_URL}public/${(item?.video_url || "").replace(/^\/+/, "")}`;

    return (
      <PostItem
        item={item}
        isActive={isActive}
        isVideoLoaded={isVideoLoaded}
        videoUrl={videoUrl}
        VIDEO_HEIGHT={VIDEO_HEIGHT}
        SCREEN_WIDTH={SCREEN_WIDTH}
        onLikePress={handleLikePress}
        onCommentPress={handleCommentPress}
        onPostPress={handlePostPress}
        onVideoLoad={handleVideoLoad}
      />
    );
  }, [isFocused, activeVideoId, loadedVideos, VIDEO_HEIGHT, handleLikePress, handleCommentPress, handlePostPress, handleVideoLoad]);

  const getItemLayout = useCallback((data, index) => ({
    length: VIDEO_HEIGHT + 120, // approximate item height
    offset: (VIDEO_HEIGHT + 120) * index,
    index,
  }), [VIDEO_HEIGHT]);

  return (
    <FlatList
      ref={listRef}
      data={homePosts}
      renderItem={renderPostItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfigRef.current}
      removeClippedSubviews={true}
      maxToRenderPerBatch={3}
      initialNumToRender={2}
      windowSize={5}
      updateCellsBatchingPeriod={100}
      getItemLayout={getItemLayout}
    />
  );
};

// Memoized Post Item Component
const PostItem = memo(({
  item,
  isActive,
  isVideoLoaded,
  videoUrl,
  VIDEO_HEIGHT,
  SCREEN_WIDTH,
  onLikePress,
  onCommentPress,
  onPostPress,
  onVideoLoad,
}) => {
  const [videoError, setVideoError] = useState(false);

  return (
    <View style={styles.postContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPostPress(item)}
        style={styles.touchablePost}
      >
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.userInfo}>
              <FastImage
                source={{ uri: IMAGE_BASE_URL + item?.posted_by?.profile_photo }}
                style={styles.profileImage}
                defaultSource={user1Icon}
                priority={FastImage.priority.normal}
              />
              <View style={styles.userNameContainer}>
                <AppText weight="600">
                  {item?.posted_by?.firstName} {item?.posted_by?.lastName}
                </AppText>
                <AppText>{item?.category?.categoryName}</AppText>
              </View>
            </View>
            <FastImage
              source={optionIcon}
              style={styles.optionIcon}
            />
          </View>

          {/* Video Container with Thumbnail */}
          <View style={styles.videoWrapper}>
            {/* Show thumbnail while video is loading or on error */}
            {(!isVideoLoaded || videoError) && (
              <FastImage
                source={{ uri: videoUrl }}
                style={[styles.videoStyle, { position: 'absolute' }]}
                resizeMode="cover"
              />
            )}
            
            {!videoError && (
              <Video
                key={`video-${item._id}`}
                source={{ uri: videoUrl }}
                style={styles.videoStyle}
                resizeMode="cover"
                repeat
                paused={!isActive}
                playInBackground={false}
                playWhenInactive={false}
                muted={!isActive}
                bufferConfig={{
                  minBufferMs: 2500,
                  maxBufferMs: 5000,
                  bufferForPlaybackMs: 1000,
                  bufferForPlaybackAfterRebufferMs: 1500,
                }}
                onLoad={() => onVideoLoad(item._id)}
                onError={(error) => {
                  console.error('Video error:', error);
                  setVideoError(true);
                }}
                poster={videoUrl}
                posterResizeMode="cover"
              />
            )}

            {/* Overlay to catch touches */}
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              onPress={() => onPostPress(item)}
            />
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => onLikePress(item?._id)}
              style={styles.actionButton}
            >
              <FastImage
                source={item?.likedByYou ? heartIcon : likeIcon}
                style={styles.actionIcon}
              />
              <AppText style={styles.actionText}>{item?.totalLikes || 0}</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onCommentPress(item)}
              style={styles.actionButton}
            >
              <FastImage
                source={commentIcon}
                style={styles.actionIcon}
              />
              <AppText style={styles.actionText}>
                {item?.totalComments || 0}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Caption */}
        <View style={styles.captionContainer}>
          <AppText numberOfLines={2}>{item?.caption}</AppText>
          <AppText style={styles.viewComments}>View Comments</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.item._id === nextProps.item._id &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.isVideoLoaded === nextProps.isVideoLoaded &&
    prevProps.item.likedByYou === nextProps.item.likedByYou &&
    prevProps.item.totalLikes === nextProps.item.totalLikes &&
    prevProps.item.totalComments === nextProps.item.totalComments
  );
});

PostItem.displayName = 'PostItem';

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  touchablePost: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    backgroundColor: "#F4F4F4",
    padding: 10,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userNameContainer: {
    marginLeft: 12,
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  videoWrapper: {
    position: 'relative',
  },
  videoStyle: {
    width: SCREEN_WIDTH - 100,
    height: (SCREEN_WIDTH * 9) / 16,
    alignSelf: "center",
    backgroundColor: '#000',
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  actionText: {
    marginLeft: 10,
  },
  captionContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  viewComments: {
    color: "#888",
    marginTop: 4,
  },
});

export default memo(HomeFeeds);
