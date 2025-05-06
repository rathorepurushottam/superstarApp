import { FlatList, StyleSheet, View } from "react-native";
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
  likeIcon,
  optionIcon,
  shareIcon,
  user1Icon,
  user2Icon,
  user3Icon,
} from "../helper/images";

const renderItem = ({ item }) => {
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <View
        style={[
          styles.categoryView,
          { backgroundColor: item?.backgroundColor },
        ]}
      >
        <FastImage
          source={item?.image}
          resizeMode="cover"
          style={{ width: 40, height: 40 }}
        />
      </View>
      <AppText color={BLACK}>{item?.label}</AppText>
    </View>
  );
};

const Home = () => {
  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE" }}>
      <KeyBoardAware>
        <View style={styles.mainView}>
          <Header />
          <SearchInput />
          <View>
            <AppText
              weight={POPPINS_SEMI_BOLD}
              color={BLACK}
              type={FORTEEN}
              style={{ margin: 20 }}
            >
              Choose Your Category
            </AppText>
            <FlatList
              data={categoryList}
              renderItem={renderItem}
              horizontal
              style={{alignSelf: "center"}}
              keyExtractor={(item) => item.id}
            />
            <View style={{ marginBottom: 80 }}>
              <View>
                <View style={styles.postView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 8,
                      marginLeft: 15,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FastImage
                        source={user1Icon}
                        resizeMode="contain"
                        style={{ width: 50, height: 50 }}
                      />
                      <View style={{ marginLeft: 12 }}>
                        <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                          Jiya Sharma
                        </AppText>
                        <AppText color={BLACK}>dancing</AppText>
                      </View>
                    </View>

                    <FastImage
                      source={optionIcon}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                  <FastImage
                    source={feed1Icon}
                    resizeMode="contain"
                    style={styles.postImage}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        margin: 12,
                        flexDirection: "row",
                        marginLeft: 15,
                      }}
                    >
                      <FastImage
                        source={likeIcon}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                      />
                      <AppText
                        color={BLACK}
                        type={FIFTEEN}
                        style={{ marginLeft: 10 }}
                      >
                        24
                      </AppText>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <FastImage
                        source={commentIcon}
                        resizeMode="contain"
                        style={{ width: 23, height: 23 }}
                      />
                      <AppText
                        color={BLACK}
                        type={FIFTEEN}
                        style={{ marginLeft: 10 }}
                      >
                        24
                      </AppText>
                    </View>
                    <FastImage
                      source={shareIcon}
                      resizeMode="contain"
                      style={{ width: 24, height: 24, marginLeft: 20 }}
                    />
                  </View>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <AppText color={BLACK}>
                    it is a long established fact that a reader will be
                    distracted by the readable content..
                  </AppText>
                  <AppText
                    color={GRY}
                    style={{ textDecorationLine: "underline" }}
                  >
                    View Comment
                  </AppText>
                </View>
              </View>
              <View>
                <View style={styles.postView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 8,
                      marginLeft: 15,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FastImage
                        source={user2Icon}
                        resizeMode="contain"
                        style={{ width: 50, height: 50 }}
                      />
                      <View style={{ marginLeft: 12 }}>
                        <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                          Jiya Sharma
                        </AppText>
                        <AppText color={BLACK}>singing</AppText>
                      </View>
                    </View>

                    <FastImage
                      source={optionIcon}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                  <FastImage
                    source={feed2Icon}
                    resizeMode="contain"
                    style={styles.postImage}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        margin: 12,
                        flexDirection: "row",
                        marginLeft: 15,
                      }}
                    >
                      <FastImage
                        source={likeIcon}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                      />
                      <AppText
                        color={BLACK}
                        type={FIFTEEN}
                        style={{ marginLeft: 10 }}
                      >
                        24
                      </AppText>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <FastImage
                        source={commentIcon}
                        resizeMode="contain"
                        style={{ width: 23, height: 23 }}
                      />
                      <AppText
                        color={BLACK}
                        type={FIFTEEN}
                        style={{ marginLeft: 10 }}
                      >
                        24
                      </AppText>
                    </View>
                    <FastImage
                      source={shareIcon}
                      resizeMode="contain"
                      style={{ width: 24, height: 24, marginLeft: 20 }}
                    />
                  </View>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <AppText color={BLACK}>
                    it is a long established fact that a reader will be
                    distracted by the readable content..
                  </AppText>
                  <AppText
                    color={GRY}
                    style={{ textDecorationLine: "underline" }}
                  >
                    View Comment
                  </AppText>
                </View>
              </View>
              <View>
                <View style={styles.postView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 8,
                      marginLeft: 15,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FastImage
                        source={user3Icon}
                        resizeMode="contain"
                        style={{ width: 50, height: 50 }}
                      />
                      <View style={{ marginLeft: 12 }}>
                        <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                          Jiya Sharma
                        </AppText>
                        <AppText color={BLACK}>acting</AppText>
                      </View>
                    </View>

                    <FastImage
                      source={optionIcon}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                  <FastImage
                    source={feed3Icon}
                    resizeMode="contain"
                    style={styles.postImage}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        margin: 12,
                        flexDirection: "row",
                        marginLeft: 15,
                      }}
                    >
                      <FastImage
                        source={likeIcon}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                      />
                      <AppText
                        color={BLACK}
                        type={FIFTEEN}
                        style={{ marginLeft: 10 }}
                      >
                        24
                      </AppText>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <FastImage
                        source={commentIcon}
                        resizeMode="contain"
                        style={{ width: 23, height: 23 }}
                      />
                      <AppText
                        color={BLACK}
                        type={FIFTEEN}
                        style={{ marginLeft: 10 }}
                      >
                        24
                      </AppText>
                    </View>
                    <FastImage
                      source={shareIcon}
                      resizeMode="contain"
                      style={{ width: 24, height: 24, marginLeft: 20 }}
                    />
                  </View>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <AppText color={BLACK}>
                    it is a long established fact that a reader will be
                    distracted by the readable content..
                  </AppText>
                  <AppText
                    color={GRY}
                    style={{ textDecorationLine: "underline" }}
                  >
                    View Comment
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyBoardAware>
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
    width: 400,
    height: 250,
    alignSelf: "center",
    borderRadius: 20,
  },
});
