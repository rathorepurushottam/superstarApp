import { StyleSheet, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { AppText, POPPINS_SEMI_BOLD, TWENTY, WHITE } from "../common/AppText";
import { useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import PrimaryButton from "../common/PrimaryButton";
import { backIcon } from "../helper/images";
import { colors } from "../theme/color";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, kycVerification } from "../actions/profileAction";
import NavigationService from "../navigation/NavigationService";
import { reel1, reel2, reel3, reel4 } from "../helper/videos";
import CustomModal from "../common/CustomModal";
import { HOME_SCREEN_MAIN } from "../navigation/routes";
import Video from "react-native-video";
import DropdownComponent from "../common/DropdownComponent";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { SpinnerSecond } from "../common/SpinnerSecond";

const PreviewPost = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const video = route?.params?.data;
  const contest = route?.params?.contest;
  const isLoading = useSelector((state) => state.auth.isLoading);
  const categories = useSelector((state) => state.profile.categories || []);
  
  const [value, setValue] = useState(null);
  const [caption, setCaption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Validate video data on mount
  useEffect(() => {
    if (!video || !video.path) {
      Alert.alert(
        "Invalid Video",
        "The video could not be loaded. Please try again.",
        [
          {
            text: "OK",
            onPress: () => NavigationService.goBack(),
          },
        ]
      );
    }
  }, [video]);

  const dropdownItems = categories.map((item) => ({
    label: item?.categoryName?.trim() || "Unknown", // use trim() to remove trailing spaces
    value: item?._id,
  }));

  console.log(contest, "contest");

  const onSubmit = () => {
    // Validate video data
    if (!video || !video.path) {
      Alert.alert("Error", "Invalid video data. Please try again.");
      return;
    }

    // Validate category selection for non-contest posts
    if (!contest && !value) {
      Alert.alert("Error", "Please select a category before posting.");
      return;
    }

    // Validate caption
    if (!caption.trim()) {
      Alert.alert("Error", "Please add a caption before posting.");
      return;
    }

    try {
      // Safely extract mime type and file extension
      const mimeType = video.mime || "video/mp4";
      const mimeParts = mimeType.split("/");
      const fileExt = mimeParts[1] || "mp4";
      
      // Get timestamp safely
      const timestamp = video.modificationDate || Date.now().toString();
      const fileName = `${timestamp}.${fileExt}`;

      const panPhoto = {
        uri: video.path,
        name: fileName,
        type: mimeType,
      };

      const formData = new FormData();
      formData.append("caption", caption.trim());
      formData.append("postFile", panPhoto);
      
      // Only append category_id if not in contest mode
      if (!contest) {
        formData.append("category_id", value);
      } else {
        formData.append("contest_id", contest);
      }

      dispatch(createPost(formData, setIsOpen));
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    }
  };
  // Don't render if video is invalid
  if (!video || !video.path) {
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
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <AppText color={WHITE}>Video not available</AppText>
        </View>
      </AppSafeAreaView>
    );
  }

  return (
    <AppSafeAreaView style={{ backgroundColor: "#2A2A2A" }}>
      <KeyBoardAware>
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
          {!videoError ? (
            <Video
              source={{ uri: video.path }}
              style={{ width: "70%", height: 300, borderRadius: 15 }}
              controls
              resizeMode="cover"
              onError={(error) => {
                console.error("Video error:", JSON.stringify(error, null, 2));
                console.log("Video path that failed:", video.path);
                setVideoError(true);
              }}
              onLoad={(data) => {
                console.log("Video loaded successfully:", {
                  duration: data?.duration,
                  naturalSize: data?.naturalSize,
                });
              }}
              paused={false}
              // Add these props to help with playback on some devices
              ignoreSilentSwitch="ignore"
              playInBackground={false}
              playWhenInactive={false}
            />
          ) : (
            <View
              style={{
                width: "70%",
                height: 300,
                borderRadius: 15,
                backgroundColor: "#383838",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText color={WHITE}>Preview not available</AppText>
              <AppText color="#B4B4B4" style={{ marginTop: 10 }}>
                Your video will still be uploaded
              </AppText>
            </View>
          )}
          
          <TextInput
            style={{
              width: "80%",
              height: 120,
              backgroundColor: "#383838",
              marginTop: 50,
              borderWidth: 1,
              borderColor: "#5E5E5E",
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingTop: 15,
              color: "#B4B4B4",
              textAlignVertical: "top",
            }}
            value={caption}
            onChangeText={(value) => setCaption(value)}
            placeholder="Add Caption"
            placeholderTextColor={"#B4B4B4"}
            multiline
            maxLength={500}
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
            disabled={!caption.trim() || (!contest && !value)}
            onPress={onSubmit}
          />
          <CustomModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            desc={"congratulations!"}
            title={"Posted Successfully"}
          />
        </View>
      </KeyBoardAware>
      <SpinnerSecond loading={isLoading} />
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
    marginTop: 30,
    width: "70%",
    gap: 20,
    marginBottom: 20,
  },
});
