// Feeds.js (fully optimized + play/pause + first video auto-play + pause on navigate)
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Image,
  Platform,
} from "react-native";
import Video from "react-native-video";
import FastImage from "react-native-fast-image";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import { colors } from "../theme/color";
import { AppText, WHITE, SEMI_BOLD, ELEVEN, FIFTEEN } from "../common/AppText";
import { backIcon, heartIcon, reelLikeIcon, commentIcon, shareIcon, badgeIcon } from "../helper/images";
import { BASE_URL, IMAGE_BASE_URL, shareToAny } from "../helper/utility";
import CommentBox from "../common/CommentBox";
import NavigationService from "../navigation/NavigationService";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike, toggleVote, followUser, unFollowUser } from "../actions/profileAction";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_BAR_HEIGHT = Platform.OS === "ios" ? 90 : 80;

const Feeds = ({ route }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const homePosts = useSelector((state) => state.profile.homePosts);
  const clickedPost = route?.params?.post || homePosts[0];

  const [currentIndex, setCurrentIndex] = useState(
    homePosts.findIndex((p) => p._id === clickedPost._id)
  );
  const [pausedVideos, setPausedVideos] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");

  const refRBSheetComment = useRef();
  const flatListRef = useRef(null);

  // Set first video to play on mount and ensure first video auto-plays
  useEffect(() => {
    const initialPaused = homePosts.reduce((acc, _, idx) => {
      acc[idx] = idx !== currentIndex;
      return acc;
    }, {});
    setPausedVideos(initialPaused);

    setTimeout(() => {
      setPausedVideos((prev) => ({ ...prev, [currentIndex]: false }));
    }, 100);
  }, [homePosts, currentIndex]);

  // Pause/resume videos when navigating away or returning
  useEffect(() => {
    if (!isFocused) {
      // Pause all videos when screen not focused
      setPausedVideos((prev) =>
        Object.keys(prev).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
    } else {
      // Resume current video when coming back
      setPausedVideos((prev) => ({ ...prev, [currentIndex]: false }));
    }
  }, [isFocused, currentIndex]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);

      const newPaused = homePosts.reduce((acc, _, idx) => {
        acc[idx] = idx !== index;
        return acc;
      }, {});
      setPausedVideos(newPaused);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const togglePause = (index) => {
    setPausedVideos((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const postToggleLike = (index) => {
    dispatch(toggleLike(homePosts[index]._id));
    homePosts[index] = {
      ...homePosts[index],
      is_liked_by_you: !homePosts[index].is_liked_by_you,
      totalLikes: homePosts[index].is_liked_by_you
        ? homePosts[index].totalLikes - 1
        : homePosts[index].totalLikes + 1,
    };
  };

  const postToggleVote = (id) => dispatch(toggleVote(id));

  const handleCheckFollow = (item) => {
    if (item.is_followed_by_you) {
      dispatch(unFollowUser(item?.posted_by?._id));
    } else {
      dispatch(followUser(item?.posted_by?._id));
    }
  };

  const openCommentBox = (post) => {
    setAllComments(post.comments || []);
    refRBSheetComment.current?.open();
  };

  const renderItem = ({ item, index }) => (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, backgroundColor: "black" }}>
      {index === currentIndex ? (
        <TouchableWithoutFeedback onPress={() => togglePause(index)}>
          <Video
            source={{ uri: BASE_URL + "public/" + item.video_url }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            resizeMode="cover"
            repeat
            paused={pausedVideos[index] || false}
          />
        </TouchableWithoutFeedback>
      ) : (
        <FastImage
          source={{ uri: IMAGE_BASE_URL + item.thumbnail_url }} // show thumbnail for off-screen videos
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          resizeMode="cover"
        />
      )}

      {/* Overlay */}
      <View style={[styles.overlay, { bottom: TAB_BAR_HEIGHT }]}>
        <View style={styles.leftText}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.username}>@{item.posted_by.username}</Text>
            <TouchableWithoutFeedback onPress={() => handleCheckFollow(item)}>
              <View style={{
                borderWidth: 1,
                borderColor: colors.white,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 5
              }}>
                <AppText color={WHITE} type={ELEVEN} weight={SEMI_BOLD}>
                  {item?.is_followed_by_you ? "Following" : "Follow"}
                </AppText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        <View style={styles.rightButtons}>
          <Image source={{ uri: IMAGE_BASE_URL + item.posted_by.profile_photo }} style={styles.avatar} />

          <TouchableWithoutFeedback onPress={() => postToggleVote(item?._id)}>
            <View style={{ alignItems: "center", marginVertical: 12 }}>
              <FastImage
                source={badgeIcon}
                resizeMode="contain"
                style={[{ width: 30, height: 30 }, styles.icon]}
                tintColor={item?.votedByYou ? colors.yellow : colors.white}
              />
              <AppText color={WHITE} type={FIFTEEN} style={{ marginLeft: 10 }}>
                {item?.totalVote || 0}
              </AppText>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => postToggleLike(index)}>
            <View style={{ alignItems: "center", marginVertical: 12 }}>
              <FastImage
                source={item.is_liked_by_you ? heartIcon : reelLikeIcon}
                style={styles.icon}
                resizeMode="contain"
              />
              <AppText color={WHITE} type={FIFTEEN}>{item.totalLikes}</AppText>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => openCommentBox(item)}>
            <View style={{ alignItems: "center", marginVertical: 12 }}>
              <FastImage source={commentIcon} style={styles.icon} resizeMode="contain" tintColor={colors.white} />
              <AppText color={WHITE} type={FIFTEEN}>{item.totalComments}</AppText>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={shareToAny}>
            <View style={{ alignItems: "center", marginVertical: 12 }}>
              <FastImage source={shareIcon} style={styles.icon} resizeMode="contain" tintColor={colors.white} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => NavigationService.goBack()}>
        <FastImage source={backIcon} style={{ width: 30, height: 30, position: "absolute", top: insets.top + 10, left: 20, zIndex: 20 }} tintColor={colors.white} />
      </TouchableWithoutFeedback>

      <FlatList
        ref={flatListRef}
        data={homePosts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        initialScrollIndex={currentIndex}
        windowSize={2}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        extraData={currentIndex}
      />

      <RBSheet
        ref={refRBSheetComment}
        closeOnDragDown
        closeOnPressMask
        height={350}
        customStyles={{
          container: { backgroundColor: "#D8D8D8", borderTopLeftRadius: 40, borderTopRightRadius: 40 },
        }}
      >
        <CommentBox allComments={allComments} SetComment={setComment} comment={comment} close={() => refRBSheetComment.current?.close()} />
      </RBSheet>
    </View>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  overlay: { position: "absolute", left: 0, right: 0, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, alignItems: "flex-end" },
  leftText: { flex: 1, justifyContent: "flex-end", marginBottom: 20 },
  username: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  caption: { color: "#fff", fontSize: 14, marginTop: 4 },
  rightButtons: { alignItems: "center", marginBottom: 20 },
  icon: { width: 24, height: 24, marginBottom: 4 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#fff", marginBottom: 12 },
});
