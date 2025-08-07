import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import FastImage from 'react-native-fast-image';
import { backIcon } from '../helper/images';
import { AppText, POPPINS_SEMI_BOLD, TWENTY } from '../common/AppText';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import PrimaryButton from '../common/PrimaryButton';
import { toastAlert } from '../helper/utility';
import { useDispatch, useSelector } from 'react-redux';
import { supportForUser } from '../actions/profileAction';
import { SpinnerSecond } from '../common/SpinnerSecond';

const Support = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => {
        return state.auth.isLoading;
    })
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
        toastAlert.showToastError('Error', 'Both fields are required.');
      return;
    }

    let data = {
        subject: subject,
        message: message
    };

    dispatch(supportForUser(data));

    // You can handle the form submission logic here
    // Alert.alert('Submitted', `Subject: ${subject}\nMessage: ${message}`);
    
    // Reset form
    setSubject('');
    setMessage('');
  };

  return (
    <AppSafeAreaView>
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
          Support
        </AppText>
      </View>
       <View style={styles.container}>
      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter subject"
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      <PrimaryButton title={'Submit'} onPress={handleSubmit}/>
    </View>
    <SpinnerSecond loading={isLoading}/>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    width: "54%",
  },
});

export default Support;
