import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { reel1, reel2, reel3, reel4 } from "../helper/videos";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, IMAGE_BASE_URL } from "../helper/utility";
import { toggleLike } from "../actions/profileAction";
import FastImage from "react-native-fast-image";
import { backIcon, heartIcon, likeIcon, reelLikeIcon } from "../helper/images";
import { AppText, FIFTEEN, WHITE } from "../common/AppText";
import CommentBox from "../common/CommentBox";
import { colors } from "../theme/color";
import NavigationService from "../navigation/NavigationService";

const { height, width } = Dimensions.get("window");

const videoList = [
  {
    id: "1",
    uri: reel1,
    user: "john_doe",
    caption: "City Lights Vibes",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    uri: reel2,
    user: "jane_smith",
    caption: "Nature is healing 🌿",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    uri: reel3,
    user: "jane_smith",
    caption: "Nature is healing 🌿",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "4",
    uri: reel4,
    user: "jane_smith",
    caption: "Nature is healing 🌿",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const ViewPost = () => {
  const route = useRoute();
  let item = route?.params?.post;

  console.log(route?.params?.post, "route");
  console.log(userData, "userData");
  //   const dispatch = useDispatch();
  const refRBSheetComment = useRef();
  const [allComments, setAllComments] = useState([]);
  const [comment, SetComment] = useState("");
  //   const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  //   const focused = useIsFocused();
  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  //   const homePosts = useSelector((state) => {
  //     return state.profile.homePosts;
  //   });

  //   console.log(homePosts, "homePosts");

  //   useEffect(() => {
  //     !focused ? setIsPaused(true) : setIsPaused(false);
  //   }, [focused]);

  const postToggleLike = (id) => {
    dispatch(toggleLike(id));
  };

  const openCommentBox = (item) => {
    setAllComments(item);
    refRBSheetComment?.current?.open();
  };

  const closeCommentBox = () => {
    refRBSheetComment?.current?.close();
  };

  //   const onViewableItemsChanged = useRef(({ viewableItems }) => {
  //     if (viewableItems.length > 0) {
  //       setCurrentVisibleIndex(viewableItems[0].index);
  //       setIsPaused(false); // Auto-play on scroll
  //     }
  //   }).current;

  //   const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 90 });

  const togglePause = (index) => {
    if (index === currentVisibleIndex) {
      setIsPaused((prev) => !prev);
    }
  };

  //   const renderItem = ({ item, index }) => (
  //     <SafeAreaView style={styles.videoContainer}>
  //       <TouchableWithoutFeedback onPress={() => togglePause(index)}>
  //         <Video
  //           source={{ uri: BASE_URL + "public/" + item?.video_url }}
  //           style={StyleSheet.absoluteFillObject}
  //           resizeMode="cover"
  //           repeat
  //           paused={index !== currentVisibleIndex || isPaused}
  //         />
  //       </TouchableWithoutFeedback>

  //       <View style={styles.overlay}>
  //         <View style={styles.leftText}>
  //           <Text style={styles.username}>@{item?.posted_by?.username}</Text>
  //           <Text style={styles.caption}>{item.caption}</Text>
  //         </View>

  //         <View style={styles.rightButtons}>
  //           <Image
  //             source={{ uri: IMAGE_BASE_URL + item?.posted_by?.profile_photo }}
  //             style={styles.avatar}
  //           />
  //           <TouchableOpacity onPress={() => postToggleLike(item?._id)}>
  //             <FastImage
  //               source={item?.is_liked_by_you ? heartIcon : reelLikeIcon}
  //               resizeMode="contain"
  //               style={[{ width: 24, height: 24 }, styles.icon]}
  //               // tintColor={'white'}
  //             />
  //            <AppText color={WHITE} type={FIFTEEN} style={{ marginLeft: 10 }}>
  //                 {item?.totalLikes}
  //               </AppText>
  //           </TouchableOpacity>
  //           <TouchableOpacity onPress={() => openCommentBox(item)}>
  //           <Icon
  //             name="chatbubble-outline"
  //             size={30}
  //             color="#fff"
  //             style={styles.icon}
  //           />
  //            <AppText color={WHITE} type={FIFTEEN} style={{ marginLeft: 10 }}>
  //                 {item?.totalComments}
  //               </AppText>
  //           </TouchableOpacity>

  //           {/* <Icon name="heart-outline" size={30} color="#fff" style={styles.icon} onPress={() => postToggleLike(item?._id)}/> */}

  //           <Icon
  //             name="arrow-redo-outline"
  //             size={30}
  //             color="#fff"
  //             style={styles.icon}
  //           />
  //         </View>
  //       </View>
  //       <RBSheet
  //         ref={refRBSheetComment}
  //         closeOnDragDown={true}
  //         height={350}
  //         customStyles={{
  //           container: {
  //             backgroundColor: '#D8D8D8',
  //             borderTopLeftRadius: 40,
  //             borderTopRightRadius: 40,
  //           },
  //           draggableIcon: {
  //             backgroundColor: "transparent",
  //             display: "none",
  //           },
  //         }}
  //       >
  //         <CommentBox allComments={allComments} SetComment={SetComment} comment={comment} close={closeCommentBox}/>
  //       </RBSheet>
  //     </SafeAreaView>
  //   );

  //   return (
  // <FlatList
  //   data={homePosts}
  //   renderItem={renderItem}
  //   keyExtractor={(item) => item.id}
  //   pagingEnabled
  //   horizontal={false}
  //   showsVerticalScrollIndicator={false}
  //   onViewableItemsChanged={onViewableItemsChanged}
  //   viewabilityConfig={viewConfigRef.current}
  // />
  //   );

  return (
    <SafeAreaView style={styles.videoContainer}>
      <TouchableWithoutFeedback>
        <Video
          source={{ uri: BASE_URL + "public/" + item?.video_url }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          repeat
          //   paused={index !== currentVisibleIndex || isPaused}
        />
      </TouchableWithoutFeedback>

      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={{ position: "absolute", top: 10, margin: 10 }}
        >
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
            tintColor={colors.black}
          />
        </TouchableOpacity>

        <View style={styles.leftText}>
          <Text style={styles.username}>@{userData?.username}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        <View style={styles.rightButtons}>
          <Image
            source={{ uri: IMAGE_BASE_URL + userData?.profile_photo }}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={() => postToggleLike(item?._id)}>
            <FastImage
              source={item?.is_liked_by_you ? heartIcon : reelLikeIcon}
              resizeMode="contain"
              style={[{ width: 24, height: 24 }, styles.icon]}
              // tintColor={'white'}
            />
            <AppText color={WHITE} type={FIFTEEN} style={{ marginLeft: 10 }}>
              {item?.totalLikes}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openCommentBox(item)}>
            <Icon
              name="chatbubble-outline"
              size={30}
              color="#fff"
              style={styles.icon}
            />
            <AppText color={WHITE} type={FIFTEEN} style={{ marginLeft: 10 }}>
              {item?.totalComments}
            </AppText>
          </TouchableOpacity>

          {/* <Icon name="heart-outline" size={30} color="#fff" style={styles.icon} onPress={() => postToggleLike(item?._id)}/> */}

          <Icon
            name="arrow-redo-outline"
            size={30}
            color="#fff"
            style={styles.icon}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheetComment}
        closeOnDragDown={true}
        height={350}
        customStyles={{
          container: {
            backgroundColor: "#D8D8D8",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <CommentBox
          allComments={allComments}
          SetComment={SetComment}
          comment={comment}
          close={closeCommentBox}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    width,
    backgroundColor: "black",
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 80, // visible above tab bar
    alignItems: "flex-end",
  },
  leftText: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  rightButtons: {
    alignItems: "center",
    marginBottom: 20,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  caption: {
    color: "#fff",
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
    borderColor: "#fff",
    borderWidth: 2,
    marginBottom: 12,
  },
});

export default ViewPost;
