import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Alert,
  PermissionsAndroid,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";
import {
  backIcon,
  camAddIcon,
  cameraBgIcon,
  captureIcon,
} from "../helper/images";
import { VESDK } from "react-native-videoeditorsdk";
import { NativeModules } from "react-native";
import NavigationService from "../navigation/NavigationService";
import { PREVIEW_POST_SCREEN } from "../navigation/routes";
import { colors } from "../theme/color";
import { useRoute } from "@react-navigation/native";
import { AppText, WHITE } from "../common/AppText";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { KeyBoardAware } from "../common/KeyBoardAware";
import { SpinnerSecond } from "../common/SpinnerSecond";

const CreatePost = () => {
  const route = useRoute();
  const [videoUri, setVideoUri] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const contest_id = route?.params?.contest?._id;
  
  // 🧪 DEBUGGING: Set to true to skip VESDK and test if it's causing the crash
  const SKIP_EDITOR_FOR_TESTING = false;

  // ✅ Minimal VESDK configuration - stable and crash-free
  const config = {
    // Transform settings to force square (1:1) aspect ratio
    transform: {
      allowFreeCrop: false,
      // Force 1:1 aspect ratio for square videos
      forceCropMode: {
        width: 1,
        height: 1,
      },
    },
  };

  // 📱 Request storage/media permissions for gallery access
  const requestStoragePermission = async () => {
    if (Platform.OS !== "android") {
      return true; // iOS handles permissions automatically
    }

    try {
      // Android 13+ (API 33+) uses READ_MEDIA_VIDEO
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          {
            title: "Media Permission",
            message: "This app needs access to your videos to upload them",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          }
        );

        console.log("📱 READ_MEDIA_VIDEO permission result:", granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // Android 12 and below use READ_EXTERNAL_STORAGE
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to upload videos",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          }
        );

        console.log("📱 READ_EXTERNAL_STORAGE permission result:", granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.error("❌ Permission request error:", err);
      return false;
    }
  };

  const captureVideo = async () => {
    try {
      setIsProcessing(true);
      if (Platform.OS === "android") NativeModules?.Immersive?.enter?.();
      
      console.log("📹 Starting camera capture...");
      const video = await ImagePicker.openCamera({
        mediaType: "video",
        videoQuality: "low",
        durationLimit: 60,
      });

      console.log("✅ Camera capture complete:", {
        path: video?.path,
        duration: video?.duration,
        size: video?.size,
      });

      // Validate video data from camera
      if (!video || !video.path) {
        throw new Error("Invalid video captured");
      }

      // Use editor unless debugging
      if (!SKIP_EDITOR_FOR_TESTING) {
        console.log("🎬 Opening VESDK editor with path:", video.path);
        
        try {
          // Try opening editor with NO config first to test if that's the issue
          const result = await VESDK.openEditor(video.path);
          
          console.log("✅ VESDK editor closed, result:", {
            hasResult: !!result,
            hasVideo: !!result?.video,
            videoPath: result?.video,
            resultKeys: result ? Object.keys(result) : [],
          });
          
          // Validate editor result
          if (result && result.video) {
            video.path = result.video;
            console.log("✅ Using edited video path:", video.path);
          } else {
            console.warn("⚠️ No edited video returned, using original");
          }
        } catch (editorError) {
          console.error("❌ VESDK editor error:", editorError);
          // If editor fails, we can still use the original video
          console.log("⚠️ Using original video after editor error");
        }
      } else {
        console.log("⚠️ SKIPPING VESDK EDITOR (debug mode)");
      }

      setVideoUri(video.path);
      setVideoData(video);

      console.log("🚀 Navigating to preview with video:", video.path);
      NavigationService.navigate(PREVIEW_POST_SCREEN, {
        data: video,
        contest: contest_id,
      });
    } catch (error) {
      console.error("❌ Video capture error:", {
        message: error?.message,
        code: error?.code,
        stack: error?.stack,
      });
      
      // Don't show error if user cancelled
      if (
        error?.message !== "User cancelled image selection" &&
        error?.code !== "E_PICKER_CANCELLED" &&
        !error?.message?.includes("cancelled") &&
        !error?.message?.includes("canceled")
      ) {
        Alert.alert(
          "Error",
          `Failed to capture video: ${error?.message || "Unknown error"}`,
          [{ text: "OK" }]
        );
      }
    } finally {
      setIsProcessing(false);
      if (Platform.OS === "android") NativeModules?.Immersive?.exit?.();
    }
  };

  const captureGalleryVideo = async () => {
    try {
      setIsProcessing(true);
      
      // 🔐 Request storage permission before opening gallery
      console.log("🔐 Requesting storage permission...");
      const hasPermission = await requestStoragePermission();
      
      if (!hasPermission) {
        Alert.alert(
          "Permission Required",
          "Please grant storage permission to select videos from your gallery.",
          [{ text: "OK" }]
        );
        setIsProcessing(false);
        return;
      }
      
      console.log("✅ Storage permission granted");
      
      if (Platform.OS === "android") NativeModules?.Immersive?.enter?.();
      
      console.log("📂 Opening gallery picker...");
      const video = await ImagePicker.openPicker({
        mediaType: "video",
        videoQuality: "low",
        durationLimit: 60,
      });

      console.log("✅ Gallery video selected:", {
        path: video?.path,
        duration: video?.duration,
        size: video?.size,
      });

      // Validate video data from gallery
      if (!video || !video.path) {
        throw new Error("Invalid video selected");
      }

      // Use editor unless debugging
      if (!SKIP_EDITOR_FOR_TESTING) {
        console.log("🎬 Opening VESDK editor with path:", video.path);
        
        try {
          // Try opening editor with NO config first to test if that's the issue
          const result = await VESDK.openEditor(video.path);
          
          console.log("✅ VESDK editor closed, result:", {
            hasResult: !!result,
            hasVideo: !!result?.video,
            videoPath: result?.video,
            resultKeys: result ? Object.keys(result) : [],
          });
          
          // Validate editor result
          if (result && result.video) {
            video.path = result.video;
            console.log("✅ Using edited video path:", video.path);
          } else {
            console.warn("⚠️ No edited video returned, using original");
          }
        } catch (editorError) {
          console.error("❌ VESDK editor error:", editorError);
          // If editor fails, we can still use the original video
          console.log("⚠️ Using original video after editor error");
        }
      } else {
        console.log("⚠️ SKIPPING VESDK EDITOR (debug mode)");
      }

      setVideoUri(video.path);
      setVideoData(video);

      console.log("🚀 Navigating to preview with video:", video.path);
      NavigationService.navigate(PREVIEW_POST_SCREEN, {
        data: video,
        contest: contest_id,
      });
    } catch (error) {
      console.error("❌ Video gallery error:", {
        message: error?.message,
        code: error?.code,
        stack: error?.stack,
      });
      
      // Don't show error if user cancelled
      if (
        error?.message !== "User cancelled image selection" &&
        error?.code !== "E_PICKER_CANCELLED" &&
        !error?.message?.includes("cancelled") &&
        !error?.message?.includes("canceled")
      ) {
        Alert.alert(
          "Error",
          `Failed to select video: ${error?.message || "Unknown error"}`,
          [{ text: "OK" }]
        );
      }
    } finally {
      setIsProcessing(false);
      if (Platform.OS === "android") NativeModules?.Immersive?.exit?.();
    }
  };

  return (
    <AppSafeAreaView
      style={{ flex: 1, backgroundColor: "#000", paddingBottom: 50 }}
    >
      <KeyBoardAware>
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => NavigationService.goBack()}
          disabled={isProcessing}
        >
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{ width: 30, height: 30, marginTop: 20 }}
            tintColor={colors.white}
          />
        </TouchableOpacity>

        {/* Camera Background */}
        <ImageBackground
          source={cameraBgIcon}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 450,
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

        {/* Upload from Gallery */}
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginVertical: 10,
            borderWidth: 1,
            backgroundColor: "#8E1404",
            padding: 8,
            borderRadius: 10,
            opacity: isProcessing ? 0.5 : 1,
          }}
          onPress={captureGalleryVideo}
          disabled={isProcessing}
        >
          <AppText color={WHITE}>
            {isProcessing ? "Processing..." : "Upload from gallery"}
          </AppText>
        </TouchableOpacity>

        {/* Camera Capture Button */}
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
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              opacity: isProcessing ? 0.5 : 1,
            }}
            onPress={captureVideo}
            disabled={isProcessing}
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
                style={{ width: 55, height: 55 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </KeyBoardAware>
      
      <SpinnerSecond loading={isProcessing} />
    </AppSafeAreaView>
  );
};

export default CreatePost;
