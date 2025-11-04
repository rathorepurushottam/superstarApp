import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import FastImage from "react-native-fast-image";
import {
  backIcon,
  bronseIcon,
  calenderIcon,
  danceIcon,
  downIcon,
  firstPrizeIcon,
  silverWinIcon,
  timeIcon,
  upIcon,
  user1Icon,
  Win1stIcon,
} from "../helper/images";
import { colors } from "../theme/color";
import {
  AppText,
  BLACK,
  ELEVEN,
  FIFTEEN,
  FORTEEN,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  SEMI_BOLD,
  SIXTEEN,
  THIRTEEN,
  TWELVE,
  TWENTY,
  WHITE,
} from "../common/AppText";
import { useEffect, useState } from "react";
import NavigationService from "../navigation/NavigationService";
import { useRoute } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import { BASE_URL, IMAGE_BASE_URL, timeDifference } from "../helper/utility";
import { useDispatch, useSelector } from "react-redux";
import { getContestLeaderBoard } from "../actions/profileAction";

const emptyComponent = () => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}
    >
      <AppText
        weight={POPPINS_SEMI_BOLD}
        type={FIFTEEN}
        style={{ color: "#8E5A37" }}
      >
        No data Available
      </AppText>
    </View>
  );
};

const Leaderboard = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const item = route.params?.data;
  const contestLeaderBoard = useSelector((state) => state.profile.contestLeaderBoard);
  const [activeTab, setActiveTab] = useState("Winning");
  console.log(contestLeaderBoard, "contestLeaderBoard");

  useEffect(() => {
    dispatch(getContestLeaderBoard(item?._id));
  }, []);
  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE", flex: 1 }}>
      <View style={styles.mainView}>
        <View style={{flexDirection: "row", alignItems: "center", marginTop: 30, width: "55%", justifyContent: "space-between", marginHorizontal: 20, }}>
        <TouchableOpacity onPress={() => NavigationService.goBack()}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
             
             
            }}
          />
        </TouchableOpacity>
        <AppText weight={POPPINS_SEMI_BOLD} type={SIXTEEN}>Leaderboard</AppText>
        </View>
        

        

        <View
          style={{
            margin: 20,
            borderWidth: 1,
            borderColor: "#EDEDED",
            borderRadius: 10,
          }}
          // onPress={() => NavigationService.navigate(LEADERBOARD_SCREEN, {data: item})}
        >
          
          <View style={{ backgroundColor: "#F8F8F8" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  marginVertical: 20,
                }}
              >
                <View
                  style={{
                    width: 47,
                    height: 47,
                    backgroundColor: "#D24231",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <FastImage
                    source={{ uri: BASE_URL + item?.category?.categoryIcon }}
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                    tintColor={colors.white}
                  />
                </View>
                <AppText
                  color={BLACK}
                  weight={POPPINS_SEMI_BOLD}
                  type={SIXTEEN}
                >
                  {item?.category?.categoryName}
                </AppText>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#DEB15D",
                  height: 40,
                  width: 80,
                  borderRadius: 10,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_BOLD} type={FORTEEN}>
                  ₹{item?.joining_fee}
                </AppText>
              </View>
            </View>
            <AppText
              style={{
                alignSelf: "center",
                marginBottom: 10,
                color: "#D9AF23",
              }}
              type={FORTEEN}
            >
              {item?.contest_name}
            </AppText>
            <View
              style={{
                marginHorizontal: 20,
                marginBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <AppText color={BLACK} type={THIRTEEN} weight={POPPINS_MEDIUM}>
                  Total Participants :
                </AppText>
                <AppText
                  style={{ color: "#D24231" }}
                  type={THIRTEEN}
                  weight={POPPINS_MEDIUM}
                >
                  {item?.post_limit}
                </AppText>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <AppText color={BLACK} type={THIRTEEN} weight={POPPINS_MEDIUM}>
                  Total Posts :
                </AppText>
                <AppText
                  style={{ color: "#D24231" }}
                  type={THIRTEEN}
                  weight={POPPINS_MEDIUM}
                >
                  {item?.totalPosts}
                </AppText>
              </View>
            </View>
          </View>
          <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#EDEDED",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            width: "50%",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            padding: 8,
          }}
        >
          <FastImage
            source={firstPrizeIcon}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
          <View>
            <AppText style={{ color: "#666666" }} type={TWELVE}>
              First Prize
            </AppText>
            <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={TWENTY}>
              ₹{item?.topUser?.winning_amount}
            </AppText>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            width: "50%",
            backgroundColor: "#D24430",
            justifyContent: "center",
            padding: 8,
            borderBottomRightRadius: 10,
          }}
        >
          <FastImage
            source={firstPrizeIcon}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
          <View>
            <AppText color={WHITE} type={TWELVE}>
              Prize Pool
            </AppText>
            <AppText color={WHITE} weight={POPPINS_SEMI_BOLD} type={TWENTY}>
              ₹{item?.prize_pool}
            </AppText>
          </View>
        </View>
      </View>
        </View>
        <View style={styles.boardView}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginHorizontal: 30,
              marginVertical: 15,
              borderBottomWidth: 1,
              borderColor: "#EEEEEE",
            }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("Winning")}
              style={activeTab === "Winning" && styles.activeTab}
            >
              <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={FORTEEN}>
                Winning
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("Leaderboard")}
              style={activeTab === "Leaderboard" && styles.activeTab}
            >
              <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={FORTEEN}>
                Leaderboard
              </AppText>
            </TouchableOpacity>
          </View>
          {activeTab === "Winning" ? (
            <View style={{ marginTop: 10, paddingHorizontal: 20, marginBottom: 10 }}>
              <FlatList
              data={contestLeaderBoard}
              renderItem={({item}) => {
                return (
                  <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                  backgroundColor: "#E6E6E6",
                  borderRadius: 8,
                  marginTop: 10,
                  alignItems: "center",
                  paddingHorizontal: 15,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  # {item?.position}
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹{item?.winning_amount}
                </AppText>
              </View>
                )
              }}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={emptyComponent}
            />
          
            </View>
          ) : (
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                backgroundColor: "#F3F3F3",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  Rank
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  Winning Amount
                </AppText>
              </View>
              <FlatList
              data={contestLeaderBoard}
              renderItem={({item}) => {
                return (
                  <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <FastImage
                    source={item?.position === 1 ?  Win1stIcon : item?.position === 2 ? silverWinIcon : item?.position === 3 ?  bronseIcon : item?.position}
                    resizeMode="contain"
                    style={{ width: 30, height: 30 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      padding: 6,
                      borderRadius: 20,
                      width: "61%",
                      gap: 10
                    }}
                  >
                    <FastImage
                      source={user1Icon}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 40 }}
                    />
                    <AppText
                      color={BLACK}
                      weight={POPPINS_SEMI_BOLD}
                      type={TWELVE}
                      style={{ marginRight: 10 }}
                    >
                     {item?.user_id?.firstName} {item?.user_id?.lastName}
                    </AppText>
                  </View>
                  {/* <FastImage
                    source={upIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <AppText color={BLACK}>2</AppText> */}
                </View>

                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                ₹{item?.winning_amount}
                </AppText>
              </View>
                )
              }}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={emptyComponent}
            />
              {/* <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <FastImage
                    source={Win1stIcon}
                    resizeMode="contain"
                    style={{ width: 30, height: 30 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      padding: 6,
                      borderRadius: 20,
                      width: "55%",
                      justifyContent: "space-between",
                    }}
                  >
                    <FastImage
                      source={user1Icon}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 40 }}
                    />
                    <AppText
                      color={BLACK}
                      weight={POPPINS_SEMI_BOLD}
                      type={TWELVE}
                      style={{ marginRight: 10 }}
                    >
                      Jiya Sharama
                    </AppText>
                  </View>
                  <FastImage
                    source={upIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <AppText color={BLACK}>2</AppText>
                </View>

                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  1520 pt
                </AppText>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <FastImage
                    source={silverWinIcon}
                    resizeMode="contain"
                    style={{ width: 30, height: 30 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      padding: 6,
                      borderRadius: 20,
                      width: "55%",
                      justifyContent: "space-between",
                    }}
                  >
                    <FastImage
                      source={user1Icon}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 40 }}
                    />
                    <AppText
                      color={BLACK}
                      weight={POPPINS_SEMI_BOLD}
                      type={TWELVE}
                      style={{ marginRight: 10 }}
                    >
                      Jiya Sharama
                    </AppText>
                  </View>
                  <FastImage
                    source={upIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <AppText color={BLACK}>2</AppText>
                </View>

                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  1520 pt
                </AppText>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <FastImage
                    source={bronseIcon}
                    resizeMode="contain"
                    style={{ width: 30, height: 30 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      padding: 6,
                      borderRadius: 20,
                      width: "55%",
                      justifyContent: "space-between",
                    }}
                  >
                    <FastImage
                      source={user1Icon}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 40 }}
                    />
                    <AppText
                      color={BLACK}
                      weight={POPPINS_SEMI_BOLD}
                      type={TWELVE}
                      style={{ marginRight: 10 }}
                    >
                      Jiya Sharama
                    </AppText>
                  </View>
                  <FastImage
                    source={upIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <AppText color={BLACK}>1</AppText>
                </View>

                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  1520 pt
                </AppText>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <AppText
                    color={BLACK}
                    weight={POPPINS_SEMI_BOLD}
                    style={{ marginHorizontal: 4 }}
                  >
                    # 4
                  </AppText>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      padding: 6,
                      borderRadius: 20,
                      width: "55%",
                      justifyContent: "space-between",
                    }}
                  >
                    <FastImage
                      source={user1Icon}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 40 }}
                    />
                    <AppText
                      color={BLACK}
                      weight={POPPINS_SEMI_BOLD}
                      type={TWELVE}
                      style={{ marginRight: 10 }}
                    >
                      Jiya Sharama
                    </AppText>
                  </View>
                  <FastImage
                    source={downIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <AppText color={BLACK}>2</AppText>
                </View>

                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  1520 pt
                </AppText>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <AppText
                    color={BLACK}
                    weight={POPPINS_SEMI_BOLD}
                    style={{ marginHorizontal: 4 }}
                  >
                    # 5
                  </AppText>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      padding: 6,
                      borderRadius: 20,
                      width: "55%",
                      justifyContent: "space-between",
                    }}
                  >
                    <FastImage
                      source={user1Icon}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 40 }}
                    />
                    <AppText
                      color={BLACK}
                      weight={POPPINS_SEMI_BOLD}
                      type={TWELVE}
                      style={{ marginRight: 10 }}
                    >
                      Jiya Sharama
                    </AppText>
                  </View>
                  <FastImage
                    source={upIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <AppText color={BLACK}>2</AppText>
                </View>

                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  1520 pt
                </AppText>
              </View> */}
            </View>
          )}
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  boardView: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D2D2D2",
    margin: 10,
    borderRadius: 10,
  },
  activeTab: {
    borderBottomWidth: 5,
    paddingBottom: 10,
    borderColor: "#D24430",
  },
});
