import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Image, TouchableOpacity, Modal} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import FastImage from 'react-native-fast-image';
import {homeIcon} from '../helper/images';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { getCameraPermissions, getGalleryPermissions } from '../helper/Utility';

const CreatePost = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'notDetermined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'authorized');
    } else {
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
    // getGalleryPermissions();
  }, []);
  if (cameraPermission === null)
    return <Text>Checking camera permission...</Text>;
  if (!cameraPermission) return <Text>Camera permission not granted</Text>;
  if (!device) return <Text>No camera device available</Text>;

  const takePhoto = async () => {
    try {
      if (!camera.current) return;
      const photo = await camera.current.takePhoto();
      setCapturedPhoto(`file://${photo.path}`);
      setShowPreview(true);
      setIsFullScreen(true);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowPreview(false);
    setIsFullScreen(false);
  };

  // ✅ Fix for Crop Image Issue
//   const cropImage = () => {
//     if (!capturedPhoto) return;
//     ImagePicker.openCropper({
//       path: capturedPhoto, // ✅ Ensure correct path format
//       width: 300,
//       height: 400,
//       cropping: true,
//     })
//       .then(image => {
//         setCapturedPhoto(image.path);
//       })
//       .catch(error => console.error('Crop Error:', error));
//   };

  // ✅ Fix for Rotate Image Issue
//   const rotateImage = () => {
//     if (!capturedPhoto) return;
//     ImagePicker.openCropper({
//       path: capturedPhoto,
//       width: 300,
//       height: 400,
//       cropping: true,
//       freeStyleCropEnabled: true, // Allow rotation
//     })
//       .then(image => {
//         setCapturedPhoto(image.path);
//       })
//       .catch(error => console.error('Rotate Error:', error));
//   };

  return (
    <View style={{flex: 1, marginBottom: 70}}>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
      />

      {/* Full-Screen Preview with Edit Options */}
      <Modal visible={isFullScreen} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {capturedPhoto && (
            <Image
              source={{uri: capturedPhoto}}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          )}

          {/* Close Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 50,
              left: 20,
              // backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => setIsFullScreen(false)}>
            <Icon name="arrow-back-ios" color={'white'} size={26}></Icon>
          </TouchableOpacity>

          {/* Crop & Rotate Buttons */}
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 20,
              // gap: 20,
              justifyContent: "space-between"
            }}>
            {/* <TouchableOpacity
            onPress={cropImage}
              style={{
                borderWidth: 1,
                borderColor: "#5271FF",
                backgroundColor: '#FFFFFF',
                width: '48%',
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 8,
                marginTop: 20,
              }}>
              <AppText type={FOURTEEN} weight={BOLD} style={{color: '#5271FF'}}>
                Edit
              </AppText>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
            onPress={() => NavigationService.navigate('POST', {data: capturedPhoto})}
              style={{
                // borderWidth: 1,
                backgroundColor: '#5271FF',
                width: '48%',
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 8,
                marginTop: 20,
              }}>
              <AppText type={FOURTEEN} weight={BOLD} style={{color: '#FFFFFF'}}>
                Next
              </AppText>
            </TouchableOpacity> */}
            
            {/* <Button title="Edit" onPress={cropImage} color={'white'} /> */}
            {/* <Button title="Rotate" onPress={rotateImage} /> */}
            {/* <Button title="Next" onPress={retakePhoto} /> */}
          </View>
        </View>
      </Modal>

      {/* Capture Button */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: 38,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        {/* <Button title="Take Photo" onPress={takePhoto} /> */}
        <TouchableOpacity
          style={{
            borderColor: '#ffffff',
            width: 80,
            height: 80,
            borderRadius: 50,
            borderWidth: 2,
          }}
          onPress={takePhoto}>
          <View
            style={{
              backgroundColor: '#ffffff',
              width: 55,
              height: 55,
              borderRadius: 50,
              margin: 10,
              elevation: 10,
              shadowColor: '#000',
            }}></View>
        </TouchableOpacity>
        {/* <Button title="Gallery" onPress={takePhoto} /> */}
        <TouchableOpacity>
          <FastImage
            source={homeIcon}
            resizeMode="contain"
            style={{
              width: 55,
              height: 55,
              borderRadius: 50,
              position: 'absolute',
              left: 80,
              top: -30,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;
