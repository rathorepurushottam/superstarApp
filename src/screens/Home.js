import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import {
  AppText,
  BLACK,
  FIFTEEN,
  FORTEEN,
  GRY,
  POPPINS_SEMI_BOLD,
} from "../common/AppText";
import { KeyBoardAware } from "../common/KeyBoardAware";
import Header from "../common/Header";
import SearchInput from "../common/SearchInput";
import FastImage from "react-native-fast-image";
import { categoryList } from "../helper/dummy";
import {
  commentIcon,
  feed1Icon,
  feed2Icon,
  feed3Icon,
  heartIcon,
  likeIcon,
  optionIcon,
  shareIcon,
  user1Icon,
  user2Icon,
  user3Icon,
} from "../helper/images";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getHomePosts,
  getPostByCategories,
  getPosts,
  getUserWallet,
  toggleLike,
} from "../actions/profileAction";
import { BASE_URL } from "../helper/utility";
import { colors } from "../theme/color";
import CommentBox from "../common/CommentBox";
import RBSheet from "react-native-raw-bottom-sheet";
import Video from "react-native-video";
import { SpinnerSecond } from "../common/SpinnerSecond";
import { useIsFocused } from "@react-navigation/native";
import NavigationService from "../navigation/NavigationService";
import { VIEW_POST_SCREEN } from "../navigation/routes";

const Home = () => {
  const dispatch = useDispatch();
  const refRBSheetComment = useRef();
  const [isSelect, setIsSelected] = useState("All");
  const [allComments, setAllComments] = useState([]);
  const [comment, SetComment] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const categories = useSelector((state) => {
    return state.profile.categories;
  });
  const homePosts = useSelector((state) => {
    return state.profile.homePosts;
  });
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getHomePosts());
    dispatch(getUserWallet());
  }, []);

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

  const handlePostByCategory = (item) => {
    console.log(item, "item");
    setIsSelected(item?.categoryName);
    if (item?.categoryName == "All") {
      dispatch(getHomePosts());
    } else {
      dispatch(getPostByCategories(item?._id));
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const emptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <AppText
          weight={POPPINS_SEMI_BOLD}
          type={FIFTEEN}
          style={{ color: "#8E5A37" }}
        >
          No Data Available
        </AppText>
      </View>
    );
  };

  // console.log(homePosts, "homePosts");

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "column", alignItems: "center" }}
        onPress={() => handlePostByCategory(item)}
      >
        <View
          style={[
            styles.categoryView,
            {
              backgroundColor:
                isSelect == item?.categoryName ? "#8BFFF9" : "#F9F9F9",
            },
          ]}
        >
          <FastImage
            source={{ uri: BASE_URL + item?.categoryIcon }}
            resizeMode="cover"
            style={{ width: 40, height: 40 }}
          />
        </View>
        <AppText color={BLACK}>{item?.categoryName}</AppText>
      </TouchableOpacity>
    );
  };

  const [visibleVideoIds, setVisibleVideoIds] = useState([]);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    // Only the most visible video should play
    console.log(viewableItems, "viewableItems");
    setVisibleVideoIds(
      viewableItems.length > 0 ? [viewableItems[0].item._id] : []
    );
  }).current;

  const renderPostItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={styles.postView} onPress={() => NavigationService.navigate(VIEW_POST_SCREEN, {post: item})}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 8,
              marginLeft: 15,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FastImage
                source={user1Icon}
                resizeMode="contain"
                style={{ width: 50, height: 50 }}
              />
              <View style={{ marginLeft: 12 }}>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  {item?.posted_by?.firstName} {item?.posted_by?.lastName}
                </AppText>
                <AppText color={BLACK}>{item?.category?.categoryName}</AppText>
              </View>
            </View>

            <FastImage
              source={optionIcon}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </View>
          {/* <FastImage
            source={feed1Icon}
            resizeMode="contain"
            style={styles.postImage}
          /> */}
          {/* <Video
            source={{ uri: BASE_URL + "public/" + item?.video_url }}
            style={styles.postImage}
            controls
            // controlsStyles={{}}
            resizeMode="cover"
          /> */}
          <TouchableWithoutFeedback>
            <Video
              source={{
                uri:
                  BASE_URL +
                  "public/" +
                  (item?.video_url || "").replace(/^\/+/, ""),
              }}
              style={styles.postImage}
              resizeMode="cover"
              // repeat
              paused={!isFocused || !visibleVideoIds.includes(item._id)}
              playInBackground={false}
              playWhenInactive={false}
            />
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                margin: 12,
                flexDirection: "row",
                marginLeft: 15,
              }}
            >
              <TouchableOpacity onPress={() => postToggleLike(item?._id)}>
                <FastImage
                  source={item?.is_liked_by_you ? heartIcon : likeIcon}
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>

              <AppText color={BLACK} type={FIFTEEN} style={{ marginLeft: 10 }}>
                {item?.totalLikes}
              </AppText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => openCommentBox(item)}>
                <FastImage
                  source={commentIcon}
                  resizeMode="contain"
                  style={{ width: 23, height: 23 }}
                />
              </TouchableOpacity>

              <AppText color={BLACK} type={FIFTEEN} style={{ marginLeft: 10 }}>
                {item?.totalComments}
              </AppText>
            </View>
            {/* <FastImage
              source={shareIcon}
              resizeMode="contain"
              style={{ width: 24, height: 24, marginLeft: 20 }}
            /> */}
          </View>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
          <AppText color={BLACK}>{item?.caption}</AppText>
          <AppText
            color={GRY}
            // style={{ textDecorationLine: "underline" }}
          >
            View Comment
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE" }}>
      {/* <KeyBoardAware> */}
      <View style={styles.mainView}>
        <Header />
        <SearchInput />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#D9AF23",
              marginTop: 20,
              alignItems: "center",
              padding: 10,
            }}
            onPress={() => NavigationService.navigate('Contest')}
          >
            <AppText>Tap here to Join Contest and earn money</AppText>
          </TouchableOpacity>
          <AppText
            weight={POPPINS_SEMI_BOLD}
            color={BLACK}
            type={FORTEEN}
            style={{ margin: 20 }}
          >
            Choose Your Category
          </AppText>
          {/* #category */}
          <View style={{ height: 100 }}>
            <FlatList
              data={categories}
              renderItem={renderItem}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={true}
              style={{ height: 90 }} // for debug
            />
          </View>
          <View style={{ flex: 1, marginBottom: 80 }}>
            <FlatList
              data={homePosts}
              renderItem={renderPostItem}
              keyExtractor={(item) => item._id}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              extraData={visibleVideoIds}
              ListEmptyComponent={emptyComponent}
            />
          </View>
        </View>
      </View>
      {/* </KeyBoardAware> */}
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
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  categoryView: {
    borderWidth: 5,
    borderColor: "#BDBDBD4F",
    alignItems: "center",
    // heigth: 90,
    padding: 10,
    width: 70,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  postView: {
    backgroundColor: "#F4F4F4",
    marginHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  postImage: {
    width: "85%",
    height: 250,
    alignSelf: "center",
    borderRadius: 20,
  },
});
