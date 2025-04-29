import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { closeIcon, successfullIcon } from "../helper/images";
import { AppText,POPPINS_REGULAR, POPPINS_SEMI_BOLD, MENUTEXT, SIXTEEN, TWENTY_FOUR } from "./AppText";

const CustomModal = ({isOpen, setIsOpen, desc, title, isError}) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={toggleModal}
        style={styles.container}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleModal}>
          <LinearGradient colors={['#FFFFFF', '#F4D98E']} style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleModal}
            >
                <FastImage source={closeIcon} resizeMode="center" style={{width: 24, height: 24, postion: "absolute", bottom: 50, left: 38}}/>
              {/* <Icon name="close-circle" size={24} color="#D9D9D940" style={{postion: "absolute", bottom: 50, left: 38}}/> */}
            </TouchableOpacity>
            <View style={{alignItems: "center"}}>
                <FastImage source={successfullIcon} resizeMode="center" style={{width: 90, height: 90}}/>
                <AppText color={MENUTEXT} type={TWENTY_FOUR} weight={POPPINS_SEMI_BOLD} style={{marginTop: 20}}>{title}</AppText>
                <AppText color={MENUTEXT} type={SIXTEEN} weight={POPPINS_REGULAR} style={{marginTop: 20}}>{desc}</AppText>
            </View>
          </LinearGradient>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    // borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "35%"
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});

export default CustomModal;