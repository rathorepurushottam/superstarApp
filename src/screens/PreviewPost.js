import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { AppText, POPPINS_SEMI_BOLD, TWENTY, WHITE } from "../common/AppText";
import { useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import PrimaryButton from "../common/PrimaryButton";
import { backIcon } from "../helper/images";
import { colors } from "../theme/color";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, kycVerification } from "../actions/profileAction";
import NavigationService from "../navigation/NavigationService";
import { reel1, reel2, reel3, reel4 } from "../helper/videos";
import CustomModal from "../common/CustomModal";
import { HOME_SCREEN_MAIN } from "../navigation/routes";
import Video from "react-native-video";
import DropdownComponent from "../common/DropdownComponent";

const PreviewPost = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  let video = route?.params?.data;
  let contest = route?.params?.contest;
  const categories = useSelector((state) => {
    return state.profile.categories;
  });
  const dropdownItems = categories.map((item) => ({
    label: item.categoryName.trim(), // use trim() to remove trailing spaces
    value: item._id,
  }));
  const [value, setValue] = useState(null);
  const [caption, setCaption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  console.log(contest, "contest");

  const onSubmit = () => {
    const mimeParts = video.mime.split("/");
    const fileExt = mimeParts[1] || "mp4";
    const timestamp = video.modificationDate || Date.now().toString();
    const fileName = `${timestamp}.${fileExt}`;

    const panPhoto = {
      uri: video.path,
      name: fileName,
      type: video.mime,
    };
    var formData = new FormData();
    formData.append("category_id", value);
    formData.append("caption", caption);
    formData.append("postFile", panPhoto);
   {contest && formData.append("contest_id", contest) } 
    dispatch(createPost(formData, setIsOpen));

    // toastAlert.showToastError('Posted Successfully');
  };
  return (
    <AppSafeAreaView style={{ backgroundColor: "#2A2A2A" }}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => NavigationService.goBack()}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{
              width: 22,
              height: 22,
            }}
            tintColor={colors.white}
          />
        </TouchableOpacity>
        <AppText type={TWENTY} weight={POPPINS_SEMI_BOLD} color={WHITE}>
          Preview
        </AppText>
      </View>
      <View style={{ alignItems: "center" }}>
        {/* <FastImage
          source={{ uri: pic }}
          resizeMode="cover"
          style={{ width: "80%", height: "60%", borderRadius: 15 }}
        /> */}
        <Video
          source={{ uri: video?.path }}
          style={{ width: "70%", height: 300, borderRadius: 15 }}
          controls
          // controlsStyles={{}}
          resizeMode="cover"
        />
        <TextInput
          style={{
            width: "80%",
            height: 150,
            backgroundColor: "#383838",
            marginTop: 50,
            borderWidth: 1,
            borderColor: "#5E5E5E",
            borderRadius: 15,
            paddingHorizontal: 20,
            color: "#B4B4B4",
          }}
          value={caption}
          onChangeText={(value) => setCaption(value)}
          placeholder="Add Caption"
          placeholderTextColor={"#B4B4B4"}
        />
        {!contest && (
          <DropdownComponent
            items={dropdownItems}
            style={{ width: "80%", alignSelf: "center" }}
            label={"Choose Category"}
            value={value}
            setValue={setValue}
          />
        )}

        <PrimaryButton
          title={"Post"}
          buttonStyle={{ width: "80%", marginTop: 20 }}
          disabled={!caption}
          onPress={onSubmit}
        />
        <CustomModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          desc={"congratulations!"}
          title={"Posted Successfully"}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default PreviewPost;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    //   justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    width: "70%",
    gap: 20,
    marginBottom: 20,
  },
});
