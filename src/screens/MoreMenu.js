import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import {
  AppText,
  FIFTEEN,
  POPPINS_SEMI_BOLD,
  SEMI_BOLD,
  TWELVE,
  TWENTY,
} from "../common/AppText";
import NavigationService from "../navigation/NavigationService";
import {
  activityIcon,
  archiveIcon,
  backIcon,
  closeFrndIcon,
  discoverPplIcon,
  logout,
  nameTagIcon,
  savedIcon,
  settingIcon,
  supportIcon,
} from "../helper/images";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { userLogout } from "../actions/authActions";
import LogoutModal from "../common/LogoutModal";
import { useState } from "react";

const MoreMenu = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE", flex: 1 }}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => NavigationService.goBack()}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{
              width: 22,
              height: 22,
            }}
          />
        </TouchableOpacity>
        <AppText type={TWENTY} weight={POPPINS_SEMI_BOLD}>
          Settings
        </AppText>
      </View>
      <View
        style={{ margin: 20, justifyContent: "space-between", height: "90%" }}
      >
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 20,
            }}
            onPress={() => NavigationService.navigate('Support_Screen')}
          >
            <FastImage
              source={supportIcon}
              resizeMode="contain"
              style={{ width: 23, height: 23 }}
            />
            <AppText type={FIFTEEN}>Support</AppText>
          </TouchableOpacity>
          {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <FastImage
              source={activityIcon}
              resizeMode="contain"
              style={{ width: 23, height: 23 }}
            />
            <AppText type={FIFTEEN}>Your Activity</AppText>
          </View> */}
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 20,
            }}
          >
            <FastImage
              source={nameTagIcon}
              resizeMode="contain"
              style={{ width: 23, height: 23 }}
            />
            <AppText type={FIFTEEN}>Nametag</AppText>
          </View> */}
          {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <FastImage
              source={savedIcon}
              resizeMode="contain"
              style={{ width: 23, height: 23 }}
            />
            <AppText type={FIFTEEN}>Saved</AppText>
          </View> */}
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 20,
            }}
          >
            <FastImage
              source={closeFrndIcon}
              resizeMode="contain"
              style={{ width: 23, height: 23 }}
            />
            <AppText type={FIFTEEN}>Close Friends</AppText>
          </View> */}
          {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <FastImage
              source={discoverPplIcon}
              resizeMode="contain"
              style={{ width: 23, height: 23 }}
            />
            <AppText type={FIFTEEN}>Discover People</AppText>
          </View> */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginVertical: 10,
            }}
            onPress={() => dispatch(userLogout())}
          >
            <FastImage
              source={logout}
              resizeMode="contain"
              style={{ width: 23, height: 23 }}
            />
            <AppText type={FIFTEEN}>Logout</AppText>
          </TouchableOpacity>
        </View>
        {/* logout */}
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <FastImage
            source={settingIcon}
            resizeMode="contain"
            style={{ width: 23, height: 23 }}
          />
          <AppText type={FIFTEEN}>Settings</AppText>
        </View> */}
      </View>
      <LogoutModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </AppSafeAreaView>
  );
};

export default MoreMenu;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    width: "55%",
  },
});
