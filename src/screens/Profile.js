import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { AppText, BLACK, EIGHTEEN, FORTEEN, SIXTEEN, TWELVE } from "../common/AppText";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { feed1Icon, feed2Icon, feed3Icon, user3Icon } from "../helper/images";

const Profile = () => {
  return (
    <AppSafeAreaView>
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
                Deepakagrika
              </AppText>
              <Icon
                name="chevron-down-outline"
                color={colors.black}
                size={25}
                style={{ marginLeft: 5 }}
              />
            </View>
            <Icon name="menu" color={colors.black} size={25} />
          </View>
          <View style={styles.profileView}>
            <FastImage source={user3Icon} resizeMode="contain" style={{width: 70, height: 70}} />
            <View style={{marginLeft: 20, width: "60%"}}>
                <AppText color={BLACK} type={FORTEEN}>Deepak@agrika</AppText>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 5}}>
                    <View>
                        <AppText color={BLACK} type={TWELVE}>24</AppText>
                        <AppText color={BLACK} type={TWELVE}>Posts</AppText>
                    </View>
                    <View>
                        <AppText color={BLACK} type={TWELVE}>180</AppText>
                        <AppText color={BLACK} type={TWELVE}>Followers</AppText>
                    </View>
                    <View>
                        <AppText color={BLACK} type={TWELVE}>24</AppText>
                        <AppText color={BLACK} type={TWELVE}>Following</AppText>
                    </View>
                </View>
            </View>
          </View>
          <AppText color={BLACK} style={{marginVertical: 10}}>Artistry That Inspire: Supply Your Shelves with....</AppText>
          <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginVertical: 10}}>
            <View style={styles.optionBox}>
                <AppText color={BLACK}>Edit Profile</AppText>
            </View>
            <View style={styles.optionBox}>
                <AppText color={BLACK}>share Profile</AppText>
            </View>
            <View style={[styles.optionBox, {paddingHorizontal: 8}]}>
            <Icon
                name="person-add"
                color={colors.black}
                size={20}
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <FastImage source={feed1Icon} resizeMode="contain" style={{width: "33%", height: 80}}/>
                <FastImage source={feed2Icon} resizeMode="contain" style={{width: "33%", height: 80}}/>
                <FastImage source={feed3Icon} resizeMode="contain" style={{width: "33%", height: 80}}/>
            </View>
          </View>
        </View>
      </KeyBoardAware>
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
    flexDirection: "row"
  },
  optionBox :{
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 6
  }
});
