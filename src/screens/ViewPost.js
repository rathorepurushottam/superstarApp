import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import Video from "react-native-video";
import FastImage from "react-native-fast-image";
import { useSelector, useDispatch } from "react-redux";
import {
  followUser,
  toggleLike,
  toggleVote,
  unFollowUser,
} from "../actions/profileAction";
import { BASE_URL, IMAGE_BASE_URL, shareToAny } from "../helper/utility";
import {
  backIcon,
  badgeIcon,
  commentIcon,
  heartIcon,
  reelLikeIcon,
  shareIcon,
} from "../helper/images";
import {
  AppText,
  ELEVEN,
  FIFTEEN,
  SEMI_BOLD,
  TEN,
  WHITE,
} from "../common/AppText";
import CommentBox from "../common/CommentBox";
import RBSheet from "react-native-raw-bottom-sheet";
import { colors } from "../theme/color";
import NavigationService from "../navigation/NavigationService";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

const ViewPost = ({ route }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userData);
  const homePosts = useSelector((state) => state.profile.homePosts);

  // Get data from route params or use homePosts as default
  const source = route?.params?.source || 'home';
  const postsData = route?.params?.posts || homePosts;
  const initialIndex = route?.params?.postIndex ?? 0;
  const clickedPost = route?.params?.post || postsData[0];
  
  const refRBSheetComment = useRef();
  const insets = useSafeAreaInsets();
  const videoHeight = height - insets.top - insets.bottom;

  const [pausedVideos, setPausedVideos] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");

  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(
    source === 'profile' 
      ? initialIndex 
      : postsData.findIndex((p) => p._id === clickedPost._id)
  );

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const togglePause = (index) => {
    setPausedVideos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const postToggleLike = (index) => {
    dispatch(toggleLike(postsData[index]._id));
    postsData[index] = {
      ...postsData[index],
      is_liked_by_you: !postsData[index].is_liked_by_you,
      totalLikes: postsData[index].is_liked_by_you
        ? postsData[index].totalLikes - 1
        : postsData[index].totalLikes + 1,
    };
    setPausedVideos({ ...pausedVideos });
  };

  const openCommentBox = (post) => {
    setAllComments(post.comments || []);
    refRBSheetComment.current?.open();
  };

  const handleAddComment = (newComment) => {
    setAllComments((prev) => [...prev, newComment]);
    postsData[currentVisibleIndex].totalComments += 1;
    setPausedVideos({ ...pausedVideos });
  };

  const handleCheckFollow = (item) => {
    console.log("handleCheckFollow", item?.is_followed_by_you);
    if (item.is_followed_by_you) {
      dispatch(unFollowUser(item?.posted_by?._id));
    } else {
      dispatch(followUser(item?.posted_by?._id));
    }
  };

  const postToggleVote = (id) => {
    dispatch(toggleVote(id));
  };

  const renderItem = ({ item, index }) => (
    <View
      style={{ width: width, height: videoHeight, backgroundColor: "black" }}
    >
      <TouchableWithoutFeedback onPress={() => togglePause(index)}>
        <Video
          source={{ uri: BASE_URL + "public/" + item.video_url }}
          style={{ width: width, height: videoHeight }}
          resizeMode="cover"
          repeat
          paused={pausedVideos[index] || currentVisibleIndex !== index}
        />
      </TouchableWithoutFeedback>

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.leftText}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.username}>@{item?.posted_by?.username}</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.white,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 5,
              }}
              onPress={() => handleCheckFollow(item)}
            >
              <AppText color={WHITE} type={ELEVEN} weight={SEMI_BOLD}>
                {item?.is_followed_by_you ? "Following" : "Follow"}
              </AppText>
            </TouchableOpacity>
          </View>

          <Text style={styles.caption}>{item?.caption}</Text>
        </View>

        <View style={styles.rightButtons}>
          <Image
            source={{ uri: IMAGE_BASE_URL + item?.posted_by?.profile_photo }}
            style={styles.avatar}
          />

          <TouchableOpacity onPress={() => postToggleVote(item?._id)}>
            <FastImage
              source={badgeIcon}
              resizeMode="contain"
              style={[{ width: 30, height: 30 }, styles.icon]}
              tintColor={item?.votedByYou ? colors.yellow : colors.white}
            />
            <AppText color={WHITE} type={FIFTEEN} style={{ marginLeft: 10 }}>
              {item?.totalVote || 0}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => postToggleLike(index)}
            style={styles.iconButton}
          >
            <FastImage
              source={item?.is_liked_by_you ? heartIcon : reelLikeIcon}
              style={styles.icon}
              resizeMode="contain"
            />
            <AppText color={WHITE} type={FIFTEEN}>
              {item?.totalLikes}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openCommentBox(item)}
            style={styles.iconButton}
          >
            <FastImage
              source={commentIcon}
              style={styles.icon}
              resizeMode="contain"
              tintColor={colors.white}
            />
            <AppText color={WHITE} type={FIFTEEN}>
              {item?.totalComments}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity onPress={shareToAny} style={styles.iconButton}>
            <FastImage
              source={shareIcon}
              style={styles.icon}
              resizeMode="contain"
              tintColor={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      {/* Floating Back Button */}
      <TouchableOpacity
        onPress={() => NavigationService.goBack()}
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 20,
          zIndex: 20,
        }}
      >
        <FastImage
          source={backIcon}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
          tintColor={colors.white}
        />
      </TouchableOpacity>

      <FlatList
        data={postsData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        initialScrollIndex={currentVisibleIndex >= 0 ? currentVisibleIndex : 0}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => ({
          length: videoHeight,
          offset: videoHeight * index,
          index,
        })}
      />

      {/* Comment Sheet */}
      <RBSheet
        ref={refRBSheetComment}
        closeOnDragDown
        height={350}
        customStyles={{
          container: {
            backgroundColor: "#D8D8D8",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: { backgroundColor: "transparent", display: "none" },
        }}
      >
        <CommentBox
          allComments={allComments}
          SetComment={setComment}
          comment={comment}
          close={() => refRBSheetComment.current?.close()}
          onAddComment={handleAddComment}
        />
      </RBSheet>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 40,
    alignItems: "flex-end",
  },
  leftText: { flex: 1, justifyContent: "flex-end", marginBottom: 20 },
  username: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  caption: { color: "#fff", fontSize: 14, marginTop: 4 },
  rightButtons: { alignItems: "center", marginBottom: 20 },
  iconButton: { alignItems: "center", marginVertical: 12 },
  icon: { width: 24, height: 24, marginBottom: 4 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 12,
  },
});

export default ViewPost;
