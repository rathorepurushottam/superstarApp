import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import {
  AppText,
  BLACK,
  EIGHTEEN,
  FORTEEN,
  SIXTEEN,
  TWELVE,
} from "../common/AppText";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import {
  addPostIcon,
  feed1Icon,
  feed2Icon,
  feed3Icon,
  user3Icon,
} from "../helper/images";
import NavigationService from "../navigation/NavigationService";
import {
  CREATE_POST_SCREEEN,
  EDIT_PROFILE_SCREEN,
  MORE_MENU_SCREEN,
  VIEW_POST_SCREEN,
} from "../navigation/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts, getUserProfile } from "../actions/profileAction";
import { BASE_URL, IMAGE_BASE_URL } from "../helper/utility";
import Video from "react-native-video";
import { SpinnerSecond } from "../common/SpinnerSecond";

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  const isLoading = useSelector((state) => state.auth.isLoading);

  const posts = useSelector((state) => {
    return state.profile.posts;
  });

  console.log(userData, "userData");

  useEffect(() => {
    dispatch(getUserProfile(true, false));
    dispatch(getPosts());
  }, []);

  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE" }}>
      <KeyBoardAware>
        <View style={styles.mainView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText color={BLACK} type={EIGHTEEN}>
                {userData?.username ? userData?.username : "username_01"}
              </AppText>

              <Icon
                name="chevron-down-outline"
                color={colors.black}
                size={25}
                style={{ marginLeft: 5 }}
              />
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <TouchableOpacity
                onPress={() => NavigationService.navigate(CREATE_POST_SCREEEN)}
              >
                <FastImage
                  source={addPostIcon}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>

              <Icon
                name="menu"
                color={colors.black}
                size={25}
                onPress={() => NavigationService.navigate(MORE_MENU_SCREEN)}
              />
            </View>
          </View>
          <View style={styles.profileView}>
            <FastImage
              source={
                !userData?.profile_photo
                  ? user3Icon
                  : { uri: IMAGE_BASE_URL + userData?.profile_photo }
              }
              resizeMode="contain"
              style={{ width: 70, height: 70, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 20, width: "60%" }}>
              <AppText color={BLACK} type={FORTEEN}>
                {userData?.firstName ? userData?.firstName : "username_01"}
              </AppText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <View>
                  <AppText color={BLACK} type={TWELVE}>
                    {posts?.posts?.length}
                  </AppText>
                  <AppText color={BLACK} type={TWELVE}>
                    Posts
                  </AppText>
                </View>
                <View>
                  <AppText color={BLACK} type={TWELVE}>
                    {posts?.totalFollowers}
                  </AppText>
                  <AppText color={BLACK} type={TWELVE}>
                    Followers
                  </AppText>
                </View>
                <View>
                  <AppText color={BLACK} type={TWELVE}>
                    {posts?.totalFollowings}
                  </AppText>
                  <AppText color={BLACK} type={TWELVE}>
                    Following
                  </AppText>
                </View>
              </View>
            </View>
          </View>
          <AppText color={BLACK} style={{ marginVertical: 10 }}>
            {userData?.bio
              ? userData?.bio
              : " Artistry That Inspire: Supply Your Shelves with...."}
          </AppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => NavigationService.navigate(EDIT_PROFILE_SCREEN)}
            >
              <AppText color={BLACK}>Edit Profile</AppText>
            </TouchableOpacity>
            <View style={styles.optionBox}>
              <AppText color={BLACK}>share Profile</AppText>
            </View>
            <View style={[styles.optionBox, { paddingHorizontal: 8 }]}>
              <Icon
                name="person-add"
                color={colors.black}
                size={20}
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            {/* render posts */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FlatList
                data={posts?.posts}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.item} onPress={() => NavigationService.navigate(VIEW_POST_SCREEN, {post: item})}>
                    <Video
                      source={{ uri: BASE_URL + "public/" + item?.video_url }}
                      style={{ width: "100%", height: 100 }}
                      controls={false}
                      controlsStyles={{ hideSettingButton: true }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </KeyBoardAware>
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },
  profileView: {
    marginVertical: 10,
    flexDirection: "row",
  },
  optionBox: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 6,
  },
  item: {
    flex: 1,
    margin: 6,
    height: 100,
    // backgroundColor: 'red',
    // width: '10%'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
