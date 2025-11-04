import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { AppText, BLACK, EIGHTEEN, FORTEEN, TWELVE } from "../common/AppText";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import NavigationService from "../navigation/NavigationService";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserProfile, deletePost } from "../actions/profileAction";
import {
  BASE_URL,
  IMAGE_BASE_URL,
  shareProfile,
  shareToAny,
} from "../helper/utility";
import {
  addFriend,
  addPostIcon,
  backIcon,
  moreIcon,
  user3Icon,
} from "../helper/images";
import {
  CREATE_POST_SCREEEN,
  EDIT_PROFILE_SCREEN,
  MORE_MENU_SCREEN,
  VIEW_POST_SCREEN,
} from "../navigation/routes";
import { SpinnerSecond } from "../common/SpinnerSecond";

const { width } = Dimensions.get("window");
const VIDEO_SIZE = (width - 40 - 12) / 3; // 3 videos per row with margins

const Profile = () => {
  const dispatch = useDispatch();
  const longPressTimer = useRef(null);
  const isLongPress = useRef(false);

  const userData = useSelector((state) => state.profile.userData);
  const posts = useSelector((state) => state.profile.posts);
  const isLoading = useSelector((state) => state.auth.isLoading);
  
  const [longPressingItem, setLongPressingItem] = useState(null);

  useEffect(() => {
    dispatch(getUserProfile(true, false));
    dispatch(getPosts());

    // Cleanup timer on unmount
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  const handlePressIn = (item) => {
    isLongPress.current = false;
    setLongPressingItem(item._id); // Set the item being pressed
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setLongPressingItem(null); // Remove the effect when alert shows
      showDeleteAlert(item);
    }, 2000); // 2 seconds
  };

  const handlePressOut = () => {
    setLongPressingItem(null); // Remove the effect when released
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handlePress = (item, index) => {
    // Only navigate if it wasn't a long press
    if (!isLongPress.current) {
      NavigationService.navigate(VIEW_POST_SCREEN, { 
        post: item,
        posts: posts?.posts,
        postIndex: index,
        source: 'profile'
      });
    }
    // Reset the flag
    isLongPress.current = false;
  };

  const showDeleteAlert = (item) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeletePost(item),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeletePost = (item) => {
    dispatch(deletePost(item?._id));
  };

  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE", flex: 1 }}>
      {/* <KeyBoardAware> */}
      <View style={styles.mainView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <AppText color={BLACK} type={EIGHTEEN}>
              {userData?.username || "username_01"}
            </AppText>
            {/* <TouchableOpacity onPress={() => NavigationService.goBack()}>
                <FastImage
                  source={backIcon}
                  resizeMode="contain"
                  style={styles.backButton}
                />
              </TouchableOpacity> */}
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate(CREATE_POST_SCREEEN)}
            >
              <FastImage
                source={addPostIcon}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => NavigationService.navigate(MORE_MENU_SCREEN)}
            >
              <FastImage
                source={moreIcon}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileView}>
          <FastImage
            source={
              !userData?.profile_photo
                ? user3Icon
                : { uri: IMAGE_BASE_URL + userData?.profile_photo }
            }
            resizeMode="cover"
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <AppText color={BLACK} type={FORTEEN}>
              {userData?.firstName || "username_01"}
            </AppText>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <AppText color={BLACK} type={TWELVE}>
                  {posts?.posts?.length || 0}
                </AppText>
                <AppText color={BLACK} type={TWELVE}>
                  Posts
                </AppText>
              </View>
              <View style={styles.statBox}>
                <AppText color={BLACK} type={TWELVE}>
                  {posts?.totalFollowers || 0}
                </AppText>
                <AppText color={BLACK} type={TWELVE}>
                  Followers
                </AppText>
              </View>
              <View style={styles.statBox}>
                <AppText color={BLACK} type={TWELVE}>
                  {posts?.totalFollowings || 0}
                </AppText>
                <AppText color={BLACK} type={TWELVE}>
                  Following
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Bio */}
        <AppText color={BLACK} style={{ marginVertical: 10 }}>
          {userData?.bio ||
            "Artistry That Inspire: Supply Your Shelves with...."}
        </AppText>

        {/* Profile Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => NavigationService.navigate(EDIT_PROFILE_SCREEN)}
          >
            <AppText color={BLACK}>Edit Profile</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} onPress={shareProfile}>
            <AppText color={BLACK}>Share Profile</AppText>
          </TouchableOpacity>
        </View>

        {/* Video Grid */}
        <FlatList
          data={posts?.posts || []}
          keyExtractor={(item) => item._id}
          numColumns={3}
          // columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item, index }) => {
            const isBeingPressed = longPressingItem === item._id;
            return (
              <View style={[
                styles.item,
                isBeingPressed && styles.itemPressed
              ]}>
                <Video
                  source={{ uri: BASE_URL + "public/" + item?.video_url }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  repeat
                  paused={true} // video stays paused
                />

                {/* Long press visual overlay */}
                {isBeingPressed && (
                  <View style={styles.longPressOverlay} />
                )}

                {/* Overlay to catch touches */}
                <Pressable
                  style={StyleSheet.absoluteFill}
                  onPress={() => handlePress(item, index)}
                  onPressIn={() => handlePressIn(item)}
                  onPressOut={handlePressOut}
                />
              </View>
            );
          }}
        />
      </View>
      {/* </KeyBoardAware> */}
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainView: { flex: 1, marginHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 15 },
  backButton: { width: 25, height: 25 },
  icon: { width: 20, height: 20 },
  profileView: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: { width: 70, height: 70, borderRadius: 35 },
  profileDetails: { flex: 1, marginLeft: 15 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  statBox: { alignItems: "center" },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  optionBox: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 6,
  },
  item: {
    flexBasis: VIDEO_SIZE,
    margin: 6,
    height: VIDEO_SIZE,
    borderRadius: 8,
    overflow: "hidden",
  },
  itemPressed: {
    borderWidth: 3,
    borderColor: "#fd5c63",
    transform: [{ scale: 0.95 }],
  },
  longPressOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(253, 92, 99, 0.3)",
    zIndex: 1,
  },
});
