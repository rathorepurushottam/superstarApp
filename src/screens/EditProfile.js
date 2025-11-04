import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { KeyBoardAware } from "../common/KeyBoardAware";
import {
  AppText,
  BLACKOPACITY,
  BOLD,
  FIFTEEN,
  POPPINS_SEMI_BOLD,
  SEMI_BOLD,
  THIRTEEN,
  TWELVE,
  TWENTY,
} from "../common/AppText";
import NavigationService from "../navigation/NavigationService";
import FastImage from "react-native-fast-image";
import { backIcon, editProfileIcon } from "../helper/images";
import { useState } from "react";
import ImageCropPicker from "react-native-image-crop-picker";
import PrimaryButton from "../common/PrimaryButton";
import InputBox from "../common/InputBox";
import { colors } from "../theme/color";
import { universalPaddingHorizontal } from "../theme/dimens";
import { kycVerification } from "../actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerSecond } from "../common/SpinnerSecond";
import { IMAGE_BASE_URL } from "../helper/utility";

const EditProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.profile.userData;
  });
  const [selfie, setSelfie] = useState("");
  const [name, setName] = useState(userData?.firstName);
  const [userName, setUserName] = useState(userData?.username);
  const [bio, setBio] = useState(userData?.bio);
  const [email, setEmail] = useState(userData?.email);

  const isLoading = useSelector((state) => state.auth.isLoading);

  console.log(IMAGE_BASE_URL + userData.profile_photo, "userData");

  const handleSelectImage = () => {
    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Camera", onPress: () => onPressCamera() },
      { text: "Gallery", onPress: () => onPressGallery() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const onPressCamera = () => {
    ImageCropPicker.openCamera({
      useFrontCamera: true,
      multiple: false,
      mediaType: "photo",
      cropping: true,
      compressImageQuality: 0.6, // 1 = 100% quality
    })
      .then((image) => {
        // Optional: console.log(image) to inspect structure if needed

        // Validate image
        const isValidSize = image?.size && image.size < 5 * 1024 * 1024; // 5MB
        const isValidType = ["image/png", "image/jpeg", "image/jpg"].includes(
          image?.mime
        );

        if (isValidSize && isValidType) {
          const fileName =
            image?.filename || image?.path?.split("/").pop() || "image.jpg";
          const tempphoto = {
            uri: image.path,
            name: fileName,
            type: image.mime,
          };
          setSelfie(tempphoto);
        } else {
          setSelfie("");
          showError(
            "Only JPEG, PNG & JPG formats and file size up to 5MB are supported."
          );
        }
      })
      .catch((error) => {
        if (error?.code === "E_PICKER_CANCELLED") {
          // user cancelled camera, no need to show error
          return;
        }
        console.error("Camera error:", error);
        showError("Failed to capture photo. Please try again.");
      });
  };

  const onPressGallery = () => {
    ImageCropPicker.openPicker({
      useFrontCamera: true,
      multiple: false,
      mediaType: "photo",
      cropping: true,
      compressImageQuality: 0.6, // 1 = 100% quality
    })
      .then((image) => {
        // Optional: console.log(image) to inspect structure if needed

        // Validate image
        const isValidSize = image?.size && image.size < 5 * 1024 * 1024; // 5MB
        const isValidType = ["image/png", "image/jpeg", "image/jpg"].includes(
          image?.mime
        );

        if (isValidSize && isValidType) {
          const fileName =
            image?.filename || image?.path?.split("/").pop() || "image.jpg";
          const tempphoto = {
            uri: image.path,
            name: fileName,
            type: image.mime,
          };
          setSelfie(tempphoto);
        } else {
          setSelfie("");
          showError(
            "Only JPEG, PNG & JPG formats and file size up to 5MB are supported."
          );
        }
      })
      .catch((error) => {
        if (error?.code === "E_PICKER_CANCELLED") {
          // user cancelled camera, no need to show error
          return;
        }
        console.error("Camera error:", error);
        showError("Failed to capture photo. Please try again.");
      });
  };

  const onSubmit = () => {
    var formData = new FormData();
    formData.append("firstName", name);
    formData.append("lastName", name);
    formData.append("username", userName);
    formData.append("bio", bio);
    formData.append("website", "www.appinop.com");
    formData.append("gender", "male");

    formData.append("profileImageFile", selfie);
    dispatch(kycVerification(formData));
    // toastAlert.showToastError('Posted Successfully');
  };

  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE", flex: 1 }}>
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
            />
          </TouchableOpacity>
          <AppText type={TWENTY} weight={POPPINS_SEMI_BOLD}>
            Profile
          </AppText>
          {/* <AppText type={TWELVE} weight={SEMI_BOLD}>
            Edit
          </AppText> */}
        </View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "#716F6F",
              borderRadius: 50,
              overflow: "hidden",
              marginBottom: 15,
            }}
            onPress={handleSelectImage}
          >
            <FastImage
              // source={
              //   selfie
              //     ? selfie
              //     : userData?.profile_photo
              //     ? { uri: IMAGE_BASE_URL + "public" + selfie }
              //     : editProfileIcon
              // }
              source={
                selfie
                  ? selfie
                  : userData?.profile_photo
                  ? { uri: IMAGE_BASE_URL + userData.profile_photo }
                  : editProfileIcon
              }
              resizeMode="contain"
              style={{ height: 99, width: 99 }}
            />
          </TouchableOpacity>
          <AppText type={THIRTEEN} weight={POPPINS_SEMI_BOLD}>
            Change Profile Photo
          </AppText>
        </View>
        <View
          style={{ width: "100%", borderWidth: 0.3, borderColor: "#3C3C434A" }}
        />

        <AppText
          color={BLACKOPACITY}
          type={FIFTEEN}
          weight={POPPINS_SEMI_BOLD}
          style={{ marginLeft: 20, marginTop: 10 }}
        >
          Basic Information
        </AppText>

        <View style={{ margin: 20 }}>
          {/* Name */}
          <View style={{ marginBottom: 15 }}>
            <AppText
              color={BLACKOPACITY}
              type={THIRTEEN}
              weight={POPPINS_SEMI_BOLD}
              style={{ marginBottom: 5 }}
            >
              Name
            </AppText>
            <InputBox
              placeholder={"Name"}
              top
              placeholderTextColor={"#00000066"}
              textInputStyle={{
                borderWidth: 1,
                borderColor: "#E4E4E4",
                borderRadius: 12,
                backgroundColor: "#F5F5F5",
                height: 45,
              }}
              style={{ width: "100%" }}
              onChange={(value) => setName(value)}
              value={name}
              cursorColor={colors.black}
            />
          </View>

          {/* Username */}
          <View style={{ marginBottom: 15 }}>
            <AppText
              color={BLACKOPACITY}
              type={THIRTEEN}
              weight={POPPINS_SEMI_BOLD}
              style={{ marginBottom: 5 }}
            >
              Username
            </AppText>
            <InputBox
              placeholder={"Username"}
              top
              placeholderTextColor={"#00000066"}
              textInputStyle={{
                borderWidth: 1,
                borderColor: "#E4E4E4",
                borderRadius: 12,
                backgroundColor: "#F5F5F5",
                height: 45,
              }}
              style={{ width: "100%" }}
              onChange={(value) => setUserName(value)}
              value={userName}
              cursorColor={colors.black}
            />
          </View>

          {/* Bio */}
          <View style={{ marginBottom: 15 }}>
            <AppText
              color={BLACKOPACITY}
              type={THIRTEEN}
              weight={POPPINS_SEMI_BOLD}
              style={{ marginBottom: 5 }}
            >
              Bio
            </AppText>
            <InputBox
              placeholder={"Bio"}
              top
              placeholderTextColor={"#00000066"}
              textInputStyle={{
                borderWidth: 1,
                borderColor: "#E4E4E4",
                borderRadius: 12,
                backgroundColor: "#F5F5F5",
                height: 45,
              }}
              style={{ width: "100%" }}
              onChange={(value) => setBio(value)}
              value={bio}
              cursorColor={colors.black}
            />
          </View>
        </View>

        {/* Private Information */}
        <AppText
          color={BLACKOPACITY}
          type={FIFTEEN}
          weight={POPPINS_SEMI_BOLD}
          style={{ marginLeft: 20 }}
        >
          Private Information
        </AppText>

        <View style={{ margin: 20 }}>
          {/* Email */}
          <View style={{ marginBottom: 15 }}>
            <AppText
              color={BLACKOPACITY}
              type={THIRTEEN}
              weight={POPPINS_SEMI_BOLD}
              style={{ marginBottom: 5 }}
            >
              Email
            </AppText>
            <InputBox
              placeholder={"Email"}
              top
              placeholderTextColor={"#00000066"}
              textInputStyle={{
                borderWidth: 1,
                borderColor: "#E4E4E4",
                borderRadius: 12,
                backgroundColor: "#F5F5F5",
                height: 45,
              }}
              style={{ width: "100%" }}
              onChange={(value) => setEmail(value)}
              value={email}
              cursorColor={colors.black}
            />
          </View>
        </View>

        <PrimaryButton
          title={"Save"}
          buttonStyle={{
            width: "70%",
            alignSelf: "center",
            marginVertical: 20,
          }}
          disabled={!selfie && !email && !name}
          onPress={onSubmit}
        />
      </KeyBoardAware>
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    width: "50%",
  },
});
