import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { userLogout } from "../actions/authActions";

const LogoutModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
  const handleConfirmLogout = async () => {
    dispatch(userLogout());

    onClose(); // close modal
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
            Logout
          </Text>
          <Text style={{ fontSize: 15, color: "#555", marginBottom: 20 }}>
            Are you sure you want to logout?
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginRight: 10,
                backgroundColor: "#ddd",
              }}
            >
              <Text style={{ fontWeight: "500" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirmLogout}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: "#0146AB",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
