import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";
import {
  backIcon,
  camAddIcon,
  cameraBgIcon,
  captureIcon,
  homeIcon,
} from "../helper/images";
import Icon from "react-native-vector-icons/MaterialIcons";
import NavigationService from "../navigation/NavigationService";
import { PREVIEW_POST_SCREEN } from "../navigation/routes";
import { colors } from "../theme/color";
import { useRoute } from "@react-navigation/native";
// import { getCameraPermissions, getGalleryPermissions } from '../helper/Utility';

const CreatePost = () => {
  const route = useRoute();
  const [videoUri, setVideoUri] = useState(null);
  const [videoData, setVideoData] = useState(null);

  let contest_id = route?.params?.contest?._id;

  console.log(route?.params?.contest, "route");

  const captureVideo = async () => {
    try {
      const video = await ImagePicker.openCamera({
        mediaType: "video",
        videoQuality: "low",
        durationLimit: 60,
      });
      console.log("Captured video:", video);
      setVideoUri(video.path);
      setVideoData(video); // Save for upload
      NavigationService.navigate(PREVIEW_POST_SCREEN, { data: video, contest: contest_id});
    } catch (error) {
      console.log("Video capture error:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <TouchableOpacity onPress={() => NavigationService.goBack()}>
        <FastImage
          source={backIcon}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
          tintColor={colors.white}
        />
      </TouchableOpacity>

      <ImageBackground
        source={cameraBgIcon}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 600,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
        }}
      >
        <FastImage
          source={captureIcon}
          resizeMode="contain"
          style={{ width: "40%", height: 200 }}
        />
      </ImageBackground>
      <View
        style={{
          alignItems: "center",
          marginBottom: 38,
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: 90,
            height: 90,
            borderRadius: 50,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={captureVideo}
        >
          <View
            style={{
              borderColor: "#8E1404",
              width: 70,
              height: 70,
              borderRadius: 50,
              margin: 10,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FastImage
              source={camAddIcon}
              resizeMode="contain"
              style={{
                width: 55,
                height: 55,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;
