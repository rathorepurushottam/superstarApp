import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import FastImage from "react-native-fast-image";
import {
  backIcon,
  bronseIcon,
  danceIcon,
  downIcon,
  firstPrizeIcon,
  silverWinIcon,
  upIcon,
  user1Icon,
  Win1stIcon,
} from "../helper/images";
import { colors } from "../theme/color";
import {
  AppText,
  BLACK,
  ELEVEN,
  FORTEEN,
  POPPINS_BOLD,
  POPPINS_SEMI_BOLD,
  SEMI_BOLD,
  SIXTEEN,
  TWELVE,
  TWENTY,
  WHITE,
} from "../common/AppText";
import { useState } from "react";
import NavigationService from "../navigation/NavigationService";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("Winning");
  return (
    <AppSafeAreaView>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={() => NavigationService.goBack()}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 10 }}>
          <View
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
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
                    source={danceIcon}
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
                  Dancing
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
                  ₹200
                </AppText>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <AppText style={{ color: "#D24430" }}>1000 Left</AppText>
              <AppText color={BLACK}>2000 Spots</AppText>
            </View>
            <View
              style={{
                height: 13,
                width: "80%",
                borderColor: "#D2D2D2",
                borderWidth: 1,
                alignSelf: "center",
                borderRadius: 8,
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  height: 6,
                  width: "40%",
                  borderRadius: 8,
                  backgroundColor: "#D24430",
                  marginLeft: 2,
                }}
              ></View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#EDEDED",
              borderWidth: 1,
              borderRadius: 10,
              overflow: "hidden",
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
                // borderBottomLeftRadius: 10,
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
                  ₹5,000
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
                  ₹20,000
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
            <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
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
                  Winnings
                </AppText>
              </View>
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
                  # 1
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹5,000
                </AppText>
              </View>
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
                  # 2
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹3,000
                </AppText>
              </View>
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
                  # 3
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹2,000
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                  borderRadius: 8,
                  marginTop: 10,
                  alignItems: "center",
                  paddingHorizontal: 5,
                  borderBottomColor: "#EEEEEE",
                  borderBottomWidth: 1,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  # 4
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹2,000
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                  borderRadius: 8,
                  marginTop: 10,
                  alignItems: "center",
                  paddingHorizontal: 5,
                  borderBottomColor: "#EEEEEE",
                  borderBottomWidth: 1,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  # 5
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹2,000
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                  borderRadius: 8,
                  marginTop: 10,
                  alignItems: "center",
                  paddingHorizontal: 5,
                  borderBottomColor: "#EEEEEE",
                  borderBottomWidth: 1,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  # 6
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹2,000
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                  borderRadius: 8,
                  marginTop: 10,
                  alignItems: "center",
                  paddingHorizontal: 5,
                  borderBottomColor: "#EEEEEE",
                  borderBottomWidth: 1,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  # 7
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹2,000
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                  borderRadius: 8,
                  marginTop: 10,
                  alignItems: "center",
                  paddingHorizontal: 5,
                  borderBottomColor: "#EEEEEE",
                  borderBottomWidth: 1,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  # 8
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹2,000
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 6,
                  borderRadius: 8,
                  marginTop: 10,
                  alignItems: "center",
                  paddingHorizontal: 5,
                  borderBottomColor: "#EEEEEE",
                  borderBottomWidth: 1,
                }}
              >
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  # 9
                </AppText>
                <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                  ₹2,000
                </AppText>
              </View>
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
                  Points
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
              </View>
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
