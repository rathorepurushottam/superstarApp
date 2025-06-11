import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { KeyBoardAware } from "../common/KeyBoardAware";
import {
  AppText,
  BLACK,
  ELEVEN,
  FORTEEN,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMI_BOLD,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  THIRTEEN,
  TWELVE,
  TWENTY,
  TWENTY_FIVE,
  WHITE,
} from "../common/AppText";
import Header from "../common/Header";
import SearchInput from "../common/SearchInput";
import { constestCategoryList } from "../helper/dummy";
import FastImage from "react-native-fast-image";
import { colors } from "../theme/color";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { danceIcon, firstPrizeIcon, user1Icon } from "../helper/images";
import { useState } from "react";
import NavigationService from "../navigation/NavigationService";
import { LEADERBOARD_SCREEN } from "../navigation/routes";

const renderItem = ({ item }) => {
  return (
    <LinearGradient colors={item?.backgroundColor} style={styles.categoryView}>
      <FastImage
        source={item?.image}
        resizeMode="contain"
        tintColor={colors.white}
        style={{
          width: item?.label == "All" ? 55 : 40,
          height: 40,
          margin: 8,
          marginTop: 12,
        }}
      />
      <View
        style={{
          backgroundColor: item?.textBg,
          width: "100%",
          height: 30,
          alignItems: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: "center",
        }}
      >
        <AppText color={WHITE} type={TEN} weight={POPPINS_SEMI_BOLD}>
          {item?.label}
        </AppText>
      </View>
    </LinearGradient>
  );
};

const upcomingComponent = ({ item }) => {
  return (
    <View style={{ margin: 10, borderWidth: 1, borderColor: "#EDEDED" }}>
      <LinearGradient
        colors={["#0DA33F", "#14B249"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="calendar-month" color={colors.white} size={25} />
          <AppText type={ELEVEN} color={WHITE} weight={POPPINS_SEMI_BOLD}>
            25/05/2025
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="access-time" color={colors.white} size={25} />
          <AppText type={ELEVEN} color={WHITE} weight={POPPINS_SEMI_BOLD}>
            12:00 PM - 02:00 PM
          </AppText>
        </View>
      </LinearGradient>
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
                source={danceIcon}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
                tintColor={colors.white}
              />
            </View>
            <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={SIXTEEN}>
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
            borderBottomLeftRadius: 10,
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
              ₹20,000
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const completedComponent = ({ item }) => {
  return (
    <TouchableOpacity style={{ margin: 10, borderWidth: 1, borderColor: "#EDEDED" }} onPress={() => NavigationService.navigate(LEADERBOARD_SCREEN)}>
      <LinearGradient
        colors={["#A30D0D", "#E95A5A"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="calendar-month" color={colors.white} size={25} />
          <AppText type={ELEVEN} color={WHITE} weight={POPPINS_SEMI_BOLD}>
            25/05/2025
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="access-time" color={colors.white} size={25} />
          <AppText type={ELEVEN} color={WHITE} weight={POPPINS_SEMI_BOLD}>
            12:00 PM - 02:00 PM
          </AppText>
        </View>
      </LinearGradient>
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
                source={danceIcon}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
                tintColor={colors.white}
              />
            </View>
            <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={SIXTEEN}>
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
            marginLeft: 20,
            marginBottom: 15,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <AppText color={BLACK} type={THIRTEEN} weight={POPPINS_MEDIUM}>
            Total Participants :
          </AppText>
          <AppText
            style={{ color: "#D24231" }}
            type={THIRTEEN}
            weight={POPPINS_MEDIUM}
          >
            100
          </AppText>
        </View>
      </View>
      <View
        style={{
          // flexDirection: "row",
          borderWidth: 1,
          borderColor: "#EDEDED",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            // width: "50%",
            backgroundColor: "#FFFFFF",
            // justifyContent: "center",
            padding: 8,
            borderBottomLeftRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <FastImage
              source={firstPrizeIcon}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#BFF5C9",
                padding: 6,
                borderRadius: 20,
                width: "60%",
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
          </View>

          <View style={{ alignSelf: "center" }}>
            <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={TWENTY}>
              ₹5,000
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const liveComponent = ({ item }) => {
  return (
    <TouchableOpacity style={{ margin: 10, borderWidth: 1, borderColor: "#EDEDED" }}
    onPress={() => NavigationService.navigate(LEADERBOARD_SCREEN)}
    >
      {/* <LinearGradient
        colors={["#0DA33F", "#14B249"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="calendar-month" color={colors.white} size={25} />
          <AppText type={ELEVEN} color={WHITE} weight={POPPINS_SEMI_BOLD}>
            25/05/2025
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon name="access-time" color={colors.white} size={25} />
          <AppText type={ELEVEN} color={WHITE} weight={POPPINS_SEMI_BOLD}>
            12:00 PM - 02:00 PM
          </AppText>
        </View>
      </LinearGradient> */}
      <View
        style={{
          backgroundColor: "#F8F8F8",
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
            <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={SIXTEEN}>
              Dancing
            </AppText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Icon name="access-time" size={20} color={colors.black} />
            <AppText style={{ color: "#DA5821" }}>01:00 left</AppText>
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
            borderBottomLeftRadius: 10,
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
              ₹20,000
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const myConstestComponent = ({ item }) => {
  return (
    <TouchableOpacity
      style={{ margin: 10, borderWidth: 1, borderColor: "#EDEDED" }}
      onPress={() => NavigationService.navigate(LEADERBOARD_SCREEN)}
    >
      <View
        style={{
          backgroundColor: "#F8F8F8",
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
            <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={SIXTEEN}>
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
            backgroundColor: "#D9D9D9",
            marginHorizontal: 20,
            borderRadius: 11,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <AppText color={BLACK} weight={POPPINS_MEDIUM}>
                Status :{" "}
              </AppText>
              <FastImage
                source={firstPrizeIcon}
                resizeMode="contain"
                style={{ width: 10, height: 10 }}
              />
              <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                Winner
              </AppText>
            </View>
            <View>
              <AppText color={BLACK} weight={POPPINS_SEMI_BOLD}>
                Votes Received : 65
              </AppText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 10,
            }}
          >
            <AppText color={BLACK} type={TWELVE} weight={POPPINS_SEMI_BOLD}>
              Prize Pool : ₹20,000
            </AppText>
            <AppText color={BLACK} type={TWELVE} weight={POPPINS_SEMI_BOLD}>
              First Price : ₹5,000
            </AppText>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#EDEDED",
          borderWidth: 1,
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
            borderBottomLeftRadius: 10,
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
              ₹20,000
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Contest = () => {
  const [contest, setContest] = useState("myContest");
  return (
    <AppSafeAreaView>
      <KeyBoardAware>
        <View style={styles.mainView}>
          <Header />
          <SearchInput />
          <View style={styles.contestView}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  contest === "myContest" ? "#E1D5CD" : "transparent",
                width: "25%",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
              }}
              onPress={() => setContest("myContest")}
            >
              <AppText type={TWELVE} color={BLACK} weight={POPPINS_SEMI_BOLD}>
                My Contest
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: contest === "live" ? "#E1D5CD" : "transparent",
                width: "25%",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
              }}
              onPress={() => setContest("live")}
            >
              <AppText type={TWELVE} color={BLACK} weight={POPPINS_SEMI_BOLD}>
                Live
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor:
                  contest === "upcoming" ? "#E1D5CD" : "transparent",
                width: "25%",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
              }}
              onPress={() => setContest("upcoming")}
            >
              <AppText type={TWELVE} color={BLACK} weight={POPPINS_SEMI_BOLD}>
                Upcoming
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor:
                  contest === "completed" ? "#E1D5CD" : "transparent",
                width: "25%",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
              }}
              onPress={() => setContest("completed")}
            >
              <AppText type={TWELVE} color={BLACK} weight={POPPINS_SEMI_BOLD}>
                Completed
              </AppText>
            </TouchableOpacity>
          </View>
          {contest !== "myContest" ? (
            <>
              <AppText
                type={SIXTEEN}
                color={BLACK}
                weight={POPPINS_SEMI_BOLD}
                style={{ marginHorizontal: 20 }}
              >
                Choose your category
              </AppText>
              <View>
                <FlatList
                  data={constestCategoryList}
                  renderItem={renderItem}
                  horizontal
                  style={{ alignSelf: "center", marginVertical: 10 }}
                  keyExtractor={(item) => item.id}
                />
              </View>
              <AppText
                type={SIXTEEN}
                color={BLACK}
                weight={POPPINS_SEMI_BOLD}
                style={{ marginHorizontal: 20, marginBottom: 10 }}
              >
                Events
              </AppText>
            </>
          ) : (
            <View
              style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#F8F8F8",
                  borderColor: "#EDEDED",
                  borderWidth: 1,
                  width: "30%",
                  alignItems: "center",
                  padding: 4,
                  borderRadius: 10,
                }}
              >
                <AppText
                  style={{ color: "#8E5A37" }}
                  type={TWENTY_FIVE}
                  weight={POPPINS_SEMI_BOLD}
                >
                  20
                </AppText>
                <AppText style={{ color: "#666666" }} type={TWELVE}>
                  Total Contests Participated
                </AppText>
              </View>
              <View
                style={{
                  backgroundColor: "#F8F8F8",
                  borderColor: "#EDEDED",
                  borderWidth: 1,
                  width: "30%",
                  alignItems: "center",
                  padding: 4,
                  borderRadius: 10,
                }}
              >
                <AppText
                  style={{ color: "#8E5A37" }}
                  type={TWENTY_FIVE}
                  weight={POPPINS_SEMI_BOLD}
                >
                  658
                </AppText>
                <AppText style={{ color: "#666666" }} type={TWELVE}>
                  Total Votes Earned
                </AppText>
              </View>
              <View
                style={{
                  backgroundColor: "#F8F8F8",
                  borderColor: "#EDEDED",
                  borderWidth: 1,
                  width: "30%",
                  alignItems: "center",
                  padding: 4,
                  borderRadius: 10,
                }}
              >
                <AppText
                  style={{ color: "#8E5A37" }}
                  type={TWENTY_FIVE}
                  weight={POPPINS_SEMI_BOLD}
                >
                  25%
                </AppText>
                <AppText style={{ color: "#666666" }} type={TWELVE}>
                  Top Average Ranking
                </AppText>
              </View>
            </View>
          )}

          <View>
            <FlatList
              data={[1, 2, 3]}
              renderItem={
                contest === "myContest"
                  ? myConstestComponent
                  : contest === "live"
                  ? liveComponent
                  : contest === "upcoming"
                  ? upcomingComponent
                  : contest === "completed"
                  ? completedComponent
                  : ""
              }
            />
          </View>
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Contest;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginBottom: 70,
  },
  contestView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#C1AA9966",
    backgroundColor: "#C1AA9926",
    height: 40,
    alignItems: "center",
  },
  categoryView: {
    alignItems: "center",
    gap: 10,
    width: 80,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  eventView: {},
});
